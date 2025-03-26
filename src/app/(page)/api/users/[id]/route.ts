import { connectDb } from "@/lib/mongoClient";
import User from "@/models/userSchema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ status: 403, message: "دسترسی ندارید!" });
  }
  if (token.role !== "admin") {
    return NextResponse.json({ status: 403, message: "دسترسی ندارید!" });
  }
  const { role } = await req.json();
  const { id } = await params;
  await connectDb();
  const user = await User.findOneAndUpdate({ id: id }, { role: role });
  if (user) {
    return NextResponse.json({ ok: true, status: 201, message: "update user" });
  }

  return NextResponse.json({ ok: false, status: 401, message: "not update" });
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ status: 403, message: "دسترسی ندارید!" });
  }
  if (token.role !== "admin") {
    return NextResponse.json({ status: 403, message: "دسترسی ندارید!" });
  }
  const { id } = await params;
  await connectDb();
  const user = await User.findOneAndDelete({ id });
  if (user) {
    return NextResponse.json({ ok: true, status: 201, message: "Delete user" });
  }

  return NextResponse.json({ ok: false, status: 401, message: "not delete" });
}
