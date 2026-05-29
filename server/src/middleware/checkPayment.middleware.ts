import { NextFunction, Response, Request } from 'express';

//

export const checkPaymentMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const testName = req.query.testName as string;
  const invoiceId = req.query.invoiceId as string;

  if (invoiceId === 'unknown' || !testName) {
    return res.status(200).json({
      message: 'Error checking payment status. InvoiceId is not exist',
      status: 'failed',
    });
  }
  try {
    req.body.paymentData = {
      testName,
      invoiceId,
    };
    next();
  } catch (error) {
    console.error('Check Status Payment Error:', error);
    res.status(500).json({ message: 'Error checking payment status', error });
  }
};
