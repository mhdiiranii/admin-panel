"use client";

import { userManagement, UserUpadateType } from "@/models/types";
import { deleteUser, getUser, updateUser } from "@/services/User";
import { useMemo, useState } from "react";

const UserManagement: userManagement = () => {
  const [users, setUsers] = useState<UserUpadateType[] | undefined>();
  const [loading, setLoading] = useState<boolean | null>(null);
  const [userStatus, setUserStatus] = useState<boolean | null>();
  const [refresh, setRefresh] = useState<boolean>(false);

  useMemo(async () => {
    setLoading(true);
    getUser()
      .then((res) => {
        setUsers(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(false);
      });
  }, [refresh]);

  const updateMyUser = (id: string, role: string) => {
    setLoading(true);
    setUserStatus(null);
    setRefresh(() => (refresh ? false : true));
    updateUser(id, role)
      .then((res) => {
        setLoading(false);
        setUserStatus(res?.ok);
      })
      .catch((err) => {
        setUserStatus(null);
        console.error(err.message);
      });
  };
  const deleteMyUser = (id: string) => {
    setLoading(true);
    setUserStatus(null);
    setRefresh(() => (refresh ? false : true));
    deleteUser(id)
      .then((res) => {
        setLoading(false);
        setUserStatus(res?.ok);
      })
      .catch((err) => {
        setUserStatus(null);
        console.error(err.message);
      });
  };

  return {
    users,
    loading,
    deleteMyUser,
    updateMyUser,
    userStatus,
  };
};

export default UserManagement;
