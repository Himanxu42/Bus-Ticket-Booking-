const feedback = require("../models/feedback");
const User = require("../models/user");
const Bus = require("../models/bus");
// const City = require("../models/city");
const City = require('../models/citiy')
const Bookings = require("../models/bookings");
const { getAuthDetails } = require("../utils");
const signup = async (request, response) => {
  const { email, name, phone, password } = request.body;
  //validate
  try {
    const ifUserExist = await User.findOne({ email: email });
    if (ifUserExist)
      return response.status(401).json({
        msg: "User already exist",
      });
    const newUser = new User({ email, name, phone, password });
    await newUser.save();
    return response.status(201).json({ msg: "Successfully saved!" });
  } catch (error) {
    console.log(error);
    if (error.name == "ValidationError") {
      let errors = [];

      Object.keys(error.errors).forEach((key) => {
        errors.push(error.errors[key].message);
      });
      return response.status(400).json({
        msg: "validationError",
        body: errors,
      });
    }
    return response.status(500).json({ msg: "Internal server error" });
  }
};
const signin = async (request, response) => {
  const { email, password } = request.body;
  try {
    const foundUser = await User.findOne({ email: email });
    if (!foundUser)
      return response.status(400).json({
        msg: "No such user was found!",
      });
    if (foundUser.isValidatedPassword(password)) {
      response.cookie("auth", true, {
        maxAge: 60 * 60 * 24 * 3 * 1000,
        httpOnly: true,
      });
      response.cookie("user_id", foundUser._id, {
        maxAge: 60 * 60 * 24 * 3 * 1000,
        httpOnly: true,
      });
      response.cookie("role", foundUser.role, {
        maxAge: 60 * 60 * 24 * 3 * 1000,
        httpOnly: true,
      });
      return response.status(200).json({
        msg: "Successfully authenticated",
        auth: true,
        role: foundUser.role,
        id: foundUser._id,
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      msg: "Internal server error",
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("auth");
  res.clearCookie("id");
  return res.status(200).json({
    msg: "logged out",
  });
};

const getUser = async (req, res) => {
  try {
    const { user_id } = getAuthDetails(req);
    const user = await User.findById(user_id).populate({
      path: "bookings",
      model: "booking",
      populate: [
        { path: "bus", model: "bus" },
        { path: "from", model: "city" },
        { path: "to", model: "city" },
        { path: "user", model: "user" },
      ],
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const addFeedback = async (req, res) => {
  const { user_id } = getAuthDetails(req);
  const { text } = req.body;
  try {
    const newFeedback = new feedback({
      user: user_id,
      feedback: text,
    });
    await newFeedback.save();
    return res.json({
      msg: "feedback added!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};
const getFeedback = async (req, res) => {
  try {
    const feedbacks = await feedback.find({}).populate("user");
    return res.json(feedbacks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};
const getAdminStatics = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const bookingsCount = await Bookings.countDocuments();
    const busCount = await Bus.countDocuments();
    const cityCount = await City.countDocuments();
    return res.json({
      users: userCount,
      bookings: bookingsCount,
      buses: busCount,
      cities: cityCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};
module.exports = {
  signup,
  signin,
  logout,
  getUser,
  addFeedback,
  getFeedback,
  getAdminStatics,
};
