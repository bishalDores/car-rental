import { IUser } from "@go-rental/shared";
import { createBooking } from "../../controllers/booking.controller";
import { BookingInput } from "../../types/booking.types";

export const bookingReolvers = {
  Mutation: {
    createBooking: async (_: any, { bookingInput }: { bookingInput: BookingInput }, { user }: { user: IUser }) =>
      createBooking(bookingInput, user.id),
  },
};
