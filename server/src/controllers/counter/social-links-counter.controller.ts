import { Request, Response } from 'express';
import counterService from '../../services/counter.service';

const socialLinksCounter = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const clickFrom = req.body.clickFrom;

    const allClicksData = await counterService.incrementClick(clickFrom);

    res.status(200).send({
      message: 'Success!',
      allClicksData,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send({ message: 'Internal server Error' });
  }
};

export default socialLinksCounter;
