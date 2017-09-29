import React from 'react';
import PropTypes from 'prop-types';
import { bookShelves } from './App';

/**
 * @description Renders a button that allows the user to change a book's current shelf.
 * @constructor
 * @param {*} props An object including the book's currently selected shelf, and an update function to change the book's shelf.
 */
const ShelfChanger = (props = { selected: "none" }) => (
  <div className="book-shelf-changer">
    <select onChange={(e) => props.update(e.target.value)}
      defaultValue={props.selected ? props.selected : 'none'}
    >
      <option disabled value="none" >Move to...</option>
      {bookShelves.map(s =>
        <option key={s.value} value={s.value}>{s.title}</option>
      )}
    </select>
  </div>
)

ShelfChanger.propTypes = {
  selected: PropTypes.string,
  update: PropTypes.func.isRequired
}

export default ShelfChanger;