import { Schema, Model, model, Document } from "mongoose";
import { Hotel } from "../interfaces/hotel";
import { RoomSchema } from "./room.model";

interface HotelDoc extends Hotel, Document {}

const HotelSchema: Schema = new Schema({
  name: String,
  address: String,
  phoneNumber: String,
  star: Number,
  rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }]
});

// Use Model generic from mongoose to create a model of User type.
const HotelModel: Model<HotelDoc> = model<HotelDoc>("Hotel", HotelSchema);

export { HotelModel };
