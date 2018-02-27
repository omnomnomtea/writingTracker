import React from 'react'

const SingleEntry = (props) => {
  const entry = props.entry;
  const odd = props.odd || !props.even;
  const even = props.even || !props.odd;

  const evenOrOdd = props.odd? "odd" : "even"
  return (
      <div className={'single-entry ' + evenOrOdd}>
        <span className="date"> {new Date(entry.date).toDateString()} </span>
        <span className="wordcount">{entry.wordcount}</span>
      </div>
  )
}



export default SingleEntry;
