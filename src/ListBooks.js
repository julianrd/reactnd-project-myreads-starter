import React from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const getShelfBooks = (value, books) => {
  return books.filter(b => b.shelve === value)
}

const ListBooks = (props) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>{props.shelves.map(bs =>
        <BookShelf key={bs.title} title={bs.title} books={getShelfBooks(bs.value, props.books)} />
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
  books: PropTypes.array.isRequired
}

export default ListBooks