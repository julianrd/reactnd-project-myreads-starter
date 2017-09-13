import React from 'react';
import PropTypes from 'prop-types';

const options = [
  {
    title: "Currently Reading",
    value: "currentlyReading"
  },
  {
    title: "Want to Read",
    value: "wantToRead"
  },
  {
    title: "Read",
    value: "read"
  }
]

const ShelfChanger = (props = { selected: "none" }) => (
  <div className="book-shelf-changer">
    <select onChange={(e) => props.update(e.target.value)}
      defaultValue={props.selected ? props.selected : 'none'}
    >
      <option disabled value="none" >Move to...</option>
      {options.map(s =>
        <option key={s.value} value={s.value}>{s.title}</option>
      )}{/*
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>*/}
    </select>
  </div>
)

ShelfChanger.propTypes = {
  selected: PropTypes.string,
  update: PropTypes.func.isRequired
}

export default ShelfChanger;