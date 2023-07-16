import {useState, useEffect, useCallback} from 'react'

import {Link} from 'react-router-dom/cjs/react-router-dom.min'
import Cookies from 'js-cookie'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
// import {AiFillStar} from 'react-icons/ai'
import Header from '../Header'
import FailureView from '../FailureView'
import LoadingView from '../LoadingView'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]
// const bookStatus = [
//   {id: 1, label: 'All', value: 'ALL'},
//   {id: 2, label: 'Read', value: 'READ'},
//   {
//     id: 3,
//     label: 'Currently Reading',
//     value: 'CURRENTLY_READING',
//   },
//   {
//     id: 4,
//     label: 'Want to Read',
//     value: 'WANT_TO_READ',
//   },
// ]

const apiStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const BookShelf = () => {
  const [book, updateBook] = useState(bookshelvesList[0].id)
  const [userInput, updateUserInput] = useState('')
  const [bookItems, updateBookItems] = useState([])
  const [status, updateStatus] = useState(apiStatus.initial)
  const [stack, updateStack] = useState('All Books')
  const [bookTitle, updateBookTitle] = useState(bookshelvesList[0].value)

  const getBooks = useCallback(async () => {
    updateStatus(apiStatus.progress)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookTitle}&search=${userInput}`
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const bookElement = data.books
      // console.log("called");
      const booksArray = bookElement.map(each => ({
        authorName: each.author_name,
        title: each.title,
        id: each.id,
        coverPic: each.cover_pic,
        rating: each.rating,
        readStatus: each.read_status,
      }))
      // console.log(booksArray);
      updateBookItems([...booksArray])
      updateStatus(apiStatus.success)
    } else {
      updateStatus(apiStatus.failure)
    }
  }, [bookTitle, userInput])

  useEffect(() => {
    getBooks()
  }, [bookTitle, getBooks])

  const updateActive = details => {
    const {id, label, value} = details
    updateBook(id)
    const statusItem = `${label} Books`
    updateStack(statusItem)
    updateBookTitle(value)
  }
  const updateSearch = event => {
    updateUserInput(event.target.value)
  }
  const renderMenu = () => (
    <>
      <div className="munuitems">
        <h1 className="menuhead">Bookshelves</h1>
        <ul className="ullist">
          {bookshelvesList.map(each => {
            const {id, label, value} = each
            const details = {id, label, value}
            const applyCss = book === id && 'makeBlue'

            return (
              <li key={id}>
                <button
                  type="button"
                  key={id}
                  onClick={() => updateActive(details)}
                  className={`listitem ${applyCss}`}
                >
                  {label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="searchIconDivSmall">
        <input
          value={userInput}
          onChange={updateSearch}
          placeholder="Search"
          className="searchinputsmall"
          type="search"
        />
        <button
          onClick={() => {
            getBooks()
          }}
          testid="searchButton"
          type="button"
          className="search-small-btn"
        >
          <BsSearch className="searchIcon" />
        </button>
      </div>
      <div className="munuitemssmall">
        <p className="menuheadsmall">Bookshelves</p>
        <ul className="ullistsmall">
          {bookshelvesList.map(each => {
            const {id, label, value} = each
            const details = {id, label, value}
            const applyCss = book === id && 'applyBg'

            return (
              <li
                key={id}
                onClick={() => updateActive(details)}
                className={`listitemsmall ${applyCss}`}
              >
                {label}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )

  const renderNoResult = () => (
    <div className="nobookscontinaer">
      <img
        className="nobooks"
        src="https://res.cloudinary.com/djyawllgy/image/upload/v1689249289/BookhubWeb/Asset_1_1_omuqso.jpg"
        alt="no books"
      />
      <p>Your search for {userInput} did not find any matches.</p>
    </div>
  )

  const renderBooks = () => (
    <div className="bookssContainer">
      <ul className="booksUlList">
        {bookItems.map(each => {
          const {readStatus, id, title, authorName, coverPic, rating} = each
          return (
            <li className="bookLink" key={id}>
              <Link className="bookItemLink" key={id} to={`/books/${id}`}>
                <div className="bookItem">
                  <img className="bookImg" src={coverPic} alt={title} />
                  <div className="details">
                    <h1 className="bookTitle">{title}</h1>
                    <p className="authorName">{authorName}</p>
                    <p className="rating">
                      Avg Rating{' '}
                      <span className="iconspan">
                        <BsFillStarFill className="staricon" />
                      </span>
                      {rating}
                    </p>
                    <p className="status">
                      Status : <span className="spanstatus">{readStatus}</span>
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )

  const renderSuccess = () => (
    <>
      <div className="itemsContainer">
        {bookItems.length > 0 ? renderBooks() : renderNoResult()}
      </div>
    </>
  )
  const rednderBottom = () => (
    <div className="iconsdiv">
      <footer className="icons">
        <FaGoogle className="icon" />
        <FaTwitter className="icon" />
        <FaInstagram className="icon" />
        <FaYoutube className="icon" />
      </footer>
      <p>Contact us</p>
    </div>
  )
  const renderComponent = () => {
    // console.log(status);
    switch (status) {
      case 'SUCCESS':
        return renderSuccess()
      case 'PROGRESS':
        return <LoadingView />
      case 'FAILURE':
        return <FailureView retryAgain={getBooks} />
      default:
        return null
    }
  }
  return (
    <div className="shelfbg">
      <Header />
      <div className="booksdivs">
        {apiStatus.success && renderMenu()}
        <div className="lowerDiv">
          <div className="searchtop">
            <h1 className="bookscategoryText">{stack}</h1>
            <div className="searchIconDiv">
              <input
                value={userInput}
                onChange={updateSearch}
                placeholder="Search"
                className="searchinput"
                type="text"
              />
              <button
                onClick={() => {
                  getBooks()
                }}
                testid="searchButton"
                type="button"
                className="search-small-btn"
              >
                <BsSearch className="searchIcon" />
              </button>
            </div>
          </div>
          {renderComponent()}
          {apiStatus.success && rednderBottom()}
        </div>
      </div>
    </div>
  )
}
export default BookShelf

// const getBooks = async () => {
//   updateStatus(apiStatus.progress);
//   const jwtToken = Cookies.get("jwt_token");
//   const options = {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${jwtToken}`,
//     },
//   };
//   const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookTitle}&search=${userInput}`;
//   const response = await fetch(url, options);
//   const data = await response.json();
//   if (response.ok === true) {
//     const books = data.books;
//     console.log("called");
//     const booksArray = books.map((each) => ({
//       authorName: each.author_name,
//       title: each.title,
//       id: each.id,
//       coverPic: each.cover_pic,
//       rating: each.rating,
//       readStatus: each.read_status,
//     }));
//     // console.log(booksArray);
//     updateBookItems([...booksArray]);
//     updateStatus(apiStatus.success);
//   } else {
//     updateStatus(apiStatus.failure);
//   }
// };
