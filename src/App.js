// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import BookShelf from './components/Bookshelves'
import ProtectedRoute from './components/ProtectedRoute'
import BookDetailedView from './components/BookDetailedVIew'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/shelf" component={BookShelf} />
      <ProtectedRoute exact path="/books/:id" component={BookDetailedView} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

export default App
