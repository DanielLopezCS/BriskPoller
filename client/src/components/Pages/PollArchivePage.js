import React, { Component } from 'react'
import SideBar from '../SideBar/SideBar';

import PollArchive from '../PollsArchive/PollsArchive'

export default class PollArchivePage extends Component {
    render() {
        return (
            <div>
                <SideBar>
                    <PollArchive history ={this.props.history} />
                </SideBar>
            </div>
        )
    }
}
