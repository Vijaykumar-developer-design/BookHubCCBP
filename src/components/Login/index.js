import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccuss = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccuss(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          Password*
        </label>
        <input
          type="password"
          id="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          Username*
        </label>
        <input
          type="text"
          id="username"
          className="input-field"
          placeholder="Username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/dwtsapuyn/image/upload/v1645073768/bookhub-image_ubswwx.png"
          alt="login website logo"
          className="login-website-logo-mobile-image"
        />
        <img
          src="https://res.cloudinary.com/dwtsapuyn/image/upload/v1645073768/bookhub-image_ubswwx.png"
          alt="website login"
          className="login-image"
        />
        <div className="form-main-container">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <img
              src="https://res.cloudinary.com/dwtsapuyn/image/upload/v1645077666/book-hub-logo_dy4szt.png"
              alt="website logo"
              className="login-website-logo-desktop-image"
            />
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
// import React, {Component} from 'react'
// import {Redirect} from 'react-router-dom'
// import Cookies from 'js-cookie'
// import './index.css'

// class Login extends Component {
//   state = {
//     username: '',
//     password: '',
//     showErrMsg: false,
//     errMsg: '',
//   }

//   onSuccess = jwtToken => {
//     const {history} = this.props
//     Cookies.set('jwt_token', jwtToken, {expires: 30})

//     history.replace('/')
//   }

//   updateUsername = event => {
//     this.setState(prevState => ({
//       userDetails: {
//         ...prevState,
//         username: event.target.value,
//       },
//     }))
//   }

//   updatePassword = event => {
//     this.setState(prevState => ({
//       userDetails: {
//         ...prevState,
//         password: event.target.value,
//       },
//     }))
//   }

//   gotoLogin = async event => {
//     event.preventDefault()
//     const {username, password} = this.state
//     const personDetails = {username, password}

//     const url = 'https://apis.ccbp.in/login'
//     const options = {
//       method: 'POST',
//       body: JSON.stringify(personDetails),
//     }
//     const response = await fetch(url, options)
//     const data = await response.json()
//     if (response.ok === true) {
//       const jwtToken = data.jwt_token
//       this.onSuccess(jwtToken)
//       this.setState(prevState => ({
//         userDetails: {
//           ...prevState,
//           username: '',
//           password: '',
//         },
//       }))
//     } else {
//       this.setState(prevState => ({
//         userDetails: {
//           ...prevState,
//           showErrMsg: true,
//           errMsg: data.error_msg,
//         },
//       }))
//     }
//   }

//   renderLogin = () => {
//     const {showErrMsg, errMsg, username, password} = this.state
//     return (
//       <div>
//         <div className="loginbgBig">
//           <div className="imgdiv">
//             <img
//               className="logoimg"
//               src="https://res.cloudinary.com/djyawllgy/image/upload/v1688879050/BookhubWeb/Rectangle_1467weblog_iwznxm.jpg"
//               alt="login website logo"
//             />
//           </div>
//           <div className="formdiv">
//             <form onSubmit={this.gotoLogin} className="formel">
//               <img
//                 className="logo"
//                 src="https://res.cloudinary.com/djyawllgy/image/upload/v1688878951/BookhubWeb/Group_7731weblogo_oj7i8f.jpg"
//                 alt="website login"
//               />
//               <div className="userinput">
//                 <label className="labelname" htmlFor="name">
//                   Username*
//                 </label>
//                 <input
//                   value={username}
//                   onChange={this.updateUsername}
//                   className="usertext"
//                   type="text"
//                   id="name"
//                 />
//               </div>
//               <div className="userinput">
//                 <label className="labelname" htmlFor="password">
//                   Password*
//                 </label>
//                 <input
//                   value={password}
//                   onChange={this.updatePassword}
//                   className="usertext"
//                   type="password"
//                   id="password"
//                 />
//                 {showErrMsg && <p className="error">*{errMsg}</p>}
//               </div>
//               <button type="submit" className="login">
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//         <div className="loginbgSmall">
//           <img
//             className="smalllogo"
//             src="https://res.cloudinary.com/djyawllgy/image/upload/v1688987836/BookhubWeb/Ellipse_99_jkknzh.jpg"
//             alt="login website logo"
//           />

//           <div className="formdivSmall">
//             <form onSubmit={this.gotoLogin} className="formelSmall">
//               <img
//                 className="logoSmall"
//                 src="https://res.cloudinary.com/djyawllgy/image/upload/v1688878951/BookhubWeb/Group_7731weblogo_oj7i8f.jpg"
//                 alt="website login"
//               />
//               <div className="userinputSmall">
//                 <label className="labelname" htmlFor="name">
//                   Username*
//                 </label>
//                 <input
//                   value={username}
//                   onChange={this.updateUsername}
//                   className="usertextSmall"
//                   type="text"
//                   id="name"
//                 />
//               </div>
//               <div className="userinputSmall">
//                 <label className="labelname" htmlFor="password">
//                   Password*
//                 </label>
//                 <input
//                   value={password}
//                   onChange={this.updatePassword}
//                   className="usertextSmall"
//                   type="password"
//                   id="password"
//                 />
//                 {showErrMsg && <p className="errorSmall">*{errMsg}</p>}
//               </div>

//               <button className="loginSmall" type="submit">
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   checkAndRender = () => {
//     const jwtToken = Cookies.get('jwt_token')
//     if (jwtToken !== undefined) {
//       return <Redirect to="/" />
//     }
//     return (
//       <div>
//         <div>{this.renderLogin()}</div>
//       </div>
//     )
//   }

//   render() {
//     return <>{this.checkAndRender()}</>
//   }
// }

// export default Login

// import {useState} from 'react'
// import {Redirect, useHistory} from 'react-router-dom'
// import Cookies from 'js-cookie'
// import './index.css'

// const Login = () => {
//   const [userDetails, updateUserDetails] = useState({
//     username: '',
//     password: '',
//     showErrMsg: false,
//     errMsg: '',
//   })
//   const history = useHistory()

//   const onSuccess = jwtToken => {
//     Cookies.set('jwt_token', jwtToken, {expires: 30})
//     history.replace('/')
//   }

//   const updateuserName = event => {
//     updateUserDetails(prevState => ({
//       ...prevState,
//       username: event.target.value,
//     }))
//   }

//   const updatePassword = event => {
//     updateUserDetails(prevState => ({
//       ...prevState,
//       password: event.target.value,
//     }))
//   }

//   const gotoLogin = async event => {
//     event.preventDefault()
//     const {username, password} = userDetails
//     const personDetails = {username, password}

//     // console.log(username);
//     const url = 'https://apis.ccbp.in/login'
//     const options = {
//       method: 'POST',
//       body: JSON.stringify(personDetails),
//     }
//     const response = await fetch(url, options)
//     const data = await response.json()
//     // console.log(data);
//     if (response.ok === true) {
//       const jwtToken = data.jwt_token
//       console.log(jwtToken)
//       onSuccess(jwtToken)
//       updateUserDetails(prevState => ({
//         ...prevState,
//         username: '',
//         password: '',
//       }))
//     } else {
//       updateUserDetails(prevState => ({
//         ...prevState,
//         showErrMsg: true,
//         errMsg: data.error_msg,
//       }))
//     }
//   }

//   const renderLogin = () => {
//     const {showErrMsg, errMsg, username, password} = userDetails
//     return (
//       <div>
//         <div className="loginbgBig">
//           <div className="imgdiv">
//             <img
//               className="logoimg"
//               src="https://res.cloudinary.com/djyawllgy/image/upload/v1688879050/BookhubWeb/Rectangle_1467weblog_iwznxm.jpg"
//               alt="login website logo"
//             />
//           </div>
//           <div className="formdiv">
//             <form onSubmit={gotoLogin} className="formel">
//               <img
//                 className="logo"
//                 src="https://res.cloudinary.com/djyawllgy/image/upload/v1688878951/BookhubWeb/Group_7731weblogo_oj7i8f.jpg"
//                 alt="website login"
//               />
//               <div className="userinput">
//                 <label className="labelname" htmlFor="name">
//                   Username*
//                 </label>
//                 <input
//                   value={username}
//                   onChange={updateuserName}
//                   className="usertext"
//                   type="text"
//                   id="name"
//                 />
//               </div>
//               <div className="userinput">
//                 <label className="labelname" htmlFor="password">
//                   Password*
//                 </label>
//                 <input
//                   value={password}
//                   onChange={updatePassword}
//                   className="usertext"
//                   type="password"
//                   id="password"
//                 />
//                 {showErrMsg && <p className="error">*{errMsg}</p>}
//               </div>
//               <button type="submit" className="login">
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//         <div className="loginbgSmall">
//           <img
//             className="smalllogo"
//             src="https://res.cloudinary.com/djyawllgy/image/upload/v1688987836/BookhubWeb/Ellipse_99_jkknzh.jpg"
//             alt="login website logo"
//           />

//           <div className="formdivSmall">
//             <form onSubmit={gotoLogin} className="formelSmall">
//               <img
//                 className="logoSmall"
//                 src="https://res.cloudinary.com/djyawllgy/image/upload/v1688878951/BookhubWeb/Group_7731weblogo_oj7i8f.jpg"
//                 alt="website login"
//               />
//               <div className="userinputSmall">
//                 <label className="labelname" htmlFor="name">
//                   Username*
//                 </label>
//                 <input
//                   value={username}
//                   onChange={updateuserName}
//                   className="usertextSmall"
//                   type="text"
//                   id="name"
//                 />
//               </div>
//               <div className="userinputSmall">
//                 <label className="labelname" htmlFor="password">
//                   Password*
//                 </label>
//                 <input
//                   value={password}
//                   onChange={updatePassword}
//                   className="usertextSmall"
//                   type="password"
//                   id="password"
//                 />
//                 {showErrMsg && <p className="errorSmall">*{errMsg}</p>}
//               </div>

//               <button className="loginSmall" type="submit">
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const checkAndRender = () => {
//     const jwtToken = Cookies.get('jwt_token')
//     if (jwtToken !== undefined) {
//       return <Redirect to="/" />
//     }
//     return (
//       <div>
//         <div>{renderLogin()}</div>
//       </div>
//     )
//   }

//   return <>{checkAndRender()}</>
// }
// export default Login
