import React, { Component } from 'react'
import SideBar from '../SideBar/SideBar'

import Polls from '../Polls/Polls'

export default class PollsPage extends Component {
    
    render() {
        return (
            <div>
                <SideBar>
                    <Polls/>
                </SideBar>
            </div>
        )
    }
}
