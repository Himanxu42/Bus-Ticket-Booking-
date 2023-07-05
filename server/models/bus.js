const mongoose = require("mongoose");
const busSchema = mongoose.Schema(
  {
    bus_name: {
      type: String,
      required: true,
      lowercase: true,
    },
    starting_from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "city",
      required: true,
    },
    bus_number: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      lowercase: true,
    },
    state: {
      type: String,
      required: true,
      lowercase: true,
    },
    final_destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "city",
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    locations: [
      {
        city: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "city",
        },
        to: String, //time to reach forwards
        from: String, //time to reach backwards
        km: Number,
      },
    ],

    bus_capacity: {
      type: Number,
      default: 20,
    },
    price_per_km: {
      type: Number,
      default: 10,
    },
    nextDate: {
      type: Date,
      default: Date.now(),
    },
    direction: {
      type: String,
      default: "forward",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bus", busSchema);
