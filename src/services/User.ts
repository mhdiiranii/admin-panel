import { SignUpSchemaType } from "@/lib/zod";

import axios from "axios";

const AxiosRequest = axios.create({
  baseURL: process.env.BACK_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export async function getUser() {
  return AxiosRequest.get("/api/users")
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    return err.message;
  });
}

export async function SignUpUser(data: SignUpSchemaType) {
  return AxiosRequest.post("/api/users", JSON.stringify(data))
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.message;
    });
}

export async function updateUser(id:string , role:string) {
  return AxiosRequest.put(`/api/users/${id}`,{role})
    .then((res)=> {
      return res.data;
    })
    .catch((err)=>{
      return err.message;
    })
}
export async function deleteUser(id:string ) {
  return AxiosRequest.delete(`/api/users/${id}`)
    .then((res)=> {
      return res.data;
    })
    .catch((err)=>{
      return err.message;
    })
}