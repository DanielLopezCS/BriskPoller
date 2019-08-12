import React, { Component } from 'react'
import SideBar from '../SideBar/SideBar'

import PollDetail from '../PollDetail/PollDetail'
import PollVote from '../PollVote/PollVote'

import {getCheck} from '../../actions/pollActions';
import { connect } from 'react-redux';

import Spinner from '../Spinner';

class PollDetailPage extends Component {

    state = {
        loading:true

    }

    componentWillMount(){
      
        this.props.getCheck(this.props.match.params.id);
    }    
    componentWillReceiveProps(nextProps){
       
        if(nextProps.available){
            this.setState({loading:false});
        }
    }
    render() {
        return (
            <div>
                <SideBar>{
                    this.state.loading ? <Spinner/>:  (this.props.available && !this.props.available.voted) ?
                    <PollVote id = {this.props.match.params.id} history ={this.props.history}/>
                    :
                    <PollDetail id = {this.props.match.params.id} voted={this.props.available}  />

                }
                
             
                </SideBar>
            </div>
        )
    }
}



const mapStateToProps = state => ({

    available: state.polls.available,

  });
  
  export default connect(mapStateToProps, {getCheck})(PollDetailPage);

  