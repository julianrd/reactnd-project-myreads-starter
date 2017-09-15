import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';
import { search } from './BooksAPI';
import { apiResultToBook } from './App.js'

class SearchBooks extends React.Component {
  state = {
    query: '',
    results: []
  }

  typeWatch = () => {
    let timer = 0;
    return (callback, ms) => {
      clearTimeout(timer);
      timer = setTimeout(callback, ms)
    }
  }

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
          {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
  
                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
        */}
          <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(e) => this.handleChange(e.target.value)} />
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