"use client";

import Button from "@/app/components/button/Button";
import UserManagement from "@/hooks/userManagement";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { useState } from "react";
import Image from "next/image";
import { GiCheckMark } from "react-icons/gi";
import Loading from "@/app/components/loading/loading";
import { useSession } from "next-auth/react";

const ShowUserTable = () => {
  const { data: session } = useSession();
  const { users, loading, updateMyUser, deleteMyUser } = UserManagement();
  const [show, setShow] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [selected, setSelected] = useState("");
  const [userRole, setUserRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userDeletId , setUserDeletId] = useState('')

  const onCLickUpdate = (id: string, role: string) => {
    if (selected != "" && selected != userRole) {
      setShow(() => (show ? false : true));
      updateMyUser(id, role);
      setSelected("");
    } else {
      setShow(() => (show ? false : true));
    }
  };

  const changeInput = (index: number, role: string) => {
    setUserRole(role);
    setShow(() => (show ? false : true));
    setCount(index);
  };

  const openModal = (id:string) => {
    setShowModal(() => (showModal ? false : true));
    setUserDeletId(id)
  };

  const yesDelet = ()=>{
    deleteMyUser(userDeletId)
  }
  const noDelet = ()=>{
    setShowModal(false)
    setUserDeletId('')
  }
  return (
    <div className="flex w-full">
      <div className="flex flex-col gap-1 w-full cursor-pointer">
        <table className="w-full border-collapse border border-gray-300 shadow-lg">
          <thead className="bg-amber-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Number</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Operation</th>
            </tr>
          </thead>

          <tbody>
            {users
              ?.filter((item) => item.email !== session?.user?.email)
              .map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50 border border-gray-300">
                  <td className="border-r border-gray-300  text-center">{index + 1}</td>
                  <td className="border-r py-6 border-gray-300 flex justify-center items-center">
                    <div className="w-14 h-14 flex items-center justify-center  rounded-full shadow-md">
                      <Image width={30} height={30} className="rounded-full w-full h-full" alt="image-user" src={user.image || "/svg/person.svg"} />
                    </div>
                  </td>
                  <td className="border-r border-gray-300  text-center">{user.email}</td>
                  <td className="border-r border-gray-300  text-center">{user.username}</td>
                  <td className="border-r border-gray-300  text-center">
                    {show ? (
                      index == count ? (
                        <>
                          <select
                            className="w-14 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                            value={count == index ? selected : ""}
                            disabled={!show ? true : false}
                            onChange={(e) => setSelected(e.target.value)}
                          >
                            <option value="">set</option>
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                          </select>
                        </>
                      ) : (
                        <div>{user.role}</div>
                      )
                    ) : (
                      <div>{user.role}</div>
                    )}
                  </td>
                  <td className="">
                    <div className="w-full flex justify-center gap-3">
                      {loading && index == count ? (
                        <Loading width={5} height={5} />
                      ) : !show ? (
                        <Button onClick={() => changeInput(index, user.role)} type="button" className="text-blue-600 p-1 hover:text-blue-800">
                          <RxUpdate size={20} />
                        </Button>
                      ) : index == count ? (
                        <Button onClick={() => onCLickUpdate(user.id, selected)} type="button" className="text-green-600 p-1 hover:text-green-800 ">
                          <GiCheckMark size={20} />
                        </Button>
                      ) : (
                        <Button onClick={() => changeInput(index, user.role)} type="button" className="text-blue-600 p-1 hover:text-blue-800">
                          <RxUpdate size={20} />
                        </Button>
                      )}
                      <Button onClick={()=>openModal(user.id)} type="button" className="text-red-600 p-1 hover:text-red-800">
                        <MdDelete size={20} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {showModal && (
          <div onClick={noDelet} className="fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center">
            <div className="px-14 py-8 ml-40 flex flex-col gap-10  bg-white rounded-lg shadow-[0_0_20px_5px_rgba(0,0,0,0.5)]">
              <p className="text-center">Are your soure?</p>
              <div className="flex justify-center gap-10 items-center">
                <Button onClick={noDelet} type="button" className="px-8 py-4 hover:shadow-2xl duration-300 rounded-lg border">
                  No
                </Button>
                <Button onClick={yesDelet} type="button" className="px-8 py-4  hover:shadow-2xl duration-300 rounded-lg bg-red-500 text-white">
                  {
                    loading ? (
                        <Loading width={5} height={5}/>
                    ):(
                        'yes'
                    )
                  }
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowUserTable;
