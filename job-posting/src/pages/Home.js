import React, { Component } from 'react';
import img from "../asset/bg.jpg";
class Home extends Component {
    render() {
        return (
            <div>
                <div class="jumbotron" style={{background: 'url("'+img+'") no-repeat' ,minHeight:'380px'}}>
                <div class="row">
            <div class="col-9 mb-3 offset-2 md-col-10">
            <div class="card mb-3">
            <div class="col">
              <div class="card-body">
              <div class="input-group">
  <input type="text" placeholder="Search..."aria-label="First name"  class="form-control form-control-lg"></input>
  <select class="form-control form-control-lg">
               <option value="name">Job Name</option>
               <option value="company">Company</option>
              </select>
  <button type="button" class="btn btn-primary" 
  // onKeyDown={(e)=>this.doSearch(e,this.state.query,this.state.by)} 
  >CARI</button>
</div>
        </div>
                </div>
            </div>
            </div>
            </div>
           
           </div>
            </div>
        );
    }
}
export default Home;