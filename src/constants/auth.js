/* eslint-disable import/prefer-default-export */

import { gql } from "apollo-boost";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
