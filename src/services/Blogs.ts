import axios from "axios";

const AxiosRequest = axios.create({
  baseURL: process.env.BACK_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export async function getPanelBlogs() {
    return AxiosRequest.get('/api/blogs')
        .then((res)=> {return res.data})
        .catch((err)=> {return err.message})
}
export async function deleteSwitchBlogs(id:string) {
    return AxiosRequest.delete(`/api/blogs${id}`)
        .then((res)=> {return res.data})
        .catch((err)=> {return err.message})
}

