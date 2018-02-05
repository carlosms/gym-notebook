import React from 'react';

import AppBar from 'react-toolbox/lib/app_bar/AppBar'
import IconButton from 'react-toolbox/lib/button/IconButton'

import Layout from 'react-toolbox/lib/layout/Layout'
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer'
import Panel from 'react-toolbox/lib/layout/Panel'
import Sidebar from 'react-toolbox/lib/layout/Sidebar'
import Navigation from 'react-toolbox/lib/navigation/Navigation';

import Day from './Day'

import mockData from '../data/mock-data'

class Main extends React.Component {
  state = {
    drawerActive: false,
    drawerPinned: false,
    sidebarPinned: false,

    currDate: "2018-01-23"
  };

  toggleDrawerActive = () => {
    this.setState({ drawerActive: !this.state.drawerActive });
  };

  toggleDrawerPinned = () => {
    this.setState({ drawerPinned: !this.state.drawerPinned });
  }

  toggleSidebar = () => {
    this.setState({ sidebarPinned: !this.state.sidebarPinned });
  };

  formatDate(date) {
    return date.toISOString().slice(0, 10)
  }

  addDays = (n) => {
    let d = new Date(this.state.currDate)
    d.setDate(d.getDate() + n);
    this.setState({ currDate: this.formatDate(d) })
  }

  handleNextDay = () => {
    this.addDays(1)
  };

  handlePrevDay = () => {
    this.addDays(-1)
  };

  render() {
    let data = mockData[this.state.currDate];
    let exercises = data !== undefined ? data.exercises : [];

    return (
      <Layout>
        <NavDrawer active={this.state.drawerActive}
          pinned={this.state.drawerPinned} permanentAt='xxxl'
          onOverlayClick={this.toggleDrawerActive}>
          <p>Navigation menu</p>
        </NavDrawer>
        <Panel>
          <AppBar leftIcon='menu' onLeftIconClick={this.toggleDrawerPinned} title="Gym Notebook"/>
          <Navigation type='horizontal'
            actions={
              [
                { icon: 'chevron_left', raised: true, primary: false, onMouseUp: this.handlePrevDay },
                { label: this.state.currDate, flat: true, disabled: true },
                { icon: 'chevron_right', raised: true, primary: false, onMouseUp: this.handleNextDay },
              ]
            } />
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem', maxWidth: '500px', margin: 'auto' }}>
            <Day exercises={exercises}>
            </Day>
          </div>
        </Panel>
        <Sidebar pinned={this.state.sidebarPinned} width={5}>
          <div><IconButton icon='close' onClick={this.toggleSidebar} /></div>
          <div style={{ flex: 1 }}>
            <p>Supplemental content goes here.</p>
          </div>
        </Sidebar>
      </Layout>
    );
  }
}

export default Main;