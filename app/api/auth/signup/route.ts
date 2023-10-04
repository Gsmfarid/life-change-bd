import { connectDb } from "@/config";
import { User } from "@/models";
import { ApiResponse } from "@/utils";
import { sendEmail } from "@/utils/mailer";
import { genSalt, hash } from "bcryptjs";
import { NextRequest } from "next/server";

connectDb();

export const POST = async (req: NextRequest) => {
  try {
    const { email, password: userPass, ...userData } = await req.json();

    //check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return ApiResponse(400, "User already exists 🙋🏻‍♂️");
    }

    //hash password
    const salt = await genSalt(10);
    const hashedPassword = await hash(userPass, salt);

    const result = await User.create({
      ...userData,
      email,
      password: hashedPassword,
    });

    //send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: result._id });

    const finalResult = await User.findOne({ _id: result._id }).select(
      "-password"
    );

    return ApiResponse(200, "User created successfully 👌", finalResult);
  } catch (error: any) {
    return ApiResponse(500, error.message);
  }
};
