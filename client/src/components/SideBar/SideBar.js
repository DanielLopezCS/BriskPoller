import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  
} from 'semantic-ui-react'

import {Link} from 'react-router-dom';


const HorizontalSidebar = ({ animation, direction, visible }) => (
  <Sidebar as={Segment} animation={animation} direction={direction} visible={visible}>
    <Grid textAlign='center'>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Header as='h3'>New Content Awaits</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid columns={3} divided>
        <Grid.Column>
          <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
        </Grid.Column>
        <Grid.Column>
          <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
        </Grid.Column>
        <Grid.Column>
          <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
        </Grid.Column>
      </Grid>
    </Grid>
  </Sidebar>
)

HorizontalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
}

const VerticalSidebar = ({ animation, direction, visible }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon='labeled'
    inverted
    vertical
    visible={visible}
    width='thin'
  >
       <Menu.Item  as={Link} to ='/' >
      <Icon name='images' color='orange'  size='huge' />
      <span style={{color:'orange'}}>BriskPoller</span>
    </Menu.Item>
    <Menu.Item as={Link} to ='/create'>
      <Icon name='pen square'  />
      
      Create Poll
      
    </Menu.Item>
    <Menu.Item  as={Link} to ='/polls'>
      <Icon name='align center' />
      View Polls
    </Menu.Item>
    <a href = 'https://github.com/DanielLopezCS/BriskPoller'>
    <Menu.Item >
      <Icon name='code' />
      Source Code
    </Menu.Item>
    </a>
  </Sidebar>
)

VerticalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
}

export default class SidebarExampleTransitions extends Component {
  state = {
    animation: 'push',
    direction: 'left',
    dimmed: false,
    visible: true,
  }

  handleAnimationChange = animation => () =>
    this.setState(prevState => ({ animation, visible: !prevState.visible }))

  handleDimmedChange = (e, { checked }) => this.setState({ dimmed: checked })

  handleDirectionChange = direction => () => this.setState({ direction, visible: false })

  render() {
    const { animation, dimmed, direction, visible } = this.state
    const vertical = direction === 'bottom' || direction === 'top'
    
    return (
      <div>


  
        <Sidebar.Pushable as={Segment} style = {{height:'150vh'}} >
          {vertical ? (
            <HorizontalSidebar animation={animation} direction={direction} visible={visible} />
          ) : null}
          {vertical ? null : (
            <VerticalSidebar animation={animation} direction={direction} visible={visible} />
          )}

          <Sidebar.Pusher dimmed={dimmed && visible}>
            <Segment basic>
              
              
            {this.props.children}


            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}