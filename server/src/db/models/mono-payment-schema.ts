import { Schema, model } from "mongoose";

// =================
import { getFromServerToKyivTime } from "../../controllers/payment/helper";

const PaymentSchema = new Schema(
  {
    invoiceId: { type: String, required: true, unique: true },
    testName: { type: String },
    status: {
      type: String,
      enum: ["created", "success", "failed"],
      default: "created",
    },
    paidAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: getFromServerToKyivTime,
    },
  },
);
export const PaymentModel = model("test-payment", PaymentSchema);
