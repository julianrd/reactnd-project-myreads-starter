import React from 'react';
import ShelfChanger from './ShelfChanger'
import PropTypes from 'prop-types'


const Book = (props) => (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: props.imageURL }}></div>
      <ShelfChanger selected={props.shelve} />
    </div>
    <div className="book-title">{props.title}</div>
    <div className="book-authors">{props.author}</div>
  </div>
)

Book.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  shelve: PropTypes.string
}

export default Book;