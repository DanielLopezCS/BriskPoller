import React, { Component, Fragment } from 'react'
import { Button, Checkbox, Form, Container, Segment, Header } from 'semantic-ui-react'

export default class ListOfOptions extends Component {
    state = {
      options: [''],
      size: 0
    }
 
    handleText = i => e => {
      let options = [...this.state.options]
      options[i] = e.target.value
      this.setState({
        options
      })
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
      if(e.target.id == this.state.size){
      let options = this.state.options.concat([''])
      this.setState({
        options,
        size: this.state.size +1
      })
        }
    }
  
    onSubmit = (e) =>{
        e.preventDefault();
        alert("SUBMITTED!: " + this.state.options);
    }
    render() {
      return (
        <Fragment>
        
          <div>

                <Header size='huge' >Poller!</Header>
    <Container>
        <Segment padded raised >
            <Form>
                <Form.Field>
               
                <input placeholder='Your Question' />
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
                id={index}
                style={{marginTop:'20px'}}
              />
              <br/>
            </div>
            
         
          ))}

                
               
                </Form.Field>
                <Form.Field>
                <Checkbox  label='Public' />
                </Form.Field>
                <Button type='submit' color='green' size='huge' onClick={this.onSubmit}>Create</Button>
            </Form>
        </Segment>
    </Container>
            </div>

        </Fragment>
      )
    }
  }