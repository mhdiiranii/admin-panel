export type blogType = [
  {
    id: string;
    picture: string;
    username: string;
    email: string;
    about: string;
    subject: string;
  }
];
export interface UserType {
  id: string;
  email: string;
  username: string;
  password?: string;
  token?: string;
  role: string;
  image: string;
  blogs: blogType;
}
export interface UserUpadateType {
  id: string;
  email: string;
  username: string;
  role: string;
  image: string;
}
export type userManagement = () => {
  users?: UserUpadateType[] | undefined;
  loading: boolean | null;
  deleteMyUser: (id: string) => void;
  updateMyUser: (id: string, role: string) => void;
  userStatus: boolean | null | undefined;
};


export type blogsManagement = () => {
  myBlogs?: blogType| null;
  loading: boolean | null;
  deleteBlogs: (id: string) => void;
  blogStatus: boolean | null | undefined;
};
