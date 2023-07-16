import {Link, withRouter} from 'react-router-dom'

import './index.css'

const NotFound = props => {
  const gotoHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="notfound">
      <img
        className="notimg"
        src="https://res.cloudinary.com/djyawllgy/image/upload/v1689250203/BookhubWeb/Group_7484_kfro31.jpg"
        alt="not found"
      />
      <h1>Page Not Found</h1>
      <p>we are sorry, the page you requested could not be found</p>
      <Link to="/">
        <button onClick={gotoHome} className="goback" type="button">
          Go Back to Home
        </button>
      </Link>
    </div>
  )
}

export default withRouter(NotFound)
