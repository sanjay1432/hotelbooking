type Optional<T> = { [P in keyof T]?: T[P] };
export interface Room {
  number: number;
  bedCapacity: number;
  price: string;
}

export interface BookRoom {
  /**
   *date format should be  MM-dd-yyyy
   */
  bookingFromDate: string;
  bookingToDate: string;
}
export type OptionalRoom = Optional<Room>;
