"use client";

import { signUpSchema, SignUpSchemaType } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpUser } from "@/services/User";
import { useRouter } from "next/navigation";
import InputSign from "@/app/components/input/signInput";
import Button from "@/app/components/button/Button";
import { signIn } from "next-auth/react";

const SignUp = () => {
  const [errorUser, setErrorUser] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const router = useRouter();

  useEffect(()=>{
    setValue('role','user')
  },[])

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    const newUser = SignUpUser(data);
    const res = await newUser;

    if (res.ok) {
      router.push("/sign-in");
    } else {
      return setErrorUser(res.message);
    }
  };

  const googleSign = async () => {
    const res = await signIn("google", { callbackUrl: "/" });
    if (!res?.error) {
      router.refresh()
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-10 py-8 border rounded-lg ">
        <InputSign register={register} names="email" placeholder="Email" errors={errors} />
        <InputSign register={register} names="username" placeholder="username" errors={errors} />
        <InputSign register={register} names="password" type="password" placeholder="Email" errors={errors} />
        <div className="w-full flex flex-col gap-4">
          <Button type="submit" className="bg-green-400 p-2 text-white font-bold">
            Sign Up
          </Button>
          <Button type="button" onClick={googleSign} className="bg-green-400 p-2 text-white font-bold">
            Google
          </Button>
          {errorUser !== "" && <span className="text-xs text-right text-red-500">{errorUser}</span>}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
