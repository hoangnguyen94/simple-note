import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './components/Auth';
import RegisterPage from './components/Register';
import NotePage from './components/Notes-hook';
import AuthContext from './contexts/auth-context';

import 'antd/dist/antd.css';
import 'react-quill/dist/quill.snow.css';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    const auth = JSON.parse(localStorage.getItem('auth')) || {token: null, userId: null}
    this.state = {
      token: auth.token,
      userId: auth.userId,
    }
  }

  login = (token, userId) => {
    localStorage.setItem('auth', JSON.stringify({token, userId}))
    this.setState({
      token,
      userId
    })
  }

  logout = () => {
    localStorage.removeItem('auth')
    this.setState({
      token: null,
      userId: null
    })
  }

  render() {
    console.log(this.state)
    return (
      <BrowserRouter>
        <>
          <AuthContext.Provider 
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}>
            <Switch>
              <Redirect from='/' to='/notes' exact/>
              <Route path="/register" render={props => (this.state.token === null ? <RegisterPage {...props}/> : <Redirect to='/notes'/>)} />
              <Route path="/auth" render={props => (this.state.token === null ? <AuthPage {...props}/> : <Redirect to='/notes'/>)} />
              <Route path="/notes" render={(props) => (this.state.token !== null ? <NotePage {...props} token={this.state.token} /> : <Redirect to='/auth'/>)} />
            </Switch>
          </AuthContext.Provider>
        </>
      </BrowserRouter>
    );
  }
}

export default App;