import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types'

/**
 * @description Renders a shelf.
 * @constructor
 * @extends React.Component
 * @param {*} props An object including title, books, and an updateBook function.
 */
const BookShelf = (props) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.map(b =>
          <li key={b.id}>
            <Book {...b} update={props.updateBook(b)}/>
          </li>
        )}
      </ol>
    </div>
  </div>
)

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired
}

export default BookShelf;