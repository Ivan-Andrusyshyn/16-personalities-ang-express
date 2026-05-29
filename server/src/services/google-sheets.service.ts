import { config } from 'dotenv';

import {
  GoogleSheetRegistration,
  GoogleSheetTestResults,
} from '../types/google';

config();
function cleanString(value: any): any {
  if (typeof value !== 'string') {
    return value;
  }

  const cleanedInput = value.replace(/\r\n/g, '').replace(/'/g, '"');

  try {
    return JSON.parse(cleanedInput);
  } catch {
    return cleanedInput;
  }
}
class GoogleSheetsService {
  async getDataGoogle(fileId: string) {
    try {
      const fileUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch the file');
      }

      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async postRegistrationInfoOnSheet(data: GoogleSheetRegistration) {
    const body = new URLSearchParams();
    body.set('name', data.name);
    body.set('ip', data.ip);
    body.set('socialMedia', data.socialMedia);
    body.set('feedBack', data.feedBack ?? '');
    if (data.phone) {
      body.set('phone', data.phone);
    }

    const scriptUrl: string = `${process.env.GOOGLE_SHEET_URL_CONSULTATIONS}`;

    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  async postFeedBackOnSheet(data: {
    socialMedia: string;
    feedBack: string;
    timestamp: string;
    referrer: string;
    ip: string;
  }) {
    const body = new URLSearchParams();

    body.set('socialMedia', data.socialMedia);
    body.set('ip', data.ip);
    body.set('feedBack', data.feedBack);
    body.set('timestamp', data.timestamp);
    body.set('referrer', data.referrer);
    const scriptUrl: string = `${process.env.GOOGLE_SHEET_URL_FEEDBACK}`;

    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  async getSheetData() {
    try {
      const scriptUrl =
        'https://script.google.com/macros/s/AKfycbwsVYYR7Iqc84tDGoqjFhp0wwaS4oUlFb9Usb_AISzl0QIZL4FrXL-qunwTF9IC8Zuz/exec';
      const response = await fetch(scriptUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      let data = await response.json();

      const dataArray = Object.values(data[0]);

      const parseData = dataArray.map(cleanString);
      return parseData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async postTestResultsOnSheet(data: GoogleSheetTestResults) {
    const body = new URLSearchParams();
    body.set('testName', data.testName);
    body.set('results', data.results);
    body.set('timestamp', data.timestamp);
    body.set('device', data.device);
    body.set('referrer', data.referrer);
    body.set('routeTracker', data.routeTracker);
    if (['188.163.83.93', '46.211.80.251'].includes(data.ip)) {
      body.set('ip', 'ALEXANDER');
    } else if (['5.248.144.91', '::1'].includes(data.ip)) {
      body.set('ip', 'IVAN_DEV');
    } else {
      body.set('ip', data.ip);
    }

    const scriptUrl: string = `${process.env.GOOGLE_SHEET_URL_TESTS}`;

    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
const googleSheetsService = new GoogleSheetsService();

export default googleSheetsService;
