import { Schema, Model, model, Document } from "mongoose";
import { Room } from "../interfaces/room";

interface RoomDoc extends Room, Document {}

export const RoomSchema: Schema = new Schema({
  number: Number,
  bedCapacity: Number,
  booked: Boolean,
  bookingFromDate: String,
  bookingToDate: String,
  price: String,
  bookedBy: { type: Schema.Types.ObjectId, ref: "Customer" }
});

// Use Model generic from mongoose to create a model of User type.
const RoomModel: Model<RoomDoc> = model<RoomDoc>("Room", RoomSchema);

export { RoomModel };
