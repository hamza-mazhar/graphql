import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation createUser($userNew: UserInput!) {
    user: signupUser(userNew: $userNew) {
      firstName
    }
  }
`;

export const LOGIN_USER = gql`
  mutation signInUser($userSignIn: SignInUserInput!) {
    user: signInUser(userSignIn: $userSignIn) {
      token
    }
  }
`;

export const CREATE_QUOTE = gql`
  mutation createQuote($name: String!) {
    quote: createQuote(name: $name)
  }
`;

export const DELETE_QUOTE = gql`
  mutation deleteQuote($id: String!) {
    quote: deleteQuote(id: $id) {
      name
    }
  }
`;

export const UPDATE_QUOTE = gql`
  mutation updateQuote($quoteupdate: QuoteUpdate!) {
    quote: updateQuote(quoteupdate: $quoteupdate) {
      name
      by
    }
  }
`;
