const mongoose = require("mongoose");
const bookinSchema = mongoose.Schema(
  {
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bus",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "city",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "city",
      required: true,
    },
    seat: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("booking", bookinSchema);
