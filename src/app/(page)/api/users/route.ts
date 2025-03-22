import clientPromise from "@/lib/mongoClient";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("admin-panel");
  const user = await db.collection("users").find({}).toArray();
  if (!user) {
    return NextResponse.json({ status: 404, message: "کاربری وجود ندارد" });
  }

  return NextResponse.json(user);
}

export async function POST(req: NextRequest) {
  const { username, password, email } = await req.json();
  const client = await clientPromise;
  const db = client.db("admin-panel");
  const user = await db.collection("users").findOne(
    {$or : [{username},{email}]}
  );
  if (user) {
    return NextResponse.json({ok:false ,status : 401 , message: "کاربر وجود دارد" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await db.collection("users").insertOne({ id:new ObjectId(), email, username, password: hashPassword });

  return NextResponse.json({ok:true, status: 200, message: "کاربر ساخته شد" });
}
