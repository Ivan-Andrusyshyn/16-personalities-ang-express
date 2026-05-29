import { Request, Response } from 'express';

const getGoogleDriveFile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const fileId = '1MXEb0Grxn_KwhxDHhVdV_3OM6A68K2Jq';
    const fileUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch the file');
    }

    const jsonData = await response.json();

    return res.status(200).json(jsonData);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: 'Internal server Error' });
  }
};

export default getGoogleDriveFile;
