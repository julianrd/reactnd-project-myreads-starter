import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import { getAll, update } from './BooksAPI';


/**
 * Represents the 3 available shelves in the page.
 * @const
 */
export const bookShelves = [
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

/**
 * @description Extracts the relevant properties from a book object returned from the API.
 * @param {Object} apiBook - A book object as returned from an API call.
 * @return {Object} A book object, with only the relevant properties.
 */
export const apiResultToBook = ({ id, title, authors = [], imageLinks, shelf = 'none' } = {}) => {
  return { id, title, authors, imageURL: `url("${imageLinks.thumbnail}")`, shelf }
}

/**
 * @description Contains the app core functionality.
 * @constructor
 * @extends React.Component
 */
class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookShelves: bookShelves,
      books: []
    };
    this.updateBook.bind(this);
  }

  componentDidMount() {
    getAll().then(books => {
      this.setState({
        ...this.state,
        books: books.map(b => apiResultToBook(b))
      });
    })
  }

  /**
   * @description Curried function that moves book to a shelf and updates it's state in the server.
   * @param {Object} book A book object.
   * @return {function} Function that takes the shelf name and does the update.
   */
  updateBook = (book) => {
    return (shelf) => {
      update(book, shelf).then((shelves) => {    
        this.setState((prevState) => {
          const books = prevState.books.filter(b => b.id !== book.id);
          return {
          ...prevState,
          books: [...books, { ...book, shelf: shelf }]
          }
        });
      });
    }
  }

  /**
   * @description Converts an array of books into a Map with their corresponding shelves.
   * @param {array} books An array of books.
   * @return {Map} A map with book ids as keys and the corresponding shelves as values.
   */
  getBooksMap = (books) => {
    let map =  new Map();
    for (const book of books){
      map.set(book.id, book.shelf);
    }
    return map;
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks shelves={this.state.bookShelves} books={this.state.books} updateBook={this.updateBook} />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks currentBooks={this.getBooksMap(this.state.books)} updateBook={this.updateBook} />
        )} />
      </div>
    )
  }
}

export default BooksApp;