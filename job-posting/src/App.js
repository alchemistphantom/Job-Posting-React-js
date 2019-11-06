import React, { Component } from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import DetailJob from './pages/DetailJob'
import Register from './pages/Register'
import ListJob from './pages/ListJob'
import MainNavigation from './component/navigation/MainNavigation'
import Footer from './component/navigation/footer'
import ManageJob from './pages/ManageJob'
import EditJob from './pages/EditJob'
import addJob from './pages/addJob'
import company from './pages/company'
import utama from './pages/utama'


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <MainNavigation/>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/login' component={Login} exact />
          <Route path='/register' component={Register} />
          <Route path='/job/' component={ListJob} />
          <Route path='/detailjob/:id' component={DetailJob}/>
          <Route path='/managejob' component={ManageJob}/>
          <Route path='/editjob/:id' component={EditJob}/>
          <Route path='/addjob/' component={addJob}/>
          <Route path='/company/' component={company}/>
          <Route path='/utama/' component={utama}/>
        </Switch>
        <Footer/>
      </BrowserRouter>
     
    )
  }
}
