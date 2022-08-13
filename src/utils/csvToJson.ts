export const csvToJSON = async (csv: string) => {
  let lines = csv.split('\n');

  let result = [];

  var headers = lines[0].split(',');

  for (let i = 1; i < lines.length; i++) {
    let obj = {};
    let currentline = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  return result;
};
