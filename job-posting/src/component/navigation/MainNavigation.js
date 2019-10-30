// eslint-disable-next-line
import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class MainNavigation extends Component {
    render() {
        return (
  <nav class="navbar navbar-expand-lg navbar-light bg-dark">
  <a class="navbar-brand col-md-9" ><Link to='/'><h4>Job Posting</h4></Link></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse float-right" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
     
      <li class="nav-item ">
        <a class="nav-link" ><Link to='/job'>Job List</Link> <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active col-md-3">
        <button type="button" class="btn btn-outline-primary"><Link to='/login'>Login</Link> <span class="sr-only">(current)</span></button>
      </li>
      <li  class="nav-item active col-md-2">  
      <Link to='/register'>  <button class="btn btn-primary">Register</button></Link>
        {/* <button class="btn btn-primary" ></button> */}
      </li>
    </ul>
    </div>
</nav>
        );
    }
}

export default MainNavigation;