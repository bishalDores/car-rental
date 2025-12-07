import { gql } from "graphql-tag";

export const carTypeDefs = gql`
  type CarImages {
    url: String
    public_id: String
  }

  type CarRatings {
    value: Float
    count: Int
  }

  type Car {
    id: ID!
    name: String!
    description: String!
    status: String!
    rentPerDay: Float!
    address: String!
    year: Int!
    power: Int!
    milleage: Int!
    brand: String!
    transmission: String!
    fuelType: String!
    seats: Int!
    doors: Int!
    images: [CarImages]
    ratings: CarRatings
    category: String!
    createdAt: String
    updatedAt: String
  }

  input CarInput {
    name: String!
    description: String!
    status: String
    rentPerDay: Float!
    address: String!
    images: [String]
    brand: String!
    year: Int!
    transmission: String!
    milleage: Int!
    power: Int!
    seats: Int!
    doors: Int!
    fuelType: String!
    category: String!
  }

  input RentFilter {
    gt: Int
    gte: Int
    lt: Int
    lte: Int
  }
  input CarFilters {
    category: String
    brand: String
    transmission: String
    status: String
    rentPerDay: RentFilter
  }
  type Query {
    getAllCars(filters: CarFilters, query: String): [Car]
    getCarById(id: ID!): Car
  }
  type Mutation {
    createCar(carInput: CarInput!): Car
    updateCar(carId: ID!, carInput: CarInput!): Boolean
    deleteCar(carId: ID!): Boolean
  }
`;
