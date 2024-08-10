import mongoose from "mongoose";
import validator from "validator";
interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  photo: string;
  gender: "male" | "female";
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
  //   Virtual Attribute
  age: number;
}
const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Please enter ID"],
    },
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    email: {
      type: String,
      unique: [true, "Email already exist"],
      required: [true, "Please enter Name"],
      validate: validator.default.isEmail,
    },
    photo: {
      type: String,
      required: [true, "Please add photo"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please enter Gender"],
    },
    dob: {
      type: Date,
      required: [true, "Please enter DOB"],
    },
  },
  {
    timestamps: true,
  }
);

schema.virtual("age").get(function () {
  const today = new Date();
  const dob = this.dob;
  let age = today.getFullYear() - dob.getFullYear();

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
});

export const User = mongoose.model<IUser>("User", schema);