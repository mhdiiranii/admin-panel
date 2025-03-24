import { connectDb } from "@/lib/mongoClient";
import User from "@/models/userSchema";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectDb();
  const user = await User.find({});
  if (!user) {
    return NextResponse.json({ status: 404, message: "کاربری وجود ندارد" });
  }

  return NextResponse.json(user);
}

export async function POST(req: NextRequest) {
  const {role, username, password, email } = await req.json();
  await connectDb();
  const user = await User.findOne(
    {$or : [{email}]}
  );
  if (user) {
    return NextResponse.json({ok:false ,status : 401 , message: "کاربر وجود دارد" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await User.insertOne({ id:String(new ObjectId()), role , email, username, password: hashPassword });

  return NextResponse.json({ok:true, status: 200, message: "کاربر ساخته شد" });
}
