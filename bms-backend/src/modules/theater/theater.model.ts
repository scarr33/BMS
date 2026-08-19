import { ITheater } from "./theater.interface";
import mongoose from "mongoose";

const theaterSchema = new mongoose.Schema<ITheater>(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      location: true,
    },
    logo: {
      type: String,
      location: true,
    },
    city: {
      type: String,
      location: true,
    },
    state: {
      type: String,
      location: true,
    },
  },
  { timestamps: true },
);

export const TheaterModel = mongoose.model<ITheater>("Theater", theaterSchema);
