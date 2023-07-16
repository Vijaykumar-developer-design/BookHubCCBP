import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const topRatedApiStatuses = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  slidesToScroll: 1,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 786,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {topRatedApiStatus: topRatedApiStatuses.initial, topRatedBooks: []}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({topRatedApiStatus: topRatedApiStatuses.inProgress})

    const topRatedBooksApi = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(topRatedBooksApi, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const booksList = fetchedData.books
      const updatedData = booksList.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))
      this.setState({
        topRatedApiStatus: topRatedApiStatuses.success,
        topRatedBooks: updatedData,
      })
    } else {
      this.setState({topRatedApiStatus: topRatedApiStatuses.failure})
    }
  }

  onClickRetry = () => {
    this.getTopRatedBooks()
  }

  onClickFindBooks = () => {
    const {history} = this.props
    history.push('/shelf')
  }

  renderSliderSuccessView = () => {
    const {topRatedBooks} = this.state

    return (
      <Slider {...settings}>
        {topRatedBooks.map(eachBook => {
          const {id, title, coverPic, authorName} = eachBook
          const onClickedTopRatedBook = () => {
            const {history} = this.props
            history.push(`/books/${id}`)
          }

          return (
            <div className="top-rated-book-item-container" key={id}>
              <button
                onClick={onClickedTopRatedBook}
                className="top-rated-card-btn"
                type="button"
              >
                <div className="top-rated-book-image-container">
                  <img
                    className="top-rated-book-image"
                    src={coverPic}
                    alt={title}
                  />
                </div>
                <h1 className="top-rated-book-name">{title}</h1>
                <p className="top-rated-book-author">{authorName}</p>
              </button>
            </div>
          )
        })}
      </Slider>
    )
  }

  renderSliderProgressView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#8284C7" height={50} width={50} />
    </div>
  )

  renderSliderViewFailure = () => (
    <div className="top-rated-books-failure-container">
      <img
        className="top-rated-books-failure-image"
        src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647250727/Screenshot_30_uavmge.png"
        alt="failure view"
      />

      <p className="top-rated-books-failure-heading">
        Something Went wrong. Please try again.
      </p>
      <button
        className="top-rated-books-failure-btn"
        onClick={this.onClickRetry}
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderSlider = () => {
    const {topRatedApiStatus} = this.state

    switch (topRatedApiStatus) {
      case topRatedApiStatuses.success:
        return <>{this.renderSliderSuccessView()}</>
      case topRatedApiStatuses.inProgress:
        return <>{this.renderSliderProgressView()}</>
      case topRatedApiStatuses.failure:
        return <> {this.renderSliderViewFailure()}</>
      default:
        return null
    }
  }

  rednderBottom = () => (
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

  render() {
    return (
      <>
        <Header home />
        <div className="home-page-bg-container">
          <h1 className="home-heading" key="title">
            Find Your Next Favorite Books?
          </h1>
          <p className="home-paragraph">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <button
            className="home-find-books-btn books-responsive-btn-sm"
            type="button"
            onClick={this.onClickFindBooks}
          >
            Find Books
          </button>
          <div>
            <div className="home-top-rated-container">
              <div className="top-rated-heading-container">
                <h1 className="top-rated-heading">Top Rated Books</h1>
                <button
                  className="home-find-books-btn books-responsive-btn-lg"
                  type="button"
                  onClick={this.onClickFindBooks}
                >
                  Find Books
                </button>
              </div>
              <div className="slick-container">{this.renderSlider()}</div>
            </div>
          </div>
          {this.rednderBottom()}
        </div>
      </>
    )
  }
}

export default Home
// import {useEffect, useState} from 'react'
// import {Link} from 'react-router-dom'
// import Slider from 'react-slick'
// import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
// import Cookies from 'js-cookie'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'
// import Header from '../Header'
// import FailureView from '../FailureView'
// import LoadingView from '../LoadingView'

// import './index.css'

// const apiStatus = {
//   initial: 'INITIAL',
//   progress: 'PROGRESS',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
// }

// const Home = () => {
//   const [topRateObj, updateTopRated] = useState([])
//   const [status, updateStatus] = useState(apiStatus.initial)

//   const getTopRatedBooks = async () => {
//     updateStatus(apiStatus.progress)
//     const jwtToken = Cookies.get('jwt_token')
//     const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
//     const options = {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//     }
//     const response = await fetch(url, options)
//     // console.log(response);
//     const data = await response.json()
//     if (response.ok === true) {
//       const booksObj = data.books
//       const bookItems = booksObj.map(each => ({
//         authorName: each.author_name,
//         coverPic: each.cover_pic,
//         id: each.id,
//         title: each.title,
//       }))
//       updateStatus(apiStatus.success)
//       updateTopRated([...bookItems])
//     } else {
//       updateStatus(apiStatus.failure)
//       console.log('failed')
//     }
//   }
//   useEffect(() => {
//     getTopRatedBooks()
//   }, [])

//   const renderSmallSlider = () => {
//     const settings = {
//       dots: false,
//       infinite: true,
//       speed: 500,
//       slidesToShow: 2,
//       slidesToScroll: 2,
//     }

//     return (
//       <Slider {...settings}>
//         {topRateObj.map(each => {
//           const {authorName, title, id, coverPic} = each
//           return (
//             <li key={id}>
//               <Link key={id} className="link" to={`/books/${id}`}>
//                 <div className="slickIitem">
//                   <img className="coverpage" src={coverPic} alt={title} />
//                   <h1 className="covertitle">{title}</h1>
//                   <h1 className="authorName">{authorName}</h1>
//                 </div>
//               </Link>
//             </li>
//           )
//         })}
//       </Slider>
//     )
//   }
//   const renderBigSlider = () => {
//     const settings = {
//       dots: false,
//       infinite: true,
//       speed: 700,
//       slidesToShow: 4,
//       slidesToScroll: 4,
//     }

//     return (
//       <Slider {...settings}>
//         {topRateObj.map(each => {
//           const {authorName, title, id, coverPic} = each
//           return (
//             <li key={id}>
//               <Link className="link" to={`/books/${id}`}>
//                 <div className="slickIitem">
//                   <img className="coverpage" src={coverPic} alt={title} />
//                   <h1 className="covertitle">{title}</h1>
//                   <h1 className="authorName">{authorName}</h1>
//                 </div>
//               </Link>
//             </li>
//           )
//         })}
//       </Slider>
//     )
//   }

//   const rednderSuccess = () => (
//     <>
//       <div className="slider-container bigSlider">{renderBigSlider()}</div>
//       <div className="slider-container smallSlider">{renderSmallSlider()}</div>
//     </>
//   )

//   const rednderBottom = () => (
//     <div className="iconsdiv">
//       <footer className="icons">
//         <FaGoogle className="icon" />
//         <FaTwitter className="icon" />
//         <FaInstagram className="icon" />
//         <FaYoutube className="icon" />
//       </footer>
//       <p>Contact us</p>
//     </div>
//   )

//   // const onTryAgain = () => {
//   //   getTopRatedBooks();
//   // };
//   // const renderFailure = () => {
//   //   return (
//   //     <div className="failureDiv">
//   //       <img
//   //         className="failureImg"
//   //         src="https://res.cloudinary.com/djyawllgy/image/upload/v1689073252/BookhubWeb/Group_7522_mgpcoq.jpg"
//   //         alt="tryagain"
//   //       />
//   //       <p>Something went wrong, Please try again.</p>
//   //       <button onClick={onTryAgain} className="retrybtn">
//   //         Try Again
//   //       </button>
//   //     </div>
//   //   );
//   // };

//   const renderComponent = () => {
//     // console.log(status);
//     switch (status) {
//       case 'SUCCESS':
//         return rednderSuccess()
//       case 'PROGRESS':
//         return <LoadingView />
//       case 'FAILURE':
//         return <FailureView retryAgain={getTopRatedBooks} />
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="homebg">
//       <Header />
//       {/* {renderComponent()} */}

//       <div className="lower">
//         <div className="seconddiv">
//           <h1 className="homeHead">Find Your Next Favorite Books?</h1>
//           <p className="descriptionHome">
//             You are in the right place. Tell us what titles or genres you have
//             enjoyed in the past, and we will give you surprisingly insightful
//             recommendations.
//           </p>
//           <Link to="/shelf">
//             <button type="button" className="smallFindBooksbtn">
//               Find Books
//             </button>
//           </Link>
//           <div className="slickdiv">
//             <div className="toprateddiv">
//               <h1 className="toprate">Top Rated Books</h1>

//               <Link to="/shelf">
//                 <button type="button" className="findbooksbtn">
//                   Find Books
//                 </button>
//               </Link>
//             </div>

//             <div className="sliders">{renderComponent()}</div>
//           </div>
//         </div>
//       </div>
//       <div className="iconlink">{topRateObj.length > 0 && rednderBottom()}</div>
//     </div>
//   )
// }
// export default Home
