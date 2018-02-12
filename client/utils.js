export function fillData(data) {
  // let's go through every date since olderDate
  // if we have data, keep it
  // if we don't, the default count is 0
  let dataIndex = 0;
  const dataToMap = [];
  const today = new Date(new Date().setHours(0, 0, 1));
  const olderDate = data[data.length - 1].date;


  for (
    let currentDay = new Date(today + msPerDay / 2);
    currentDay >= olderDate;
    currentDay = new Date(currentDay.valueOf() - msPerDay)
  ) {
    // if we're within a day of the data's timestamp, use data's wordcount
    if (data[dataIndex] && Math.abs(currentDay - data[dataIndex].date) < msPerDay / 2) {
      dataToMap.push(data[dataIndex]);
      dataIndex += 1;
    } else {
      dataToMap.push({ date: new Date(currentDay), wordcount: 0 });
    }
  }
  return dataToMap
}

// constant we use a lot
const msPerDay = 1000 * 60 * 60 * 24;

export const groupByDay = (data) => {
  const wpd = data.reduce((acc, entry) => {
    const timeSinceLast = acc.length ? acc[acc.length - 1].date - entry.date : Infinity;
    if (timeSinceLast < msPerDay / 2) {
      acc[acc.length - 1].wordcount += entry.wordcount;
    } else {
      acc.push(entry);
    }
    return acc;
  }, []);

  return wpd;
};

export const cleanUpData = (data) => {
  console.log('data', data)
  const lessRawData = data.map(d => ({ ...d, date: new Date(new Date(d.date).setHours(0, 0, 1)) }));
  lessRawData.sort((a, b) => b.date.valueOf() - a.date.valueOf());
  console.log('lessRawData',lessRawData)
  const almostCleanData =  groupByDay(lessRawData);
  console.log('almostCleanData',almostCleanData)
  return fillData(almostCleanData);
}
