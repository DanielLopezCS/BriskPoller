import React, { Component } from 'react'
import {Segment, Header, Container, Message, Icon, Label } from 'semantic-ui-react'
import { connect } from 'react-redux';
import {getPoll} from '../../actions/pollActions';

import {HorizontalBar} from 'react-chartjs-2'

import Spinner from '../Spinner'


 
class PollDetail extends Component {
  state = {
    loading:true,
    data:[]
  }

    componentWillMount(){
      this.props.getPoll(this.props.id);
    }
    componentWillReceiveProps(nextProps){
      
      const chartLabels = [];
      const chartData = [];
      for(const index in nextProps.poll.options){
      
        chartLabels.push(nextProps.poll.options[index].text);
        chartData.push(nextProps.poll.options[index].voterCount);
      }
     
      const data={
        labels: chartLabels,
        datasets: [
          {
            label: 'Votes',
            backgroundColor: 'orange',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'yellow',
            hoverBorderColor: 'yellow',
            data: chartData
          }
        ],
        
        options:{
          responsive: true,
          maintainAspectRatio: true,
          
        },
    
      
      };
      this.setState({data:data, loading: false})
      
    }

    render() {
        return (
            <div >    
              {this.state.loading? <Spinner/> :
            <Container>     
              {this.props.voted && <Message color='teal'>Your Vote Has Been Recorded!</Message>}
    <Header textAlign='center'>{this.props.poll && this.props.poll.title}</Header>
    <HorizontalBar data={this.state.data}  height={80} />
  
 
  <Label color='white'><Icon color='orange' name='eye'/>{this.props.poll && this.props.poll.views}</Label>
  <Label><Icon color='orange' name='calendar'/>{this.props.poll && this.props.poll.date.substring(0,10)}</Label>
  <Label><Icon color='orange' name='linkify'/>http://localhost:3000/poll/{this.props.poll && this.props.poll._id}</Label>
           </Container>
          
              }
                </div>)
    }
}

const mapStateToProps = state => ({
  poll: state.polls.poll
});


export default connect(mapStateToProps, {getPoll})(PollDetail);
