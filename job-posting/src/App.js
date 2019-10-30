import React, { Component } from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ListJob from './pages/ListJob'
import MainNavigation from './component/navigation/MainNavigation'
import Footer from './component/navigation/footer'


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <MainNavigation/>
     
      
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/login' component={Login} exact />
          <Route path='/register' component={Register} />
          <Route path='/job' component={ListJob} />

        </Switch>
        <Footer/>
      </BrowserRouter>
     
    )
  }
}
