import React, { Component } from 'react'
import { Button, Checkbox, Form, Container, Segment, Header, Label, Table } from 'semantic-ui-react'
import { connect } from 'react-redux';
import {getPoll, putVote, getCheck} from '../../actions/pollActions';

import { withRouter } from 'react-router-dom';


import {HorizontalBar} from 'react-chartjs-2';

 

class PollVote extends Component {

  componentWillMount(){
    this.props.getPoll(this.props.id)
  }

  vote = async (optionID) =>{
    const optionJSON= {
      option:optionID
    }
   
    this.props.putVote(this.props.id, optionJSON);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.poll)
      this.props.getCheck(this.props.id);

  }

    render() {
        return (
            <div >             
              {this.props.poll &&  <div >  <Header> Should I meme? </Header>
     <Table celled selectable size='large'>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell textAlign='center'>{this.props.poll.title}</Table.HeaderCell>
        
      </Table.Row>
    </Table.Header>
    <Table.Body >

                {this.props.poll.options&& this.props.poll.options.map(option=>
                  <Table.Row >
                  <Table.Cell id = {option._id} onClick={()=>{this.vote(option._id)}}>{option.text}</Table.Cell>
                </Table.Row>
                  )}
     
    </Table.Body>
  </Table>
   
    </div >  
}


    
            </div>
        )
    }
}

const mapStateToProps = state => ({

  poll: state.polls.poll,

});

export default connect(mapStateToProps, {getPoll, putVote, getCheck})(PollVote);

  