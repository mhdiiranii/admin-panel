import { connectDb } from "@/lib/mongoClient";
import Blog from "@/models/blogSchema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

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
  const user = await Blog.findOneAndDelete({ id:id });
  if (user) {
    return NextResponse.json({ ok: true, status: 201, message: "Delete blog" });
  }

  return NextResponse.json({ ok: false, status: 401, message: "not delete" });
}
