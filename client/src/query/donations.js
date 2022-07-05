import { gql } from "@apollo/client";

export const GET_ALL_DONATIONS = gql`
  query GetAllDonations {
    getAllDonations {
      id
      username
      amount
    }
  }
`;