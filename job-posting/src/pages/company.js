import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

class company extends Component {

    constructor(props){
        super(props)
        this.state={
            data:{},
            name:'',
            logo:'',
            location:'',
            description:'',
            isError:false,
            isLoading:true,
           
        }
    }
    componentDidMount(){
        this.getData().then(data=>{
          this.setState({
            data,
            isError: false,
            isLoading:false})
        })
      }
      getData = async(page)=>{
        const allcompany = await axios.get(page!==undefined?page:'http://localhost:5000/company/?')
        .catch(err=>{
          this.setState({ isLoading: false, isError: true })
        })
        console.log(allcompany.data)
        return allcompany.data;
      }

      handlerChange = (e)=>{
        this.setState({[e.target.name] : e.target.value}) 
     }

     handlerSubmit = (event)=>{
         const data = new FormData()
         data.append('name',this.state.name)
        data.append('logo', this.state.logo)
        data.append('location', this.state.location)
        data.append('description', this.state.description)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
    
      axios.post('http://localhost:5000/company', data, config)
     .then((res)=>{
       if(res.data.status==200){
           alert('Success added')
           this.props.history.push('/company')
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


    render() {
        return (
            
           <div classNameName="container-fluid">
            {this.state.isError&&(
          <p>Error, please try again</p>
        )}
        {!this.state.isLoading&&
   
               <div classNameName='card'>
                   <div className='card-body card-bordered col '>
               <div classNameName='row offset-3'>
                   <h4>Tambah Data Perusahaan</h4>
               </div>
         <div classNameName="row">
              <br/>
            <br/>
          <div classNameName="col col-6 offset-3">
     <div className="form-group">
<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
 Tambah Data
</button>
</div>


<table className="table table-bordered">
  <thead>
    <tr>
      <th scope="col">No </th>
      <th scope="col">Name</th>
      <th scope="col">Logo</th>
      <th scope="col">Location</th>
      <th scope="col">Desctription</th>
      <th  colSpan='2' align='text-justify' scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {this.state.data.result.map((v,i)=>(
       
    <tr sm={{size:'auto'}} key={i.toString()}>
      <th scope="row">{parseInt(i++)}</th>
      <td>{v.name}</td>
      <td> <img  src={v.logo} Height='100px' Width='100px' alt={v.logo} style={{display:'block'}}/></td>
      <td>{v.location}</td>
      <td>{v.description}</td>
      <td><button href="#" className="btn btn-danger">Hapus</button>||
      <button  data-toggle="modal" data-target="#editModal"  className="btn btn-info">Edit</button></td>
    </tr>
  ))}
  </tbody>
</table>
</div>
        </div> 
  {/* awal modal tambah       */}
<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Tambah Data Perusahaan</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form >
  <div class="form-group">
    <label for="exampleFormControlInput1">Nama Perusahaan</label>
    <input type="text" name='name'  onChange={this.handlerChange}
    value={this.state.name}  class="form-control" id="exampleFormControlInput1" required placeholder=""/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlFile1">Logo Perusahaan</label>
    <input type="file" name='logo'  onChange={this.handlerChange}  class="form-control-file" id="exampleFormControlFile1" required/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Lokasi Perusahaan</label>
    <input type="text" name='location'  onChange={this.handlerChange}
     value={this.state.location}  class="form-control" id="exampleFormControlInput1" placeholder="" required/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Deskripsi</label>
    <textarea class="form-control" name='description'
     onChange={this.handlerChange}
     value={this.state.description}  id="exampleFormControlTextarea1" rows="3" required></textarea>
  </div>
  
</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" onClick={this.handlerSubmit} className  =" btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
{/* akhir modal tambah */}

{/* awal modal edit */}
<div className="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Data Perusahaan</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form>
  <div class="form-group">
    <label for="exampleFormControlInput1">Nama Perusahaan</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" required/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlFile1">Logo Perusahaan</label>
    <input type="file" class="form-control-file" id="exampleFormControlFile1"/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Lokasi Perusahaan</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" required/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Deskripsi</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" required></textarea>
  </div>
  
</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Batal</button>
        <button type="button" className="btn btn-primary">Simpan</button>
      </div>
    </div>
  </div>
</div>
{/* akhir modal edit */}

</div>    

    </div>
        }
        </div>


        );
    }
}

export default company;