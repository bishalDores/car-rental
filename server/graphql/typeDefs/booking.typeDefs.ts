import gql from "graphql-tag";

export const bookingTypeDefs = gql`
  type Customer {
    name: String!
    email: String!
    phoneNo: String!
  }

  type BookingAmount {
    tax: Float!
    discount: Float!
    rent: Float!
    total: Float!
  }

  type PaymentInfo {
    id: String
    status: String
    method: String
  }

  type Booking {
    id: ID!
    user: User
    car: Car
    startDate: String!
    endDate: String!
    customer: Customer!
    amount: BookingAmount!
    daysOfRent: Int!
    rentPerDay: Float!
    paymentInfo: PaymentInfo
    additionalNotes: String
    createdAt: String!
    updatedAt: String!
  }

  input CustomerInput {
    name: String!
    email: String!
    phoneNo: String!
  }

  input BookingAmountInput {
    tax: Float!
    discount: Float!
    rent: Float!
    total: Float!
  }

  input BookingInput {
    car: ID!
    startDate: String!
    endDate: String!
    customer: CustomerInput!
    amount: BookingAmountInput!
    daysOfRent: Int!
    rentPerDay: Float!
    additionalNotes: String
  }

  type Mutation {
    createBooking(bookingInput: BookingInput!): Booking!
  }
`;
