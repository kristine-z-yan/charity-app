import { gql } from "@apollo/client";

export const ADD_DONATION = gql`
  mutation addDonation(
    $username: String!
    $amount: Int!
  ) {
    addDonation(
      username: $username
      amount: $amount
    ) {
      username
      amount
    }
  }
`;

export const DELETE_DONATION = gql`
  mutation deleteDonation($id: Float) {
    deleteDonation(id: $id) {
      id
    }
  }
`;

export const UPDATE_DONATION = gql`
  mutation updateDonation(
    $id: Float!
    $username: String!
    $amount: Int!
  ) {
    updateDonation(
      id: $id 
      username: $username
      amount: $amount
    ) {
      id
      username
      amount
    }
  }
`;