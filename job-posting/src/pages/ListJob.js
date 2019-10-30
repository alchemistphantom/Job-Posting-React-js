import React, { Component } from 'react';
import axios from 'axios'
import {Row, Col, Container, Button, Jumbotron} from 'reactstrap'
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
        const allJob = await axios.get(page!==undefined?page:'http://localhost:5000/job/?wordsKey=name&words=ars')
        .catch(err=>{
          this.setState({ isLoading: false, isError: true })
        })
        console.log(allJob.data)
        return allJob.data;
      }

      queryChange = (e)=>{
        const query = e.target.value
        this.setState({query})
      }
      byChange = (e)=>{
        const by = e.target.value
        this.setState({by})
      }
      doSearch = (query,by)=>{
        console.log('doSearch')
          this.props.history.push('/job/?wordsKey='+by+'&words='+query)
        
      }

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
        console.log('prev ' + this.state.prev)
        console.log('next ' + this.state.next)
      }

    render() {
      const data2 = qs.parse(this.props.location.search.slice(1))
      const { data, prev, next,hasNext,hasPrev,page_count,query,by, isLoading, isError } = this.state;
        return (
         
          <Jumbotron fluid>
            <Container fluid>
            <div>
          Search {data2.name}
          </div>
  
        {isLoading&&(
          <Col>Loading...</Col>  
        )}
      
      {isError&&(
          <p>Error, please try again</p>
        )}
        {!isLoading&&
          <React.Fragment>
            <div class="row">
            <div class="col-6 mx-auto">
            <div class="card mb-3">
            <div class="col">
              <div class="card-body">
              <div class="input-group">
  <input type="text" placeholder="Key Search" onChange={this.queryChange} value={query} aria-label="First name" height="30" class="form-control"></input>
  <input type="text" placeholder="Name or Company"  onKeyDown={(e)=>this.doSearch(e,this.state.query,by)}  onChange={this.byChange} value={this.state.by} aria-label="Last name" width='40' class="form-control"></input>
  <button type="button" class="btn btn-primary" 
  onKeyDown={(e)=>this.doSearch(e,query,this.state.by)} 
  onClick={()=>this.doSearch(query,this.state.by)} >CARI</button>
  <Button as="" type="button" value="Input" />
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
            <div class="row">
              <div class="col">
              {v.count_data}
              </div>
              </div>
            <div class="col-md-9">
              <div class="card-body">
                <h4 class="card-title">{v.name}</h4>
                <p class="card-text"><small class="text-absolute">{v.company}</small></p>
                <p class="card-text"><small class="text-muted">{v.location}</small></p>
                <p class="card-text">{v.description}</p>
                <div class="row">
                  <div class="col" >
                <p class="card-text"><small class="text-muted">{v.date_added}</small></p>
                </div>
                <div class="col-4">
               <a class="btn btn-outline-primary" href="#"> <p class="card-text"><small class="text-muted">Detail</small><img width="20px" src="https://img.icons8.com/plasticine/100/000000/arrow.png"></img></p></a>
                </div>
                </div>
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
              <div class="card-body">
                <h5 class="card-title">Company</h5>
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