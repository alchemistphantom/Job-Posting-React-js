import React, { Component } from 'react';
import axios from 'axios'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
        email:'',
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
       axios.post('http://localhost:5000/User/login/', this.state)
      .then((res)=>{

        if(res.data.status==200){
          this.props.history.push('/');
          localStorage.setItem('Authorization',res.data.token)
          // window.location.reload()
          alert('Succes to Login')
        }else{
          alert('Email or Password is incorrect')
        }
         
      })
      .catch(err=>{
       
        console.log(err)
       
        this.setState({ isLoading: false, isError: true })
      })

       console.log(this.state);
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
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Sign In</h5>
            <form class="form-signin" onSubmit={this.handlerSubmit}>
              
              <div class="form-label-group">
                <input type="email" name="email" id="inputEmail" onChange={this.handlerChange}
                 value={this.state.email} class="form-control" placeholder="Email address" required autofocus/>
              </div>
              
              <div class="form-label-group">
                <input type="password" name="password" onChange={this.handlerChange} 
                value={this.state.password} class="form-control"  placeholder="Password" required/>
              </div>

              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1"/>
              </div>
              <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
              </form>
          </div>
        </div>
      </div>
    </div>
  </div>
        );
    }
}
export default Login;