
import React, { Component } from 'react'
import { Button, Checkbox, Form, Container, Segment, Header } from 'semantic-ui-react'


export default class Test extends Component {

    state = {
        options:[{text: 'option 1', id:1}],
        size: 1,

    };

  
    addOption= (e) =>{

        if(e.target.id == this.state.size){            
            const option = {
                text:'memes #1',
                id: this.state.size + 1
            };  
            this.setState({ options: [...this.state.options, option ], size: this.state.size+1 }) 
        }
    
    }

    onTextChange = (e,index) => {

        this.setState({
            //set the changed state...
            options: this.state.options,
            [this.state.options[index]]: e.target.value
          })
    }


    render() {
        const {options, size} = this.state;

        return (
            <div>
                <Header >MEMES!</Header>
    <Container>
        <Segment>
            <Form>
                <Form.Field>
               
                <input placeholder='Your Question' />
                </Form.Field>
                <Form.Field>

                {
                    this.state.options.map((option,index)=>{
                        return(
                            <div key = {index}>
                                <input placeholder='Poll Option #1'  onChange={(e)=> this.onTextChange(e,index)}  onClick={ this.addOption}  name='1' />
  
                            </div>
                        )
                    })
                }
                
               
                </Form.Field>
                <Form.Field>
                <Checkbox  label='Public' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </Segment>
    </Container>
            </div>
        )
    }
}


