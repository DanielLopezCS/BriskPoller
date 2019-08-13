import React, { Component } from 'react'
import SideBar from '../SideBar/SideBar'

import CreatePoll from '../CreatePoll/CreatePoll'

export default class PollCreatePage extends Component {   
    render() {
 
        return (
            <div>
                <SideBar>
                    <CreatePoll history = {this.props.history}/>
                </SideBar>
              {/*  <SideBar  /> */}               
            </div>
        )
    }
}
