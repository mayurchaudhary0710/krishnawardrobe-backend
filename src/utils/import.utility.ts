import * as XLSX from 'xlsx';

export const importFile = async (csvFile: any): Promise<any> => {
  const workbook = XLSX.read(csvFile, { type: 'buffer' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(worksheet);
  return data;
};
