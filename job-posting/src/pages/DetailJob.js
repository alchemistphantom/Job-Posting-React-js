import React, { Component } from 'react';
import axios from 'axios'
class DetailJob extends Component {
    constructor(props){
        super(props)
        this.state = {
        id: this.props.match.params.id,
        data: {},
        }
      }
      componentDidMount(){
        console.log("didmount");
        axios.get('http://localhost:5000/job/'+this.props.match.params.id).then(res=>{
          this.setState({data:res.data.result[0]})
          console.log(this.state.data);
        })
      }

    render() {
        return (
            <div>
                 {!this.state.data.id&&(
          <React.Fragment>
            Loading...
          </React.Fragment>
        )}
        {this.state.data.id&&(
            <div class="jumbotron">
                <div class="container">
                    <div class='row'>
                            <div class="col">

                            <div><h1>{this.state.data.name}</h1></div>
                            <div class="row">
                                <div class="col col-5">
                                <i class="ti-map-alt">{this.state.data.company} </i>
                                </div>
                            </div>
                            <div> {this.state.data.location}</div>
                            <div> Date Post : {this.state.data.date_added}</div>
                            <div>Salary     : Rp.{this.state.data.salary}</div>
                            <div class="col col-9">Description: {this.state.data.description}</div>

                                </div>
                                <div class="col col-3">
                                <img src={this.state.data.logo} alt={this.state.data.name} />
                                </div>
                        </div>

                
           
                </div>
            </div>
        )
        }
            </div>
        );
    }
}

export default DetailJob;