import { Request, Response } from 'express';

import { PaymentModel } from '../../db/models/mono-payment-schema';

const getBills = async (req: Request, res: Response): Promise<any> => {
  try {
    const bills = await PaymentModel.find().sort({ createdAt: -1 });

    res.status(200).json(bills);
  } catch (err) {
    res.status(500).json({
      message: 'Error getting bills',
      error: err instanceof Error ? err.message : err,
    });
  }
};

export default getBills;
