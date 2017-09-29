import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';
import { search } from './BooksAPI';
import { apiResultToBook } from './App.js'

/**
 * @description Renders a form that allows users to search books.
 * @constructor
 * @extends React.Component
 */
class SearchBooks extends React.Component {
  state = {
    query: '',
    results: []
  }

  /**
   * @description Delays the execution of a given function a given number of miliseconds.
   * @return {Function} A function that accepts a callback to be delayed and the number of miliseconds.
   * 
   * Inspired by:
   * https://stackoverflow.com/questions/1909441/how-to-delay-the-keyup-handler-until-the-user-stops-typing/18552683
   * Thanks to CMS and sventechie
   */
  typeWatch = () => {
    let timer = 0;
    return (callback, ms) => {
      clearTimeout(timer);
      timer = setTimeout(callback, ms)
    }
  }

  /**
   * @description Manages the update of the query state and updates the state with the results of the API search.
   * @param {string} query The string to query the API.
   */
  handleChange = (query) => {
    if (query === '') {
      this.setState({
        query: query,
        results: []
      })
    }
    else {
      this.setState({
        ...this.state,
        query: query
      })
      this.typeWatch(search(query, 20)
        .then(books => {
          if (books.error) books = []
          this.setState({
            ...this.state,
            results: books.map(result => {
              if (this.props.currentBooks.has(result.id))
                result.shelf = this.props.currentBooks.get(result.id);
              return apiResultToBook(result);
            })
          })
        }), 1500);
    }
  }

  render() {
    return <div className="search-books" >
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text"
            placeholder="Search by title or author"
            value={this.state.query}
            onChange={(e) => this.handleChange(e.target.value)}
          />
        </div>
      </div>
      {this.state.results.length === 0 &&
        <h2>No results</h2>
      }
      {this.state.results.length !== 0 &&
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results.map(b =>
              <li key={b.id}>
                <Book {...b} update={this.props.updateBook(b)} />
              </li>
            )}
          </ol>
        </div>
      }
    </div >
  }
}

SearchBooks.propTypes = {
  currentBooks: PropTypes.array,
  updateBook: PropTypes.func.isRequired
}

export default SearchBooks