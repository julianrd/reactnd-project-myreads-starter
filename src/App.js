import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import { getAll } from './BooksAPI';

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

export const apiResultToBook = ({id, title, authors = [], imageLinks, shelf = 'none'} = {}) => {
  return { id, title, authors, imageURL: `url("${imageLinks.thumbnail}")`, shelf }
}

class BooksApp extends React.Component {
  state = {
    bookShelves: bookShelves,
    books: []
  };
  
  componentDidMount(){
    getAll().then(books =>{
      this.setState({
        ...this.state,
        books: books.map(b => apiResultToBook(b))
      })
    })
  }
  
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks shelves={this.state.bookShelves} books={this.state.books} />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks />
        )} />
      </div>
    )
  }
}

export default BooksApp