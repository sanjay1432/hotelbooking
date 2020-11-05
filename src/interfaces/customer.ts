export interface Customer {
  /**
   * customer valid email need to be provided
   */
  email: string;
  username: string;
  phoneNumbers?: string;
  password: string;
  dob?: string;
}

export interface loginCustomer extends Pick<Customer, "username" | "password"> {}
