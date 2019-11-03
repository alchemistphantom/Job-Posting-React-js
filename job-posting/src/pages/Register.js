import React, { Component } from 'react';
import axios from 'axios'

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
        email:'',
        password: '',
        password:'',
        }
      }
      componentDidMount(){
        console.log("didmount");         
        //  this.postData()
        //  .then((data)=>{
        //     this.setState({
        //        email: '',
        //        password: '',
        //         isLoading:false})
        //  })
      }

      postData =(event)=>{
       event.preventDefault();
        const data ={
          email: this.state.name,
          username: this.state.username,
          password: this.state.password
        }
         axios.post('http://localhost:5000/User/', {data})
        .then((res)=>{
            console.log(res)
            alert(res);
        })
        .catch(err=>{
          console.log(err)
         
          this.setState({ isLoading: false, isError: true })
        })
      }

      handlerChange = (e)=>{
         this.setState({[e.target.name] : e.target.value}) 
      }

      handlerSubmit = (event)=>{
       event.preventDefault();
       axios.post('http://localhost:5000/User/', this.state)
      .then((res)=>{
        if(res.data.status==201){
            alert('berhasil menambahkaan')
        }
      })
      .catch(err=>{
        console.log(err)
       
        this.setState({ isLoading: false, isError: true })
      })
     }

      // loginProcess = async(page)=>{
      //   this.setState({isLoading:true})
      //   this.postData(page).then(data=>{
      //     this.setState({data,

      //       isLoading:false})
      //   })
      // }

    render() {
        return (
   
  <div class="container">
    <div class="row">
      
        <div class="col mx-auto">
            <h5 class="card-title text-center">Register</h5>
            <form class="form" onSubmit={this.handlerSubmit}>
              <div class="form-label-group">
                <input type="email" name="email" id="inputEmail" onChange={this.handlerChange} value={this.state.email}  class="form-control" placeholder="Email address" required autofocus/>
              </div>
              <div class="form-label-group">
                <input type="username" name="username" id="inputUsername" onChange={this.handlerChange} value={this.state.username}  class="form-control" placeholder="username address" required autofocus/>
                <input type="password" name="password" onChange={this.handlerChange} value={this.state.password} class="form-control"  placeholder="Password" required/>
              
              </div>
              <div class="form-label-group">
              </div>

              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1"/>
              </div>
              <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
              </form>
         
        </div>
      
    </div>
  </div>
        );
    }
}
export default Register;