const {
  addCity,
  getCities,
  deleteCity,
  updateCity,
  searchCity,
} = require("../controller/city");

const router = require("express").Router();
router.route("/city").get(getCities).post(addCity);
router.route("/city/:id").delete(deleteCity).patch(updateCity);
router.route("/search/city").post(searchCity);

module.exports = router;
