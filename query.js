import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    quotes: [QueryWithName]
    iquote(id: ID!): [Quote]
    myprofile: User
  }

  type QueryWithName {
    name: String
    by: IdName
  }
  type IdName {
    _id: String
    firstName: String
  }
  type User {
    _id: ID
    firstName: String
    lastName: String
    password: String
    email: String
    quotes: [Quote]
  }
  type Quote {
    by: ID!
    name: String
  }
  type Token {
    token: String
  }
  type Mutation {
    signupUser(userNew: UserInput!): User
    signInUser(userSignIn: SignInUserInput!): Token
    createQuote(name: String!): String
  }

  input SignInUserInput {
    email: String!
    password: String!
  }

  input UserInput {
    firstName: String!
    lastName: String
    email: String!
    password: String!
  }
`;

export default typeDefs;
