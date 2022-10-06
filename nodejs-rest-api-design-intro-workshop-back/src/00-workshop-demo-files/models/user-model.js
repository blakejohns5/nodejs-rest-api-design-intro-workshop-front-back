const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "The first name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "The last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: (props) => `The email ${props.value} is not valid`,
      },
    },
    password: {
      type: String,
      required: [true, "The password is required"],
      minlength: [8, "The password is too short"],
    },
    speaks: [
      {
        type: String,
        enum: [
          "english",
          "spanish",
          "catalan",
          "german",
          "italian",
          "javascript",
        ],
      },
    ],
  },
  { timestamps: true },
);

UserSchema.pre("save", async function passwordPreSave(next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

const UserModel = new mongoose.model("user", UserSchema);

module.exports = UserModel;
