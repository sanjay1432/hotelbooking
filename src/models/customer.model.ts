import { Schema, Model, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import { Customer } from "../interfaces/customer";
import ENV from "../utils/env";

interface CustomerDoc extends Customer, Document {}

const CustomerSchema: Schema = new Schema({
  email: String,
  username: String,
  phoneNumbers: String,
  password: String,
  dob: String
});

CustomerSchema.pre<CustomerDoc>("save", function(next) {
  const customer = this;
  // only hash the password if it has been modified (or is new)
  if (!customer.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(ENV.SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(customer.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      customer.password = hash;
      next();
    });
  });
});

CustomerSchema.methods.comparePasswords = async (candidatePassword, savedPassword) => {
  const isValid = await bcrypt.compare(candidatePassword, savedPassword);
  return isValid;
};

CustomerSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

CustomerSchema.methods.isPasswordValid = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// Omit the password when returning a customer
CustomerSchema.set("toJSON", {
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});
// Use Model generic from mongoose to create a model of User type.
const CustomerModel: Model<CustomerDoc> = model<CustomerDoc>("Customer", CustomerSchema);

export { CustomerModel };
