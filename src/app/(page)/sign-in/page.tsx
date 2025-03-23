"use client";

import Button from "@/app/components/button/Button";
import InputSign from "@/app/components/input/signInput";
import { SignInSchemaType, signUpSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const SignIn = () => {
  const [errorUser, setErrorUser] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const router = useRouter();
  const onSubmit: SubmitHandler<SignInSchemaType> = async (data) => {
    const newUser = signIn("credentials", {
      redirect: false,
      ...data,
    });
    const res = await newUser;
    if (!res?.error) {
      router.push("/");
    } else {
      setErrorUser(res?.error);
    }
  };
  const googleSign = async () => {
     await signIn("google", { callbackUrl: "/" });
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-10 py-8 border rounded-lg ">
        <InputSign register={register} names="username" placeholder="username" errors={errors} />
        <InputSign register={register} names="password" type="password" placeholder="password" errors={errors} />

        <div className="w-full flex flex-col gap-4">
          <Button type="submit" className="bg-green-400 text-white font-bold">
            Sign In
          </Button>
          <Button onClick={googleSign} type="button" className="bg-green-400 text-white font-bold">
            Google
          </Button>
          <Link href={"/sign-up"} className="bg-gray-500 p-2 text-center rounded-lg text-white font-bold hover:shadow-xl duration-200 cursor-pointer">
            Email
          </Link>
          {errorUser !== "" && <span className="text-xs text-right text-red-500">{errorUser}</span>}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
