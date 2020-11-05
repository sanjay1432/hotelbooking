import { CustomerModel } from "../models/customer.model";
import { Customer } from "../interfaces/customer";

const defaultCustomer: Customer = {
  email: "teleport@teleport.com",
  username: "teleport",
  phoneNumbers: "+601234567890",
  password: "teleport",
  dob: "20/04/1991"
};
const insertDefaultUser = async () => {
  const isAvailable = await CustomerModel.findOne({ email: defaultCustomer.email });
  if (!isAvailable) {
    const user = await CustomerModel.create(defaultCustomer);
    console.log(user);
  }
};

export default insertDefaultUser;
