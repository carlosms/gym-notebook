import React, { Component } from 'react';

import AppBar from 'react-toolbox/lib/app_bar/AppBar'
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox'
import IconButton from 'react-toolbox/lib/button/IconButton'

import Layout from 'react-toolbox/lib/layout/Layout'
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer'
import Panel from 'react-toolbox/lib/layout/Panel'
import Sidebar from 'react-toolbox/lib/layout/Sidebar'

import Day from './Day'

class Main extends React.Component {
  state = {
    drawerActive: false,
    drawerPinned: false,
    sidebarPinned: false
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

  render() {
    return (
      <Layout>
        <NavDrawer active={this.state.drawerActive}
          pinned={this.state.drawerPinned} permanentAt='xxxl'
          onOverlayClick={this.toggleDrawerActive}>
          <p>Navigation menu</p>
        </NavDrawer>
        <Panel>
          <AppBar leftIcon='menu' onLeftIconClick={this.toggleDrawerPinned} title="Gym Notebook"/>
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
            <Day>
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