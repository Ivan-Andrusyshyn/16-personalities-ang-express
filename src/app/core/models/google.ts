interface GoogleSheetTestResults {
  results: string;
  timestamp: string;
  device: string;
  testName: string;
  routeTracker: string;
  referrer: string;
  ip: string;
}
interface GoogleSheetRegistration {
  name: string;
  ip: string;
  socialMedia: string;
  feedBack?: string;
  phone?: string;
}
interface UserInformationClient {
  routeTracker: string;
  referrer: string;
  testName: string;
  timestamp: string;
  device: string;
}
export {
  GoogleSheetRegistration,
  UserInformationClient,
  GoogleSheetTestResults,
};
