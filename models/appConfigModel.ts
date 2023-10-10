import { IAppConfigSchema } from "@/interface";
import { Schema, model, models } from "mongoose";

const AppConfigSchema = new Schema<IAppConfigSchema>(
  {
    for: {
      type: String,
      default: "admin",
    },
    baseFee: {
      type: Number,
      default: 0,
    },
    sliderImage: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const AppConfig =
  models.appConfig || model<IAppConfigSchema>("AppConfig", AppConfigSchema);
