const bookings = require("../models/bookings");
const Bus = require("../models/bus");
const User = require("../models/user");
const stripe = require("stripe")(
  "sk_test_51NHttWSBHFic1op0ZZe94ok6c7fWlrS2Y7hWLCbvecdI3nAxC6MOz1FK4PednXeorKQSJjLpaWIFCTppfGpvGvdU00wRghJyas"
);
const { v4: uuidv4 } = require("uuid");
const { getAuthDetails, paymentStore } = require("../utils");
const addBus = async (req, res) => {
  try {
    const {
      bus_name,
      starting_from,
      bus_number,
      phone,
      state,
      final_destination,
      email,
      locations,
    } = req.body;

    const newBus = new Bus({
      bus_name,
      starting_from,
      bus_number,
      phone,
      state,
      final_destination,
      email,
      locations,
    });
    console.log(req.body);
    const busExist = await Bus.findOne({
      bus_number: bus_number,
    });
    if (busExist) {
      return res.status(400).json({
        msg: "Bus number already exist!",
      });
    }
    await newBus.save();
    return res.status(200).json({
      msg: "Bus added successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went wrong!",
    });
  }
};

const getAllBus = async (req, res) => {
  try {
    const buses = await Bus.find().populate("locations.city");
    return res.status(200).json(buses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went wrong!",
    });
  }
};

const searchBus = async (req, res) => {
  try {
    const { from, to, date } = req.body;
    const buses = [];
    const [year, month, day] = date.split("-").map(Number);
    const tragetDate = new Date(year, month - 1, day);
    const matchingBuses = await Bus.find({
      $and: [
        { "locations.city": from },
        { "locations.city": to },
        { nextDate: tragetDate },
      ],
    })
      .populate("locations.city")
      .populate("starting_from")
      .populate("final_destination");
    if (matchingBuses.length == 0) {
      return res.status(400).json({
        msg: "no buses found!",
      });
    }
    const anyBus = matchingBuses[0];
    let direction;
    for (let i = 0; i < anyBus.locations.length; i++) {
      const location = anyBus.locations[i];
      if (location.city._id.toString() == from) {
        direction = "forward";
        break;
      } else {
        direction = "backward";
        break;
      }
    }

    console.log(matchingBuses, tragetDate, direction, from, to);
    for (let i = 0; i < matchingBuses.length; i++) {
      let bus = matchingBuses[i];
      //checking if bus on this date is also forward booking
      if (bus.direction != direction) continue;
      const count = await bookings.countDocuments({
        $and: [
          {
            date: tragetDate,
          },
          {
            bus: bus._id,
          },
        ],
      });
      if (count < 20) {
        buses.push(bus);
      }
    }
    return res.json(buses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went wrong!",
    });
  }
};

const updateBus = async (req, res) => {
  try {
    const { id } = req.params;
    const { direction, date } = req.body;
    const [year, month, day] = date.split("-").map(Number);
    const nextDate = new Date(year, month - 1, day);
    if (!direction || !date)
      return res.status(400).json({
        msg: "missing direction or date",
      });

    await Bus.findByIdAndUpdate(id, {
      direction: direction,
      nextDate: nextDate,
    });
    return res.json({ msg: "ok" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went wrong!",
    });
  }
};

const deleteBus = async (req, res) => {
  const { id } = req.params;
  try {
    await Bus.findByIdAndDelete(id);
    return res.json({
      msg: "deleted bus",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went wrong!",
    });
  }
};

const getBookingsByBus = async (req, res) => {
  const { date, id } = req.query;
  const [year, month, day] = date.split("-").map(Number);
  const nextDate = new Date(year, month - 1, day);
  try {
    const bookingss = await bookings.find({
      $and: [{ bus: id }, { date: nextDate }],
    });
    return res.json(bookingss);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went wrong!",
    });
  }
};

const createPaymentIntent = async (req, res) => {
  const { product } = req.body;
  const { user_id } = getAuthDetails(req);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.amount,
      currency: "INR",
    });
    console.log(product);
    const [year, month, day] = product.date.split("-").map(Number);
    const tragetDate = new Date(year, month - 1, day);
    const newPayment = {
      amount: product.amount,
      bus: product.bus,
      date: tragetDate,
      from: product.from,
      to: product.to,
      seat: product.selected,
      user: user_id,
      selected: product.selected,
    };
    paymentStore.set(user_id, newPayment);
    return res.json({
      ClientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went wrong!",
    });
  }
};

const booking = async (req, res) => {
  try {
    const { user_id } = getAuthDetails(req);
    console.log(getAuthDetails(req));
    const payment = paymentStore.get(user_id);
    if (!payment) {
      return res.status(400).json({
        msg: "no such payment exist!!",
      });
    }
    const { bus, selected, from, to, date, amount } = payment;
    console.log(payment);

    for (i = 0; i < selected.length; i++) {
      console.log("WORKIN", i);
      const newBooking = new bookings({
        bus: bus._id,
        from: from.value,
        to: to.value,
        date: date,
        seat: selected[i],
        price: amount / selected.length,
        user: user_id,
      });
      await newBooking.save();
      await User.findByIdAndUpdate(user_id, {
        $addToSet: {
          bookings: newBooking._id,
        },
      });
      paymentStore.delete(user_id);
    }
    res.json({ msg: "Booked!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went wrong!",
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const b = await bookings
      .find({})
      .populate("bus")
      .populate("from")
      .populate("to")
      .populate("user");
    return res.json(b);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went wrong!",
    });
  }
};

const getBookingsById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await bookings
      .findById(id)
      .populate("bus")
      .populate("from")
      .populate("to")
      .populate("user");
    return res.json(booking);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went wrong!",
    });
  }
};

module.exports = {
  addBus,
  getAllBus,
  searchBus,
  updateBus,
  deleteBus,
  getBookingsByBus,
  booking,
  createPaymentIntent,
  getAllBookings,
  getBookingsById,
};
