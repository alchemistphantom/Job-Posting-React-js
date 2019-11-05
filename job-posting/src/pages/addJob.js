import React, { Component } from 'react';
import axios from 'axios'

class addJob extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: '',
            description:'',
            id_category:'',
            salary:'',
            location:'',
            id_company:'',
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

      handlerChange = (e)=>{
         this.setState({[e.target.name] : e.target.value}) 
      }

      handlerSubmit = (event)=>{
          console.log(this.state)
       event.preventDefault();
       axios.post('http://localhost:5000/job', this.state)
      .then((res)=>{
        if(res.data.status==200){
            alert('Success added')
            this.props.history.push('/managejob')
        }else if(res.data.status==202){
            alert('already exist')
        }else{
            alert('Failed to add')
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
                    <h5 class="card-title text-center">Add Job</h5>
                    <form class="form" onSubmit={this.handlerSubmit}>
        
                      <div class="form-group">
                        <input type="text" name="name" id="name" onChange={this.handlerChange}
                          value={this.state.name}   class="form-control"
                           placeholder="nama" required autofocus/>
                      </div>
        
                      <div class="form-group">
                        <input type="text" name="description" id="description"
                         onChange={this.handlerChange} value={this.state.description}  
                          class="form-control" placeholder="description" required autofocus/>
                        </div>
        
                        <div class="form-group">
                        <input type="text" name="id_category" class="form-control"
                         onChange={this.handlerChange} value={this.state.category} 
                           placeholder="id_category" required/>
                      </div>
        
                      <div class="form-group">
                        <input type="text" name="location" id="location" onChange={this.handlerChange} 
                         value={this.state.location}  
                          class="form-control" placeholder=" location" required autofocus/>
                      </div>
        
                      <div class="form-group">
                        <input type="text" name="salary" id="salary" onChange={this.handlerChange} 
                        value={this.state.salary}   class="form-control" placeholder="salary" 
                        required autofocus/>
                        </div>
                        <div class="form-group">
                        <input type="text" name="id_company" class="form-control" 
                         onChange={this.handlerChange}  value={this.state.company}
                         placeholder="id_company" required/>
                      </div>
                      <div class="custom-control custom-checkbox mb-3">
                        <input type="checkbox" class="custom-control-input" id="customCheck1"/>
                      </div>
                      <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">ADD</button>
                      </form>
                </div>
            </div>
          </div>
        );
    }
}
export default addJob;