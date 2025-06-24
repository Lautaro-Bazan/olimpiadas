import { GraphQLClient } from 'graphql-request';

const API_URL = import.meta.env.VITE_API_URL; 

console.log("API_URL:", API_URL, "token: ", localStorage.getItem("token"));

export const client = new GraphQLClient(API_URL+'/graphql', {
  headers: {
    //le pasamos el token
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
