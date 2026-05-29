import { ClickModel } from '../db/models/click-schema';

type SocialMedia = 'telegram' | 'instagram' | 'modalButton';

interface ClickData {
  [key: string]: { amountClick: number };
}
const sharedClicksData: ClickData = {
  instagram: { amountClick: 0 },
  telegram: { amountClick: 0 },
};
class CounterService {
  private data = sharedClicksData;

  async incrementClick(key: SocialMedia) {
    const updated = await ClickModel.findOneAndUpdate(
      { socialMedia: key },
      { $inc: { amountClick: 1 } },
      { new: true, upsert: true }
    );
    return { amountClick: updated.amountClick };
  }

  async getClickData(key: SocialMedia) {
    const result = await ClickModel.findOne({ socialMedia: key });
    return result ? { amountClick: result.amountClick } : { amountClick: 0 };
  }

  async getAllClicksData(): Promise<ClickData> {
    const results = await ClickModel.find({});
    const data: ClickData = {
      telegram: { amountClick: 0 },
      instagram: { amountClick: 0 },
    };

    for (const doc of results) {
      data[doc.socialMedia as SocialMedia] = { amountClick: doc.amountClick };
    }

    return data;
  }
}

const counterService = new CounterService();

export default counterService;
