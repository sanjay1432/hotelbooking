import { Hotel } from "../interfaces/hotel";
import { Room, OptionalRoom, BookRoom } from "../interfaces/room";
import { HotelService } from "../services/hotel.service";
import {
  Controller,
  Route,
  Get,
  Post,
  Put,
  Delete,
  Tags,
  Body,
  Security,
  Hidden,
  Request,
  OperationId,
  Path,
  Query,
  Example
} from "tsoa";

@Tags("Hotel Module")
@Route("")
export class HotelController extends Controller {
  public hotelService = new HotelService();

  /**
   * Get single user api.
   *
   * Fetch single user information using usedId.
   *
   * @param info
   */

  @Get("/{hotelId}")
  public async getHotel(@Path() hotelId): Promise<Hotel> {
    return this.hotelService.getOne(hotelId);
  }

  @Post("/create")
  async createCustomer(@Body() req: Hotel): Promise<Hotel> {
    return this.hotelService.create(req);
  }
  // @Security("bearer")
  @Get("/hotels/list")
  public async fetchAllHotels(): Promise<Hotel> {
    return this.hotelService.fetchAllHotels();
  }

  @Get("/rooms/list")
  public async fetchAllRooms(): Promise<Room> {
    return this.hotelService.fetchAllRooms();
  }

  @Get("/availableRooms/list")
  public async availableRooms(): Promise<Room> {
    return this.hotelService.getAvailableRooms();
  }
  @Put("/{hotelId}")
  async updateHotel(@Path() hotelId, @Body() req: Hotel): Promise<Hotel> {
    return this.hotelService.update(hotelId, req);
  }
  @Put("/room/{roomId}")
  async updateRoom(@Path() roomId, @Body() req: OptionalRoom): Promise<Room> {
    return this.hotelService.updateRoom(roomId, req);
  }
  @Post("/addhotelroom/{hotelId}")
  async addRoomInHotel(@Path() hotelId, @Body() req: Room): Promise<Room> {
    return this.hotelService.addRoomInHotel(hotelId, req);
  }
  /**
   *date format should be  MM-dd-yyyy
   */
  @Security("bearer")
  @Post("/createBooking/{roomId}")
  async createBooking(@Path() roomId, @Request() req, @Body() info: BookRoom): Promise<Room> {
    const { user } = req;
    return this.hotelService.createBooking(roomId, info, user);
  }

  @Delete("/delete/{hotelId}")
  async deleteHotel(@Path() hotelId): Promise<any> {
    return this.hotelService.delete(hotelId);
  }
}
