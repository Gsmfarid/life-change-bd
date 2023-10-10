import { IUserSchema } from "@/interface";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema<IUserSchema>(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a First Name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a Last Name"],
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
      unique: true,
    },
    whatsapp: {
      type: String,
      required: [true, "Please provide a WhatsApp number"],
      unique: true,
    },
    country: {
      type: String,
      required: [true, "Please provide a country"],
    },
    language: {
      type: String,
      required: [true, "Please provide a language"],
    },
    role: {
      type: String,
      default: "inactive",
    },
    reference: {
      type: String,
      default: "-",
    },
    balance: {
      type: Number,
      default: 0,
    },
    courses: {
      type: [Schema.Types.ObjectId],
      ref: "courses",
    },
    posts: {
      type: [Schema.Types.ObjectId],
      ref: "posts",
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "posts",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    settings: {
      activeNotice: {
        type: Boolean,
        default: true,
      },

      subAdmin: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      controller: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      consultant: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      teacher: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      gl: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const User = models.users || model<IUserSchema>("users", userSchema);
