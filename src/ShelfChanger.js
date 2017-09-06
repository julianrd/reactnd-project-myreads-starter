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
  },
  {
    title: "None",
    value: "none"
  }
]

const ShelfChanger = (props = { selected: "none" }) => (
  <div className="book-shelf-changer">
    <select defaultValue={props.selected}>
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
  selected: PropTypes.string
}

export default ShelfChanger;