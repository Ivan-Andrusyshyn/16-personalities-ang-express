import { Request, Response } from "express";

//========
import { MonoService } from "../../services/monopay.service";
import { MonoPaymentRequest } from "../../types/monopayment";
import { PaymentModel } from "../../db/models/mono-payment-schema";
import { TestName } from "../../types/common-tests";
import {
  checkProperty,
  generateReference,
  getFromServerToKyivTime,
  updateDocModel,
} from "./helper";

const monoService = new MonoService();

const isProd = process.env.NODE_ENV === "production";

// TEST CARD NUMBER 4444 3333 2222 1111

// Create a payment
export const createPayment = async (req: Request, res: Response) => {
  try {
    const reference = generateReference();
    const monopaymentObject = req.body;

    const amount = monopaymentObject.amount;
    const commentWithTestName = monopaymentObject.merchantPaymInfo?.comment;

    //
    await checkProperty(res, monopaymentObject);

    //
    monopaymentObject.merchantPaymInfo.reference = reference;
    const result = (await monoService.createPayment(monopaymentObject)) as {
      pageUrl: string;
      invoiceId: string;
    };

    //
    // await setCoockie(res, 'created', commentWithTestName, result.invoiceId);

    res.json({ ...result, status: "created", testName: commentWithTestName });
  } catch (err) {
    console.error("Create Payment Error:", err);
    res.status(400).json({
      message: "Create payment failed",
      error: err instanceof Error ? err.message : String(err),
    });
  }
};

//
//

export const checkStatusPayment = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const { invoiceId, testName } = req.body.paymentData;

    const paymentDoc = await PaymentModel.findOne({ invoiceId });

    const result = await monoService.statusPayment(invoiceId);

    if (result && result.status === "success") {
      const kyivTime = getFromServerToKyivTime();

      if (!paymentDoc) {
        await PaymentModel.create({
          invoiceId,
          testName,
          status: "success",
          paidAt: kyivTime,
        });
      }
      if (paymentDoc?.status !== "success") {
        await PaymentModel.updateOne(
          { invoiceId },
          {
            $set: {
              status: "success",
              paidAt: kyivTime,
            },
          },
        );
      }
    }

    const updatedDoc = await PaymentModel.findOne({ invoiceId });

    // update model
    if (updatedDoc?.status === "success") {
      const resData = await updateDocModel(updatedDoc, invoiceId, testName);
      return res.json({ ...resData });
    } else {
      return res.json({
        invoiceId,
        status: result.status,
        testName,
      });
    }
  } catch (error) {
    console.log(error);

    if (
      (typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as any).code === "ERR_BAD_REQUEST") ||
      (error as any).code === "ECONNRESET"
    ) {
      return res.status(203).json({
        status: "failed",
        message: "Bad request",
      });
    } else {
      return res
        .status(500)
        .json({ message: "Error checking payment status", error });
    }
  }
};

export const clientInfo = async (req: Request, res: Response) => {
  try {
    const data = await monoService.getClientInfo();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Mono API error", error });
  }
};

export const getWebhook = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body;

    const invoiceId = body?.data?.invoiceId;

    if (!invoiceId) return res.status(400).send("No invoiceId");

    await PaymentModel.updateOne(
      { invoiceId },
      { $set: { status: "success" } },
    );
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: "Mono API error", error });
  }
};

export const setWebhook = async (req: Request, res: Response): Promise<any> => {
  try {
    const { url } = req.body;
    const result = await monoService.setWebhook(url);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Mono API error", error });
  }
};
