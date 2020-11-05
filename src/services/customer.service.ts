import { CustomerModel } from "../models/customer.model";
import { Customer, loginCustomer } from "../interfaces/customer";
import { signToken } from "./auth.service";
import { ErrorResponse } from "../utils/error-helper";
import Mongoose from "mongoose";
export class CustomerService {
  constructor() {}
  async getOne(id): Promise<Customer> {
    const isValid = Mongoose.Types.ObjectId.isValid(id);

    if (!isValid) throw new ErrorResponse(406, `${id} is not valid id!`);

    return CustomerModel.findById(id);
  }

  async create(customer): Promise<Customer> {
    const res = await CustomerModel.create(customer);
    return res;
  }
  async fetch(): Promise<any> {
    return CustomerModel.find();
  }
  async update(id, customer): Promise<Customer> {
    const isValid = Mongoose.Types.ObjectId.isValid(id);

    if (!isValid) throw new ErrorResponse(406, `${id} is not valid id!`);

    return CustomerModel.findOneAndUpdate({ _id: id }, customer, { new: true });
  }

  async delete(id) {
    const isValid = Mongoose.Types.ObjectId.isValid(id);

    if (!isValid) throw new ErrorResponse(406, `${id} is not valid id!`);

    return CustomerModel.deleteOne({ _id: id });
  }

  async authenticate(customer: loginCustomer) {
    const { username, password } = customer;

    //fetch user detail using username
    const existingUser = await CustomerModel.findOne({ username: username });
    if (!existingUser) throw new ErrorResponse(401, `${username} doesn't have account yet!`);

    // if user exist than compare the password
    const passwordMatched = await existingUser.schema.methods.comparePasswords(password, existingUser.password);

    if (!passwordMatched) throw new ErrorResponse(401, `Given password is not available for ${username}`);

    //generate token for valid user
    const token = await signToken({ _id: existingUser._id });
    return token;
  }
}
