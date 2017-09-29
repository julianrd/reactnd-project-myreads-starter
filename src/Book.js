import React from 'react';
import ShelfChanger from './ShelfChanger';
import PropTypes from 'prop-types';

/**
 * @description Renders a book
 * @constructor
 * @extends React.Component.
 * @param {*} props An object including: id, tittle, authors, imageURL, shelf and an update function.
 */
const Book = (props) => (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: props.imageURL }}></div>
      <ShelfChanger selected={props.shelf} update={props.update}/>
    </div>
    <div className="book-title">{props.title}</div>
    {props.authors.map((a,i) =>
      <div key={i} className="book-authors">{a}</div>
    )}
  </div>
)

Book.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  imageURL: PropTypes.string.isRequired,
  shelf: PropTypes.string,
  update: PropTypes.func.isRequired
}

export default Book;