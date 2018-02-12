import React from 'react'


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


// some nice purple shades
const colors = [
  '#FFFFFF',
  '#F7F1F1',
  '#F0E3E5',
  '#E9D6DB',
  '#E1C9D1',
  '#DABDC9',
  '#D3B1C2',
  '#CCA6BC',
  '#C49AB6',
  '#BD90B2',
  '#B685AE',
  '#AE7BAA',
  '#A772A7',
  '#9B68A0',
  '#8E6099',
]
// size of each box in px
const boxSize = 20;
let maxCount;
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

const generateSVG = (rawData) => {

  const data = cleanUpData(rawData);
  const today = new Date(new Date().setHours(0, 0, 1));
  const olderDate = data[data.length - 1].date;

  maxCount = Math.floor(Math.max(...data.map(d => d.wordcount)));

  const generateRect = (dayData) => {
    const offsetX = dayData.date.getDay() * (boxSize + 2);
    let colorIndex = 0; // color defaults to white (index 0)
    if (dayData.wordcount) {
      colorIndex =
        Math.floor((dayData.wordcount) / (maxCount + 1) * (colors.length - 1)) + 1;
    }
    const endOfLastWeek = new Date(today.valueOf() + (6 - today.getDay()) * msPerDay);
    const daysAgo = Math.floor((endOfLastWeek.valueOf() - dayData.date.valueOf()) / msPerDay);
    const weeksAgo = Math.floor((daysAgo) / 7);
    const color = colors[colorIndex];
    const offsetY = weeksAgo * (boxSize + 2);
    return `<rect class="day" width="${boxSize}" height="${boxSize}" x="${offsetX}" y="${offsetY}" fill="${color}" data-count="${dayData.wordcount}" data-date="${dayData.date.toDateString()}"></rect>`;
  };


  const endOfWeek = new Date((6 - today.getDay()) * msPerDay + today.valueOf());
  const totalWeeksAgo = Math.ceil((endOfWeek.valueOf() - olderDate.valueOf()) / 7 / msPerDay) - 1;
  const daysSVG = dataToMap.map(day => generateRect(day));
  const svgString = daysSVG.join('\n');


  return `<svg width="${12 * (boxSize + 2)}" height="${(boxSize + 2) * (totalWeeksAgo + 2)}">
  <g transform="translate(2,${(boxSize + 2)})">
  ${svgString}
  <text class="label-week" x="${(boxSize + 2.5) * 7}" y="${(boxSize - 6)}" fill="#000000">This week</text>
  <text class="label-week" x="${(boxSize + 2.5) * 7}" y="${(boxSize * 2 - 4)}" fill="#000000">Last week</text>
  <text class="label-week" x="${(boxSize + 2.5) * 7}" y="${(boxSize * 3 - 2)}" fill="#FFFFFF">etc...</text>
  <rect class="key" width="${boxSize}" height="${boxSize}" x="${(boxSize + 2.5) * 7}" y="${(boxSize + 2) * 5 + 10}" fill="${colors[0]}"></rect>
  <text class="key-label" x="${(boxSize + 2.5) * 8}" y="${(boxSize + 5) * 5 + 10}" fill="#000000">Less</text>
  <text class="key-label" x="${(boxSize + 2.5) * 8}" y="${(boxSize + 28) * 5 + 10}" fill="#000000">More</text>
  </g>
  </svg>`;
};



