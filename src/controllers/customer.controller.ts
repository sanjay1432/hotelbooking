import { Customer, loginCustomer } from "../interfaces/customer";
import { CustomerService } from "../services/customer.service";
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

@Tags("Customer Module")
@Route("")
export class CustomerController extends Controller {
  public customerService = new CustomerService();

  /**
   * Get single customer api.
   *
   * Fetch single customer information using customerId.
   *
   * @param info
   */

  @Get("/{customerId}")
  public async getCustomer(@Path() customerId): Promise<Customer> {
    return this.customerService.getOne(customerId);
  }

  @Security("bearer")
  @Get("/customer/all")
  public async fetchAll(): Promise<Customer> {
    return this.customerService.fetch();
  }

  @Post("/register")
  async createCustomer(@Body() req: Customer): Promise<Customer> {
    return this.customerService.create(req);
  }

  @Post("/login")
  async login(@Body() req: loginCustomer): Promise<any> {
    return this.customerService.authenticate(req);
  }
  @Put("/{customerId}")
  async updateCustomer(@Path() customerId, @Body() req: Customer): Promise<Customer> {
    return this.customerService.update(customerId, req);
  }

  @Delete("/{customerId}")
  async deleteCustomer(@Path() customerId): Promise<any> {
    return this.customerService.delete(customerId);
  }
}
