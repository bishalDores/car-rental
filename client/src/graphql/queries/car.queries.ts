import { gql } from "@apollo/client";

export const GET_ALL_CARS = gql`
  query GetAllCars($page: Int, $query: String, $filters: CarFilters) {
    getAllCars(page: $page, query: $query, filters: $filters) {
      cars {
        name
        category
        fuelType
        ratings {
          value
          count
        }
        images {
          url
          public_id
        }
        transmission
        rentPerDay
        id
      }
      pagination {
        resPerPage
        totalCount
      }
    }
  }
`;
export const GET_CAR_BY_ID = gql`
  query GetCarById($getCarById: ID!) {
    getCarById(id: $getCarById) {
      id
      name
      description
      status
      rentPerDay
      address
      year
      power
      milleage
      brand
      transmission
      fuelType
      seats
      doors
      images {
        url
        public_id
      }
      ratings {
        value
        count
      }
      category
      createdAt
      updatedAt
    }
  }
`;
