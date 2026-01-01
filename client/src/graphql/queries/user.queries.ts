import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query Me {
    me {
      id
      name
      email
      phoneNo
      role
      createdAt
      updatedAt
      avatar {
        public_id
        url
      }
    }
  }
`;

export const LOGOUT = gql`
  query Query {
    logout
  }
`;
