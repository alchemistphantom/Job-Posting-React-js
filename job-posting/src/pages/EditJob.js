import React, { Component } from 'react';
import axios from 'axios'

class EditJob extends Component {
    constructor(props){
        super(props)
        this.state = {
        id: this.props.match.params.id,
        data: {
            name: '',
            description:'',
            id_category:'',
            salary:'',
            location:'',
            id_company:'',
        },
        }
      }

    componentDidMount = async ()=>{
        console.log("didmount");
        axios.get('http://localhost:5000/job/'+this.props.match.params.id).then(res=>{
          this.setState({
            name: '',
            description:'',
            id_category:'',
            salary:'',
            location:'',
            id_company:'',  
            data:res.data.result[0]})
          console.log(" ininini"+res.data.result[0].name);
        })

      }

      handlerChange = (e)=>{
        this.setState({[e.target.name] : e.target.value}) 
     }

     handlerSubmit = (event)=>{
        const { gender, phone, address, cityId, image, signature } = this.state;
        const fd = new FormData();
        fd.append('image', image, image.name);

         console.log(this.state.name)
      event.preventDefault();
      axios.patch('http://localhost:5000/job/'+this.state.id, this.state)
     .then((res)=>{
       if(res.status==201){
           alert('berhasil menambahkaan')
           this.props.history.push('/');
       }
     })
     .catch(err=>{
       console.log(err)
      
       this.setState({ isLoading: false, isError: true })
     })
    }

    render() {
        return (
           <div class="container">
    <div class="row">
      
        <div class="col mx-auto"> 
            <h5 class="card-title text-center">Edit Job</h5>
            <form class="form" onSubmit={this.handlerSubmit}>

              <div class="form-group">
                <input type="text" name="name" id="name" onChange={this.handlerChange}
                  value={this.state.data.name}   class="form-control"
                   placeholder="nams" required autofocus/>
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
              <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Update</button>
              </form>
         
        </div>
      
    </div>
  </div>
        );
    }
}

export default EditJob;