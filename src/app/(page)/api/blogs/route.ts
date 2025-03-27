import { connectDb } from "@/lib/mongoClient";
import Blog from "@/models/blogSchema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ok:false , status: 403, message: "دسترسی ندارید!" });
  }
  if (token.role != "admin" && token.role != "user" ) {
    return NextResponse.json({ok:false , status: 403, message: "دسترسی ندارید!" });
  }
  await connectDb();
  const blogs = await Blog.find({});
  if (!blogs) {
    return NextResponse.json({ status: 404, message: "پیدا نشد!" });
  }

  return NextResponse.json({status:200 ,ok:true , data:blogs});
}
