import { Response } from "express";
import { randomUUID } from "crypto";

// ==========
import { TestName } from "../../types/common-tests";
import { MonoPaymentRequest } from "../../types/monopayment";

export function generateReference(): string {
  return `inv-${randomUUID()}`;
}

export function getFromServerToKyivTime() {
  const time = new Date();
  return new Date(time.getTime() + 3 * 60 * 60 * 1000);
}

export const checkProperty = async (
  res: Response,
  monopaymentObject: MonoPaymentRequest,
) => {
  if (
    !monopaymentObject ||
    !monopaymentObject.amount ||
    !monopaymentObject.merchantPaymInfo
  ) {
    return res.status(400).json({ message: "Invalid payment data" });
  }
};

export const updateDocModel = async (
  updatedDoc: any,
  invoiceId: string,
  testName: TestName,
) => {
  const nowKyiv = getFromServerToKyivTime();
  const now = nowKyiv.getTime();

  const paidAtDate = updatedDoc?.paidAt ? new Date(updatedDoc.paidAt) : null;

  const paidAt = paidAtDate ? paidAtDate.getTime() : 0;
  const TWO_HOURS = 1000 * 60 * 60 * 2;

  if (now - paidAt > TWO_HOURS) {
    return {
      invoiceId,
      testName,
      status: "failed",
      reason: "Access expired",
    };
  }
  const expiredAtDate = new Date(paidAt + TWO_HOURS);
  return {
    invoiceId,
    status: "success",
    testName,
    paidAt: paidAtDate,
    expiredAtTimestamp: expiredAtDate.getTime(),
    expiredAt: expiredAtDate,
  };
};
