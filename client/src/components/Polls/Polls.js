import React, { Component } from 'react'
import { Grid, Segment, Header, Container, Pagination } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {getPolls, getShowcase} from '../../actions/pollActions';
import { connect } from 'react-redux';

import Spinner from '../Spinner';

class Polls extends Component {
    state = {
        loading:true
    }
    componentWillMount(){
        this.props.getShowcase();
    }
    componentWillReceiveProps(nextProps){
       
        if(nextProps.polls){
            this.setState({loading:false});
        }
    }
    render() {
  

        return (
           <div> 
               {this.state.loading? <Spinner/> :<div>
               <Header as='h3'>Showcased Polls</Header>
                {this.props.polls.polls && this.props.polls.polls.splice(0,15).map(poll=>
                <React.Fragment >
                       <a href='#' >
                    <Link to = {'/poll/'+poll._id}>
                    <Segment raised  color='orange' inverted  size='huge'  style={{marginTop:'15px'}} id = {poll._id}>
               
                        {poll.title}
                    </Segment>
                    </Link>
                     </a>
                    </React.Fragment>
                 
                


                 )}
                 </div>
                }
            
          
        </div>
        )
    }
}

const mapStateToProps = state => ({

    polls: state.polls,

  });
  
  export default connect(mapStateToProps, {getPolls, getShowcase})(Polls);

  