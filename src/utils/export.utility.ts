import { Parser } from 'json2csv';

export const generateCSV = async (
  data: Array<Record<string, any>>,
  csvFields?: string[],
): Promise<string> => {
  return await new Promise<string>((resolve, reject) => {
    try {
      let json2csvParser;
      if (csvFields) {
        json2csvParser = new Parser({
          fields: csvFields,
          encoding: 'utf-8',
          withBOM: true,
        });
      } else {
        json2csvParser = new Parser();
      }
      const csvData = json2csvParser.parse(data);
      const result = Buffer.from(csvData).toString('base64');
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
