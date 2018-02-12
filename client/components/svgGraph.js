import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProject } from '../store'
import { cleanUpData } from '../utils'

const msPerDay = 1000 * 60 * 60 * 24;


const SvgGraph = (props) => {
  const data = cleanUpData(props.data);
  const colors = [
    '#eeeeee',
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
  ];

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
    return (
      <rect className="day" key={dayData.id} width={boxSize} height={boxSize} x={offsetX} y={offsetY} fill={color} data-count={dayData.wordcount} data-date={dayData.date.toDateString()} />
    );
  };

  const boxSize = 20;
  const maxCount = Math.floor(Math.max(...data.map(d => d.wordcount)));
  const today = new Date(new Date().setHours(0, 0, 1));
  const olderDate = data[data.length - 1].date;

  const endOfWeek = new Date((6 - today.getDay()) * msPerDay + today.valueOf());
  const totalWeeksAgo = Math.ceil((endOfWeek.valueOf() - olderDate.valueOf()) / 7 / msPerDay) - 1;

  return (
    <svg width={12 * (boxSize + 2)} height={(boxSize + 2) * (totalWeeksAgo + 2)}>

      {
        data.slice(0,365).map(day => generateRect(day))
      }
      {
        // color key
        colors.map((color, i) => {
          return <rect key={colors[i]} className="key" width={boxSize} height={boxSize} x={(boxSize + 2.5) * 7} y={(boxSize + 2) * (i + 5) + 10} fill={colors[i]} />
        })
      }
      <text className="key-label" x={(boxSize + 2.5) * 8} y={(boxSize + 5) * 5 + 10} fill="#000000">Less</text>
      <text className="key-label" x={(boxSize + 2.5) * 8} y={(boxSize + 28) * 5 + 10} fill="#000000">More</text>

    </svg>
  )



}



export default SvgGraph;

