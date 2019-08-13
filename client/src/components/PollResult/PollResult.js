import React, { Component } from 'react'
import { Button, Checkbox, Form, Container, Segment, Header, Label } from 'semantic-ui-react'

import {HorizontalBar} from 'react-chartjs-2';

const data = {
    labels: ['Shamanasada asd dsadsa dsad', 'Fdsadsa dasd asd asd asdd', 'March sadasd as d sadd', 'April asd as dsad sada', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'What Should I Roll?',
        backgroundColor: 'orange',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'yellow',
        hoverBorderColor: 'yellow',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };
  
 
export default class PollResult extends Component {
    render() {
        return (
            <div > 
              
            
    <Header textAlign='center'>Your Question</Header>
    <HorizontalBar data={data}  height={100}/>
    <Segment.Group horizontal >
      <Segment>Voters: 500</Segment>
      <Segment>Published: 12341</Segment>
      <Segment>Bottom</Segment>
    </Segment.Group>
    <Segment>Sharable Link: www.memes.com/123133</Segment>
           
            </div>
        )
    }
}
