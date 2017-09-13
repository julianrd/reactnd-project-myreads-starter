import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types'

const BookShelf = (props) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.map(b =>
          <li key={b.title}>
            <Book {...b} />
          </li>
        )}
      </ol>
    </div>
  </div>
)

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
}

export default BookShelf;