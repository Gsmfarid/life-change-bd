import { connectDb } from "@/config";
import { Post } from "@/models/postModel";
import { ApiResponse } from "@/utils";
import getCurrentUser from "@/utils/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    // Get Current User
    const user = await getCurrentUser();

    if (!user) {
      return ApiResponse(404, "User not found❗");
    }

    const posts = await Post.find();

    if (!posts) {
      return ApiResponse(404, "Posts not found❗");
    }

    return ApiResponse(200, "Post get success 🧹", posts);
  } catch (error: any) {
    return ApiResponse(400, error.message);
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const request = await req.json();

    const { postImg, postText } = await request;

    // Get Current User
    const user = await getCurrentUser();

    if (!user) {
      return ApiResponse(404, "User not found❗");
    }

    console.log(postImg, postText);

    const newPost = await Post.create({
      author: user.id,
      imageUrl: postImg,
      text: postText,
    });

    if (!newPost) {
      return ApiResponse(404, "DB error❗");
    }

    return ApiResponse(200, "Post Create successfully 🧹", newPost);
  } catch (error: any) {
    return ApiResponse(400, error.message);
  }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    const request = await req.json();

    return ApiResponse(200, "Post Deleted successfully 🧹", request);
  } catch (error: any) {
    return ApiResponse(400, error.message);
  }
};
