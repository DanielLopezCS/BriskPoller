import React, { Component, Fragment } from 'react'
import { Button, Checkbox, Form, Container, Segment, Header } from 'semantic-ui-react'
import {postPoll} from '../../actions/pollActions';
import { connect } from 'react-redux';


import './style.css'

class CreatePoll extends Component {
    state = {
      title:'',
      options: [''],
      size: 0,
      public: false
    }

    componentWillReceiveProps(nextProps){
      //go to poll when poll created
      if(nextProps.poll){
        this.props.history.push(`/poll/${nextProps.poll._id}`);
      }
   
    }
    handleToggle = () =>{
      if(this.state.public)this.setState({public:false});
      else this.setState({public:true});
    }
    handleText = i => e => {
      let options = [...this.state.options]
      options[i] = e.target.value
      this.setState({
        options
      })
    }

    handleTitle = (event) =>{
      this.setState({title: event.target.value});
    }
  
    handleDelete = i => e => {
      e.preventDefault()
      let options = [
        ...this.state.options.slice(0, i),
        ...this.state.options.slice(i + 1)
      ]
      this.setState({
        options
      })
    }
  
    addOption = e => {
      e.preventDefault()
      if(Number(e.target.id) === Number(this.state.size)){
      let options = this.state.options.concat([''])
      this.setState({
        options,
        size: this.state.size +1
      })
        }
    }
  
    onSubmit = (e) =>{
        e.preventDefault();
        if(this.state.title === '') {
          alert("Please enter a title.")
          return;
        }
      
        const optionsJSON= [];
        const title = this.state.title;
        const isPublic = this.state.public;

        for(const index in this.state.options){
          if(this.state.options[index]!=="")
          optionsJSON.push({"text":this.state.options[index]});
        }
        //if all options are blank then give error
        if (optionsJSON.length === 0){
          alert("Please enter at least one question.");
          return;
        }
        const pollJSON = {title:title, options: optionsJSON, public: isPublic};

        this.props.postPoll(pollJSON);
    }

    render() {
      return (
        <Fragment>
        
          <div>

                <Header size='huge' color='orange'>Creating Poll</Header>
    <Container>
        <Segment  >
            <Form>
                <Form.Field>
             
                <input placeholder='Your Question' name = 'title' onChange={this.handleTitle} value={this.state.title} type="text"/>
                
                </Form.Field>
                <Form.Field >
                
                {this.state.options.map((question, index) => (
            <div key={index}>
                
              <input
                type="text"
                placeholder={'Poll Option #' + (index+1)}
                onChange={this.handleText(index)}
                value={question}
                onClick ={this.addOption}
                onFocus ={this.addOption}
                id={index}
                style={{marginTop:'20px'}}
              />
           
              <br/>
            </div>
            
         
          ))}

                
               
                </Form.Field>
                <Form.Field>
                <Checkbox  label='Public' name='public' onChange={()=>this.handleToggle()} />
                </Form.Field>
                <Button type='submit' color='orange' size='huge' onClick={this.onSubmit}>Create</Button>
            </Form>
        </Segment>
    </Container>
            </div>

        </Fragment>
      )
    }
  }
  
const mapStateToProps = state => ({

  poll: state.polls.poll,

});

export default connect(mapStateToProps, {postPoll})(CreatePoll);

