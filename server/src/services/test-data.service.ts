import { getUniversalModel } from '../db/models/tests-data-schema';
import { Question } from '../types/common-tests';
import googleSheetsService from './google-sheets.service';

class TestDataService {
  async getTestGoogleOrMongo(model: string, fileId: string): Promise<any[]> {
    const dbModel = getUniversalModel(model);
    let data = await dbModel.find();

    if (!data || !data.length) {
      const googleData = (await googleSheetsService.getDataGoogle(
        fileId,
      )) as Question[];
      await dbModel.create(googleData);
      data = await dbModel.find();
    }

    return data;
  }
}

const testDataService = new TestDataService();
export default testDataService;
