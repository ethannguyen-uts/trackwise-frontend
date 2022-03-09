import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ChangePasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword?: Maybe<User>;
  confirmUser: Scalars['Boolean'];
  createProduct: Product;
  createUser: User;
  forgotPassword: Scalars['Boolean'];
  login?: Maybe<User>;
  logout: Scalars['Boolean'];
  register: User;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationCreateProductArgs = {
  data: ProductInput;
};


export type MutationCreateUserArgs = {
  data: RegisterInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type PasswordInput = {
  password: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ProductInput = {
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  helloWorld: Scalars['String'];
  me?: Maybe<User>;
};

export type RegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', firstName: string, lastName: string, username: string, name: string, email: string } };


export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    firstName
    lastName
    username
    name
    email
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};