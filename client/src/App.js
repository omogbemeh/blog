import React, { useEffect } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import Register from './components/auth/Register';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import Post from './components/post/Post';
import Profile from './components/profile/Profile';
import { loadUser } from './actions/auth';
import MakePost from './components/makePost/MakePost';


if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'))
}


const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
      <Navbar />
      <div>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/' component={Home} />
          <Route exact path='/profile/me' component={Profile} />
          <Route exact path='/profile/me' component={Profile} />
          <Route exact path='/make-post' component={MakePost} />
          <Route exact path='/posts/:postId' component={Post} />
      </Switch> 
      </div>
      </Router>
    </Provider>
    
  );
}

export default App;
