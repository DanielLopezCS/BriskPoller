import React, { Component } from 'react'
import { Icon, Menu, Table, Container, Header } from 'semantic-ui-react'
import {getPolls} from '../../actions/pollActions';
import { connect } from 'react-redux';

import Spinner from '../Spinner';

/* Used for Poll Archive with pagination*/
class PollsArchive extends Component {
    state = {
        column: null,
        data: [],
        direction: null,
        itemsPerPage: 15,
        currentPage: 0,
        totalItems: 0,
        activeItem: 0,
        loading:true
      }
      
      componentWillMount(){

        this.props.getPolls();

      }
      componentWillReceiveProps(nextProps){
        
        const tableData = [];

        if(nextProps.polls)
          {
            
            for(const index in nextProps.polls){
              const title = nextProps.polls[index].title;
              const views = nextProps.polls[index].views;
              const date = nextProps.polls[index].date.substring(0,10);
              const id = nextProps.polls[index]._id;
              tableData.push({title:title,views:views,date:date, id:id})
            }
            this.setState({data:tableData,totalItems: nextProps.polls.length,loading:false});

          }
          

      }
    handleQuestionClick = (id)=>{
      this.props.history.push(`/poll/${id}`);
    }
    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name});
        
    }
    handleNextClick = () => {

      if((this.state.activeItem!== Math.floor(this.state.totalItems/this.state.itemsPerPage)-1) && (this.state.itemsPerPage < this.state.totalItems))
        this.setState({ activeItem: this.state.activeItem+1});
  }
  handleBackClick = () => {
    if((this.state.activeItem!==0)&&(this.state.itemsPerPage < this.state.totalItems) )
      this.setState({ activeItem: this.state.activeItem-1});
}
    render() {
       const {data, activeItem} = this.state; 

        return (this.state.loading ? <Spinner/> :
            <Container>
              <Header color='orange'>Displaying Polls {this.state.activeItem*this.state.itemsPerPage+1}  to {(this.state.activeItem*this.state.itemsPerPage) + this.state.itemsPerPage}</Header>
 <Table celled selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Question</Table.HeaderCell>
        <Table.HeaderCell>Viewers</Table.HeaderCell>
        <Table.HeaderCell>Date</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    
    <Table.Body>
    {
        data.slice(Math.floor(this.state.activeItem*this.state.itemsPerPage),Math.floor((this.state.activeItem*this.state.itemsPerPage) + this.state.itemsPerPage)).map(question =>
          <React.Fragment>
          
          <Table.Row onClick={()=>this.handleQuestionClick(question.id)}>
          <Table.Cell>
            {question.title}   
         </Table.Cell>
         <Table.Cell>{question.views}</Table.Cell>
         <Table.Cell>{question.date.substring(0,10)}</Table.Cell>
       </Table.Row>
       
         </React.Fragment>
        )
      
      }
     
          
 
    </Table.Body >

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>
          <Menu floated='right' pagination >
            <Menu.Item as='a' icon onClick ={this.handleBackClick}> 
              <Icon name='chevron left' />
            </Menu.Item>
            {[...Array(Math.floor(this.state.totalItems/this.state.itemsPerPage))].map((x, index) =>
            <Menu.Item  name={index} active={activeItem === index} onClick={this.handleItemClick}>{index+1}</Menu.Item>
            )}

    
            <Menu.Item as='a' icon onClick ={this.handleNextClick}>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
            </Container>
        
        )
    }
}

const mapStateToProps = state => ({

  polls: state.polls.polls,

});

export default connect(mapStateToProps, {getPolls})(PollsArchive);

