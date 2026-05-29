import { Request, Response } from 'express';

import counterService from '../../services/counter.service';

const getAllClicksData = async (req: Request, res: Response): Promise<any> => {
  try {
    const allClicksData = await counterService.getAllClicksData();
    console.log(allClicksData);

    res.status(200).send({
      message: 'Success!',
      allClicksData,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send({ message: 'Internal server Error' });
  }
};

export default getAllClicksData;
