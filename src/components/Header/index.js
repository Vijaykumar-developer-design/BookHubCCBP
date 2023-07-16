import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiMenu} from 'react-icons/fi'
import {MdClear} from 'react-icons/md'

import './index.css'

class Header extends Component {
  state = {displayOver: false}

  onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onSlide = () => {
    this.setState({displayOver: true})
  }

  offSlide = () => {
    this.setState({displayOver: false})
  }

  render() {
    const {displayOver} = this.state
    const {location} = this.props
    const {pathname} = location
    console.log(this.props)

    const applyCss = pathname === '/' ? 'selects' : 'link'
    const applyCssN = pathname === '/shelf' ? 'selects' : 'link'
    const displayFlow = displayOver ? 'overlay' : 'notOver'
    return (
      <>
        <nav className="navbar">
          <Link to="/">
            <img
              alt="website logo"
              className="navlogo"
              src="https://res.cloudinary.com/djyawllgy/image/upload/v1688878951/BookhubWeb/Group_7731weblogo_oj7i8f.jpg"
            />
          </Link>

          <ul className="links">
            <li className="headerLink">
              <Link className={applyCss} to="/">
                Home
              </Link>
            </li>
            <li className="headerLink">
              <Link className={applyCssN} to="/shelf">
                Bookshelves
              </Link>
            </li>
            <li className="headerLink">
              <button type="button" onClick={this.onLogout} className="logout">
                Logout
              </button>
            </li>
          </ul>

          <FiMenu onClick={this.onSlide} className="menuIcon" />
        </nav>
        <div className={displayFlow}>
          <div className="smallmenu">
            <Link className={applyCss} to="/">
              Home
            </Link>
            <Link className={applyCssN} to="/shelf">
              Bookshelves
            </Link>

            <button type="button" onClick={this.onLogout} className="logout">
              Logout
            </button>

            <MdClear onClick={this.offSlide} className="cancel" />
          </div>
        </div>
      </>
    )
  }
}
export default withRouter(Header)

// import React, {Component} from 'react'
// import {Link} from 'react-router-dom'
// import Cookies from 'js-cookie'
// import {FiMenu} from 'react-icons/fi'
// import {MdClear} from 'react-icons/md'

// import './index.css'

// class Header extends Component {
//   state = {
//     displayOver: false,
//   }

//   onLogout = () => {
//     const {history} = this.props
//     Cookies.remove('jwt_token')
//     history.replace('/login')
//   }

//   onSlide = () => {
//     this.setState({displayOver: true})
//   }

//   offSlide = () => {
//     this.setState({displayOver: false})
//   }

//   render() {
//     const {displayOver} = this.state
//     const {location} = this.props
//     const currentLocation = location.pathname
//     const applyCss = currentLocation === '/' ? 'selects' : 'link'
//     const applyCssN = currentLocation === '/shelf' ? 'selects' : 'link'
//     const displayFlow = displayOver ? 'overlay' : 'notOver'

//     return (
//       <>
//         <nav className="navbar">
//           <Link to="/">
//             <img
//               alt="website logo"
//               className="navlogo"
//               src="https://res.cloudinary.com/djyawllgy/image/upload/v1688878951/BookhubWeb/Group_7731weblogo_oj7i8f.jpg"
//             />
//           </Link>

//           <ul className="links">
//             <Link className={applyCss} to="/">
//               <li>Home</li>
//             </Link>

//             <Link className={applyCssN} to="/shelf">
//               <li>Bookshelves</li>
//             </Link>

//             <button type="button" onClick={this.Logout} className="logout">
//               Logout
//             </button>
//           </ul>

//           <FiMenu onClick={this.onSlide} className="menuIcon" />
//         </nav>
//         <div className={displayFlow}>
//           <div className="smallmenu">
//             <Link className={applyCss} to="/">
//               Home
//             </Link>
//             <Link className={applyCssN} to="/shelf">
//               Bookshelves
//             </Link>

//             <button type="button" onClick={this.onLogout} className="logout">
//               Logout
//             </button>

//             <MdClear onClick={this.offSlide} className="cancel" />
//           </div>
//         </div>
//       </>
//     )
//   }
// }

// export default Header

// import {useState} from 'react'
// import {Link, useHistory, useLocation} from 'react-router-dom'
// import Cookies from 'js-cookie'
// import {FiMenu} from 'react-icons/fi'
// import {MdClear} from 'react-icons/md'

// import './index.css'

// const Header = () => {
//   const [displayOver, updateOver] = useState(false)
//   const history = useHistory()
//   const location = useLocation()
//   const currentLocation = location.pathname
//   const Logout = () => {
//     Cookies.remove('jwt_token')
//     history.replace('/login')
//   }

//   const onSlide = () => {
//     console.log('slide')
//     updateOver(true)
//   }
//   const offSlide = () => {
//     updateOver(false)
//   }
//   const applyCss = currentLocation === '/' ? 'selects' : 'link'
//   const applyCssN = currentLocation === '/shelf' ? 'selects' : 'link'
//   const displayFlow = displayOver ? 'overlay' : 'notOver'
//   return (
//     <>
//       <nav className="navbar">
//         <Link to="/">
//           <img
//             alt="website logo"
//             className="navlogo"
//             src="https://res.cloudinary.com/djyawllgy/image/upload/v1688878951/BookhubWeb/Group_7731weblogo_oj7i8f.jpg"
//           />
//         </Link>

//         <ul className="links">
//           <Link className={applyCss} to="/">
//             <li>Home</li>
//           </Link>

//           <Link className={applyCssN} to="/shelf">
//             <li>Bookshelves</li>
//           </Link>

//           <button type="button" onClick={Logout} className="logout">
//             Logout
//           </button>
//         </ul>

//         <FiMenu onClick={onSlide} className="menuIcon" />
//       </nav>
//       <div className={displayFlow}>
//         <div className="smallmenu">
//           <Link className={applyCss} to="/">
//             Home
//           </Link>
//           <Link className={applyCssN} to="/shelf">
//             Bookshelves
//           </Link>

//           <button type="button" onClick={Logout} className="logout">
//             Logout
//           </button>

//           <MdClear onClick={offSlide} className="cancel" />
//         </div>
//       </div>
//     </>
//   )
// }
// export default Header
