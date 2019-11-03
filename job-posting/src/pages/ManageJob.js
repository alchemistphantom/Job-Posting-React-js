import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Row, Col, Container, Button, Jumbotron, Spinner} from 'reactstrap'
import qs from 'qs'

class ListJob extends Component {

    constructor(props){
        super(props)
        this.state={
            data:{},
            prev:false,
            next: false,
            isError:false,
            isLoading:true,
            query:'',
            by: '',
            sortBy:'',
            mode:'',
        }
    }
    componentDidMount(){
        this.getData().then(data=>{
          this.setState({
            data,
            prev: data.info.prev,
            next: data.info.next,
            hasPrev: data.info.hasPrev,
            hasNext: data.info.hasNext,
            page_count: data.info.page_count,
            isLoading:false})
        })
       
      }
      getData = async(page)=>{
        const allJob = await axios.get(page!==undefined?page:'http://localhost:5000/job/?')
        .catch(err=>{
          this.setState({ isLoading: false, isError: true })
        })
        console.log(allJob.data)
        return allJob.data;
      }

      delData = async(id)=>{
        if(window.confirm('are you sure delete this company?')){
       await axios.delete('http://localhost:5000/job/'+id)
        .catch(err=>{
          this.setState({ isLoading: false, isError: true })
        })
      }
        
        
       
      }


      queryChange = (e)=>{
        const query = e.target.value
        this.setState({query})
      }
      byChange = (e)=>{
        const by = e.target.value
        this.setState({by})
      }

      sortChange = (e)=>{
        const sortBy = e.target.value
        console.log(sortBy);
        
        this.setState({sortBy})
      }

      modeChange = (e)=>{
        const mode = e.target.value
        console.log(mode);
        this.setState({mode})
      }
      // doSearch = (query,by)=>{
      //   console.log('doSearch')
      //     this.props.history.push('/job/?wordsKey='+by+'&words='+query)
      // }

      buttonPress = async(page)=>{
        this.setState({isLoading:true})
        this.getData(page).then(data=>{
          this.setState({data,
            prev: data.info.prev,
            next: data.info.next,
            hasPrev: data.info.hasPrev,
            hasNext: data.info.hasNext,
            page_count: data.info.page_count,
            isLoading:false})
        })
      }
        searching = async(wordsKey,words)=>{
          console.log('searching.....'+wordsKey+','+words)
         let page='http://localhost:5000/job/?wordsKey='+wordsKey+'&words='+words;
          this.setState({isLoading:true})
          this.getData(page).then(data=>{
            this.setState({data,
              prev: data.info.prev,
              next: data.info.next,
              hasPrev: data.info.hasPrev,
              hasNext: data.info.hasNext,
              page_count: data.info.page_count,
              isLoading:false})
          })
        }

        sorting = async(sortBy,mode)=>{
          console.log('searching.....  '+sortBy+','+mode)
         let page='http://localhost:5000/job/?sortBy='+sortBy+'&mode='+mode;
          this.setState({isLoading:true})
          this.getData(page).then(data=>{
            this.setState({data,
              prev: data.info.prev,
              next: data.info.next,
              hasPrev: data.info.hasPrev,
              hasNext: data.info.hasNext,
              page_count: data.info.page_count,
              isLoading:false})
          })
        }

        goToEdit = (id)=>{
          console.log('goto detail..');
          this.props.history.push('/editjob/'+id)
        }


        delete = (id)=>{
          console.log('goto detail..');
          this.props.history.push('/detailjob/'+id)
        }
      

