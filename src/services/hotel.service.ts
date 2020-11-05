import { CustomerModel } from "../models/customer.model";
import { HotelModel } from "../models/hotel.model";
import { RoomModel } from "../models/room.model";
import { Customer, loginCustomer } from "../interfaces/customer";
import { Hotel } from "../interfaces/hotel";
import { Room } from "../interfaces/room";
import { signToken } from "./auth.service";
import { ErrorResponse } from "../utils/error-helper";
import Mongoose from "mongoose";
export class HotelService {
  constructor() {}
  async getOne(id): Promise<Hotel> {
    const isValid = Mongoose.Types.ObjectId.isValid(id);

    if (!isValid) throw new ErrorResponse(406, `${id} is not valid id!`);

    return HotelModel.findById(id);
  }

  async create(hotel): Promise<Hotel> {
    const res = await HotelModel.create(hotel);
    return res;
  }
  async fetchAllHotels(): Promise<any> {
    return HotelModel.find().populate({
      path: "rooms",
      populate: {
        path: "bookedBy"
      }
    });
  }
  async fetchAllRooms(): Promise<any> {
    return RoomModel.find().populate({
      path: "bookedBy"
    });
  }

  async getAvailableRooms(): Promise<any> {
    return RoomModel.find({ booked: false });
  }
  async update(id, hotel): Promise<Hotel> {
    const isValid = Mongoose.Types.ObjectId.isValid(id);

    if (!isValid) throw new ErrorResponse(406, `${id} is not valid id!`);

    return HotelModel.findOneAndUpdate({ _id: id }, hotel, { new: true });
  }

  async updateRoom(roomId, room): Promise<Room> {
    const isValid = Mongoose.Types.ObjectId.isValid(roomId);

    if (!isValid) throw new ErrorResponse(406, `${roomId} is not valid id!`);

    return RoomModel.findOneAndUpdate({ _id: roomId }, room, { new: true });
  }

  async addRoomInHotel(hotelId, room): Promise<Room> {
    const isValid = Mongoose.Types.ObjectId.isValid(hotelId);

    if (!isValid) throw new ErrorResponse(406, `${hotelId} is not valid id!`);
    const createdRoom = await RoomModel.create(room);
    await HotelModel.findByIdAndUpdate({ _id: hotelId }, { $push: { rooms: createdRoom._id } });
    return createdRoom;
  }

  async createBooking(roomId, bookinginfo, customer): Promise<Room> {
    const isValid = Mongoose.Types.ObjectId.isValid(roomId);

    if (!isValid) throw new ErrorResponse(406, `${roomId} is not valid id!`);
    const room = await RoomModel.findById(roomId);
    if (!room) throw new ErrorResponse(404, `${roomId} is not found!`);
    if (room["booked"]) throw new ErrorResponse(404, `${room.number} is already booked!`);
    bookinginfo["booked"] = true;
    bookinginfo["bookedBy"] = customer._id;
    bookinginfo["bookingFromDate"] = new Date(bookinginfo.bookingFromDate);
    bookinginfo["bookingToDate"] = new Date(bookinginfo.bookingToDate);
    return RoomModel.findByIdAndUpdate({ _id: roomId }, bookinginfo);
  }

  async delete(id) {
    const isValid = Mongoose.Types.ObjectId.isValid(id);

    if (!isValid) throw new ErrorResponse(406, `${id} is not valid id!`);

    return HotelModel.deleteOne({ _id: id });
  }
}
