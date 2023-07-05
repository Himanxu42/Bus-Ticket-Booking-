const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not valid email`,
    },
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
    minLength: [3, "Too short name"],
    maxLength: [40, "Too large name"],
    lowercase: true,
  },
  password: {
    type: String,
    trim: true,
    minLength: [4, "Too short password"],
    required: true,
  },
  phone: {
    trim: true,
    type: String,
    required: true,
    lowercase: true,
  },
  role: {
    type: String,
    default: "user",
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booking",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
});
//vadlidate the password
userSchema.methods.isValidatedPassword = async function (usersendPassword) {
  try {
    return await bcrypt.compare(usersendPassword, this.password);
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = mongoose.model("user", userSchema);
