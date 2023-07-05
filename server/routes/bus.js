const {
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
} = require("../controller/bus");

const router = require("express").Router();

router.route("/addbus").post(addBus);
router.route("/buses").get(getAllBus);
router.route("/search").post(searchBus);
router.route("/bus/:id").patch(updateBus).delete(deleteBus);
router.route("/booking").get(getBookingsByBus).post(booking);
router.route("/create-payment-intent").post(createPaymentIntent);
router.route("/all/booking").get(getAllBookings);
router.route("/booking/:id").get(getBookingsById);
module.exports = router;
