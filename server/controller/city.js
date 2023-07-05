const City = require("../models/citiy");
const addCity = async (req, res) => {
  try {
    const { name } = req.body;
    const newCity = new City({
      name: name,
    });
    const doesCityExist = await City.findOne({
      name: name,
    });
    if (doesCityExist)
      return res.status(400).json({
        msg: "City already exist!",
      });
    await newCity.save();
    return res.json(newCity);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "internal server error!",
    });
  }
};

const getCities = async (req, res) => {
  try {
    const cities = await City.find();
    return res.json(cities);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "internal server error!",
    });
  }
};

const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    await City.findByIdAndDelete(id);
    return res.json({
      msg: "deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "internal server error!",
    });
  }
};
const updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await City.findByIdAndUpdate(id, {
      name: name,
    });
    return res.json({
      msg: "updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "internal server error!",
    });
  }
};

const searchCity = async (req, res) => {
  const { search } = req.body;
  try {
    const result = await City.find({
      name: {
        $regex: ".*" + search + ".*",
      },
    });
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "internal server error!",
    });
  }
};

module.exports = { addCity, getCities, deleteCity, updateCity, searchCity };
