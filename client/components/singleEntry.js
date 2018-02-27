import React from 'react'

const SingleEntry = (props) => {
  const entry = props.entry;
  const even = props.even;

  const evenOrOdd = props.even? "even" : "odd"
  return (
      <div className={'single-entry ' + evenOrOdd}>
        <span className="date"> {new Date(entry.date).toDateString()} </span>
        <span className="wordcount">{entry.wordcount}</span>
      </div>
  )
}



export default SingleEntry;
