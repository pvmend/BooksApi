import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email : $email, password: $password){
            token 
            user {
            _id 
       username
       email 
       bookCount
       savedBooks {
       bookId 
       authors 
       description
       title
       image
       link
       }
     }
    }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, $password: password){
            token
            user {
            _id 
       username
       email 
       bookCount
       savedBooks {
       bookId 
       authors 
       description
       title
       image
       link
       }
     }
        }
    }
`
export const SAVE_BOOK = gql`
    mutation saveBook($authors:[String], $description: String!, $bookId: String, $image: String!, $link: String! ){
        saveBook(authors:$authors, description: $description, bookId: $bookId, image: $image,
        link:$link){
        _id 
       username
       email 
       bookCount
       savedBooks {
       bookId 
       authors 
       description
       title
       image
       link
       }
        }
    }`