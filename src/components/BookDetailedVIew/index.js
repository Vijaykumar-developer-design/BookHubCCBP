import {useEffect, useState, useCallback} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import LoadingView from '../LoadingView'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const BookDetailedView = () => {
  const [reTry, updateTry] = useState(false)
  const [status, updateStatus] = useState(apiStatus.initial)
  const [empty, updateEmpty] = useState(false)
  const [bookObj, updateObj] = useState({})
  const {id} = useParams()

  const getBooks = useCallback(async () => {
    updateStatus(apiStatus.progress)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data);
    if (response.ok === true) {
      const book = data.book_details
      //   console.log(book);
      const bookObject = {
        authorName: book.author_name,
        title: book.title,
        id: book.id,
        coverPic: book.cover_pic,
        rating: book.rating,
        readStatus: book.read_status,
        aboutBook: book.about_book,
        aboutAuthor: book.about_author,
      }
      // console.log(booksArray);
      updateObj({...bookObject})
      updateStatus(apiStatus.success)
      updateEmpty(true)
    } else {
      updateStatus(apiStatus.failure)
    }
  }, [id])
  // console.log(bookObj);
  useEffect(() => {
    getBooks()
  }, [reTry, getBooks])
  const rednderBottom = () => (
    <div className="iconsdivbook">
      <footer className="iconsbook">
        <FaGoogle className="iconbook" />
        <FaTwitter className="iconbook" />
        <FaInstagram className="iconbook" />
        <FaYoutube className="iconbook" />
      </footer>
      <p>Contact us</p>
    </div>
  )

  const renderSuccess = () => {
    const {
      title,
      coverPic,
      rating,
      authorName,
      aboutAuthor,
      readStatus,
      aboutBook,
    } = bookObj
    return (
      <div className="bookDetails">
        <div className="book">
          <img className="mainImg" src={coverPic} alt={title} />
          <div className="bookTitles">
            <h1 className="bookTitleDetails">{title}</h1>
            <p className="author">{authorName}</p>
            <p className="bookRating">
              Avg Rating{' '}
              <span className="iconspan">
                <BsFillStarFill className="staricon" />
              </span>
              {rating}
            </p>
            <p className="bookStatus">
              Status: <span className="bookSpan">{readStatus}</span>
            </p>
          </div>
        </div>
        <hr className="hrline" />
        <div className="description">
          <h1 className="aboutAuthor">About Author</h1>
          <p>{aboutAuthor}</p>
        </div>
        <div className="description">
          <h1 className="aboutAuthor">About Book</h1>
          <p>{aboutBook}</p>
        </div>
      </div>
    )
  }
  const onTryAgain = () => {
    updateTry(!reTry)
  }
  const renderFailure = () => (
    <div className="failureDivBook">
      <img
        className="failureImgBook"
        src="https://res.cloudinary.com/djyawllgy/image/upload/v1689073252/BookhubWeb/Group_7522_mgpcoq.jpg"
        alt="failure view"
      />
      <p>Something went wrong, Please try again.</p>
      <button type="button" onClick={onTryAgain} className="retrybtn">
        Try Again
      </button>
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
        return renderFailure()
      default:
        return null
    }
  }

  return (
    <div className="detailsBg">
      <Header />
      {renderComponent()}
      {empty && rednderBottom()}
    </div>
  )
}
export default BookDetailedView
