import { SignUpSchemaType } from "@/lib/zod";

import axios from "axios";

const AxiosRequest = axios.create({
  baseURL: process.env.BACK_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export async function SignUpUser(data: SignUpSchemaType) {
  return AxiosRequest.post("/api/users", JSON.stringify(data))
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.message;
    });
}
