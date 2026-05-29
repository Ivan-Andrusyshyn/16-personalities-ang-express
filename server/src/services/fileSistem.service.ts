import * as fs from 'fs';

class FileSystemService {
  readJsonFile = (filePath: string): any => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  };
}

const fileSistemService = new FileSystemService();
export default fileSistemService;
