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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type ChangePasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  error: Scalars['String'];
  field: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addProduct: Product;
  changePassword?: Maybe<UserResponse>;
  confirmUser: Scalars['Boolean'];
  createPost: Post;
  createUser: User;
  deletePost: Scalars['Boolean'];
  deleteProduct: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: LoginResponse;
  logout: Scalars['Boolean'];
  register: RegisterResponse;
  updatePost: Post;
  updateProductTargetPrice: Product;
  vote: Scalars['Boolean'];
};


export type MutationAddProductArgs = {
  url: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationCreateUserArgs = {
  data: RegisterInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationUpdateProductTargetPriceArgs = {
  id: Scalars['ID'];
  targetPrice: Scalars['Float'];
};


export type MutationVoteArgs = {
  postId: Scalars['ID'];
  value: Scalars['Int'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  hasMore: Scalars['Boolean'];
  posts: Array<Post>;
};

export type PasswordInput = {
  password: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  created_at: Scalars['DateTime'];
  creator: User;
  creatorId: Scalars['Float'];
  id: Scalars['ID'];
  points: Scalars['Float'];
  text: Scalars['String'];
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
  voteStatus?: Maybe<Scalars['Int']>;
};

export type PostInput = {
  text: Scalars['String'];
  title: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  created_at: Scalars['DateTime'];
  currentPrice: Scalars['Float'];
  id: Scalars['ID'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  retailer: Scalars['String'];
  scrapePrice: Scalars['Float'];
  status: Scalars['String'];
  targetPrice: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  url: Scalars['String'];
  user: User;
  userId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  helloWorld: Scalars['String'];
  me?: Maybe<User>;
  post: Post;
  posts: PaginatedPosts;
  product: Product;
  products: Array<Product>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};

export type RegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type Updoot = {
  __typename?: 'Updoot';
  post: Post;
  postId: Scalars['Float'];
  user: User;
  userId: Scalars['Float'];
  value: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  updated_at: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldErrorFragmentFragment = { __typename?: 'FieldError', field: string, error: string };

export type PostSnippetFragmentFragment = { __typename?: 'Post', id: string, title: string, created_at: any, updated_at: any, textSnippet: string, text: string, points: number, voteStatus?: number | null, creator: { __typename?: 'User', id: string, username: string } };

export type ProductFragmentFragment = { __typename?: 'Product', id: string, name: string, url: string, imageUrl: string, scrapePrice: number, currentPrice: number, targetPrice: number, status: string, userId: string, updated_at: any };

export type UserFragmentFragment = { __typename?: 'User', id: string, username: string, email: string, firstName: string, lastName: string, name: string };

export type AddProductMutationVariables = Exact<{
  url: Scalars['String'];
}>;


export type AddProductMutation = { __typename?: 'Mutation', addProduct: { __typename?: 'Product', id: string, name: string, url: string, imageUrl: string, scrapePrice: number, currentPrice: number, targetPrice: number, status: string, userId: string, updated_at: any } };

export type ChangePasswordMutationVariables = Exact<{
  data: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword?: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, error: string }> | null, user?: { __typename?: 'User', id: string, username: string, email: string, firstName: string, lastName: string, name: string } | null } | null };

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, title: string, text: string, creatorId: number, points: number, updated_at: any, created_at: any } };

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: boolean };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', errors?: Array<{ __typename?: 'FieldError', field: string, error: string }> | null, user?: { __typename?: 'User', id: string, username: string, email: string, firstName: string, lastName: string, name: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponse', errors?: Array<{ __typename?: 'FieldError', field: string, error: string }> | null, user?: { __typename?: 'User', id: string, username: string, email: string, firstName: string, lastName: string, name: string } | null } };

export type UpdateProductTargetPriceMutationVariables = Exact<{
  targetPrice: Scalars['Float'];
  id: Scalars['ID'];
}>;


export type UpdateProductTargetPriceMutation = { __typename?: 'Mutation', updateProductTargetPrice: { __typename?: 'Product', id: string, name: string, url: string, imageUrl: string, scrapePrice: number, currentPrice: number, targetPrice: number, status: string, userId: string, updated_at: any } };

export type VoteMutationVariables = Exact<{
  postId: Scalars['ID'];
  value: Scalars['Int'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string, email: string, firstName: string, lastName: string, name: string } | null };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPosts', hasMore: boolean, posts: Array<{ __typename?: 'Post', id: string, title: string, created_at: any, updated_at: any, textSnippet: string, text: string, points: number, voteStatus?: number | null, creator: { __typename?: 'User', id: string, username: string } }> } };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, name: string, url: string, imageUrl: string, scrapePrice: number, currentPrice: number, targetPrice: number, status: string, userId: string, updated_at: any }> };

export const FieldErrorFragmentFragmentDoc = gql`
    fragment FieldErrorFragment on FieldError {
  field
  error
}
    `;
export const PostSnippetFragmentFragmentDoc = gql`
    fragment PostSnippetFragment on Post {
  id
  title
  created_at
  updated_at
  textSnippet
  text
  points
  voteStatus
  creator {
    id
    username
  }
}
    `;
export const ProductFragmentFragmentDoc = gql`
    fragment ProductFragment on Product {
  id
  name
  url
  imageUrl
  scrapePrice
  currentPrice
  targetPrice
  status
  userId
  updated_at
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  username
  email
  firstName
  lastName
  name
}
    `;
export const AddProductDocument = gql`
    mutation AddProduct($url: String!) {
  addProduct(url: $url) {
    ...ProductFragment
  }
}
    ${ProductFragmentFragmentDoc}`;

export function useAddProductMutation() {
  return Urql.useMutation<AddProductMutation, AddProductMutationVariables>(AddProductDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($data: ChangePasswordInput!) {
  changePassword(data: $data) {
    errors {
      ...FieldErrorFragment
    }
    user {
      ...UserFragment
    }
  }
}
    ${FieldErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    id
    title
    text
    creatorId
    points
    updated_at
    created_at
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const DeleteProductDocument = gql`
    mutation DeleteProduct($id: ID!) {
  deleteProduct(id: $id)
}
    `;

export function useDeleteProductMutation() {
  return Urql.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    errors {
      ...FieldErrorFragment
    }
    user {
      ...UserFragment
    }
  }
}
    ${FieldErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    errors {
      ...FieldErrorFragment
    }
    user {
      ...UserFragment
    }
  }
}
    ${FieldErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateProductTargetPriceDocument = gql`
    mutation UpdateProductTargetPrice($targetPrice: Float!, $id: ID!) {
  updateProductTargetPrice(targetPrice: $targetPrice, id: $id) {
    ...ProductFragment
  }
}
    ${ProductFragmentFragmentDoc}`;

export function useUpdateProductTargetPriceMutation() {
  return Urql.useMutation<UpdateProductTargetPriceMutation, UpdateProductTargetPriceMutationVariables>(UpdateProductTargetPriceDocument);
};
export const VoteDocument = gql`
    mutation Vote($postId: ID!, $value: Int!) {
  vote(postId: $postId, value: $value)
}
    `;

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    hasMore
    posts {
      ...PostSnippetFragment
    }
  }
}
    ${PostSnippetFragmentFragmentDoc}`;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const ProductsDocument = gql`
    query Products {
  products {
    ...ProductFragment
  }
}
    ${ProductFragmentFragmentDoc}`;

export function useProductsQuery(options?: Omit<Urql.UseQueryArgs<ProductsQueryVariables>, 'query'>) {
  return Urql.useQuery<ProductsQuery>({ query: ProductsDocument, ...options });
};