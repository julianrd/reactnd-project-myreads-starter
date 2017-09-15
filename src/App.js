import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import { getAll, update } from './BooksAPI';

const bookShelves = [
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

export const apiResultToBook = ({ id, title, authors = [], imageLinks, shelf = 'none' } = {}) => {
  return { id, title, authors, imageURL: `url("${imageLinks.thumbnail}")`, shelf }
}

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

export default BooksApp