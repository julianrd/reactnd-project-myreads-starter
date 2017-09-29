import React from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

/**
 * Returns an array with the books that are currently in the given shelf.
 * @param {string} value The shelf name.  
 * @param {array} books A books array.
 * @return {array} A books array.
 */
const getShelfBooks = (value, books) => {
  return books.filter(b => b.shelf === value)
}

/**
 * @description Renders a list of books.
 * @constructor
 * @extends React.Component
 * @param {*} props An object including the shelves, books on shelves, and a function to update a book status.
 */
const ListBooks = (props) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>{props.shelves.map(bs =>
        <BookShelf
          key={bs.title}
          title={bs.title}
          books={getShelfBooks(bs.value, props.books)}
          updateBook={props.updateBook} />
      )}
      </div>
    </div>
    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  </div>
)

ListBooks.propTypes = {
  shelves: PropTypes.array.isRequired,
  books: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired
}

export default ListBooks