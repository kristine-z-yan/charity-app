import { gql } from "@apollo/client";

export const ADD_DONATION = gql`
  mutation addDonation($input: DonationInput) {
    addDonation(input: $input) {
      id
      username
      amount
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: Float) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($input: DonationInput) {
    updateUser(input: $input) {
      id
      username
      age
    }
  }
`;