    render() {
     // const data2 = qs.parse(this.props.location.search.slice(1))
      const { data, prev, next,hasNext,hasPrev,page_count,query,by, isLoading, isError } = this.state;
        return (  
          <Jumbotron fluid>
            <Container fluid>
  
        {isLoading&&(
          
          <Container fluid>
            <div mx-auto>
            <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
            </div>
          </Container>
        )}
      {isError&&(
          <p>Error, please try again</p>
        )}
        {!isLoading&&
          <React.Fragment>
            <div class="row">
            <div class="col-9 mb-3">
            <div class="card mb-3">
            <div class="col">
              <div class="card-body">
              <div class="input-group">
  <input type="text" placeholder="Search..." onChange={this.queryChange} value={query} aria-label="First name"  class="form-control form-control-lg"></input>
  <select onClick={this.byChange} class="form-control form-control-lg">
               <option value="name">Job Name</option>
               <option value="company">Company</option>
              </select>
  <button type="button" class="btn btn-primary" 
  // onKeyDown={(e)=>this.doSearch(e,this.state.query,this.state.by)} 
  onClick={()=>this.searching(this.state.by,this.state.query)} >CARI</button>
</div>
                </div>
                </div>
            </div>
            </div>
            </div>
            
            <div class="row">
              <div class="col">
            {this.state.data.result.map((v,i)=>(
              
              <Col sm={{size:'auto'}} key={i.toString()}>
                
                 <div class="card mb-3">
          <div class="row no-gutters">
            <div class="col-md-3">
            <img onClick={()=>this.goToDetail(v.id)} src={v.logo} alt={v.name} style={{display:'block'}}/>
            </div>
          
            <div class="col-md-9">
              <div class="card-body">
                <div class="row">
                  <div class="col" >
              <Link onClick={()=>this.delData(v.id)}></Link><h4 class="card-title">{v.name}</h4>
              </div>
              <div class="col-3 mb4" >
              
                 <button onClick={()=>this.delData(v.id)} class="btn btn-outline-danger"> 
                 <p class="card-text"><small class="text-muted">Hapus</small>
                </p></button>-||-

                 <Link onClick={()=>this.goToEdit(v.id)}>
                 <a class="btn btn-outline-primary" href="#"> 
                 <p class="card-text"><small class="text-muted">Edit</small>
                </p></a></Link>  

                
                </div>
                
                
                </div>
                <p class="card-text"><small class="text-absolute">{v.company}</small></p>
                <p class="card-text"><small class="text-muted">{v.location}</small></p>
                <p class="card-text">{v.description}</p>
                
                <p class="card-text"><small class="text-muted">{v.date_added.toLocaleString().replace(/T/, ' ').replace(/\..+/, '')}</small></p>
               
              </div>
            </div>
          </div>
        </div>
              </Col>
            ))}
            {<Row>
          <Col>
          </Col>
          <Col classID="pagination justify-content-center">
           {
            hasPrev && <Button class="col-md-2" color='primary' onClick={()=>this.buttonPress(prev)}>Prev</Button>
           }
            {
            hasNext && <Button color='primary' onClick={()=>this.buttonPress(next)}>Next</Button>
            }
          </Col>
          <Col>
          
          </Col>
        </Row> }
            </div>
            <div class="col-3">
              <div class="card w-100">
            <div class="col-md-20">
              <div class="card-body float-center">
                <h5 class="card-title">Sorting Job</h5>
                <form class="form-inline">
                <div class="form-group mb-2">
               <select  onClick={this.sortChange} class="form-control form-control-sm">
               <option value="name">Job Name</option>
               <option value="category">Category</option>
               <option value="date_added">Date Added</option>
              </select>
              <select onClick={this.modeChange} class="form-control form-control-sm">
               <option value="asc">Ascending</option>
               <option value="desc">Descendng</option>
              </select>
  </div>
  <div class="form-group mx-sm-3 mb-2">
  </div>
  <button onClick={()=>this.sorting(this.state.sortBy,this.state.mode)} type="submit" class="btn btn-primary mb-2">Sort</button>
</form>
              </div>
              </div>
              </div>
              </div>
            </div>

          </React.Fragment>
        }
        </Container>
          </Jumbotron>
        );
    }
}

export default ListJob;