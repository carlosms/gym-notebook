import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import { connect } from "react-redux";
import {
  toggleDrawerPinned,
  toggleDrawerActive,
  toggleSidebarPinned
} from "../state/drawer";
import { currDateSet } from "../state/currDate";
import { getExercise } from "../state/data";

import AppBar from 'react-toolbox/lib/app_bar/AppBar'
import IconButton from 'react-toolbox/lib/button/IconButton'

import Layout from 'react-toolbox/lib/layout/Layout'
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer'
import Panel from 'react-toolbox/lib/layout/Panel'
import Sidebar from 'react-toolbox/lib/layout/Sidebar'

import Days from './Days'
import Day from './Day'
import ExerciseEdit from './ExerciseEdit'
import ExerciseNew from './ExerciseNew'

class Main extends React.Component {
  render() {
    const DayComponent = (props) => {
      const date = props.match.params.date;
      this.props.onCurrDateSet(date);

      return (
        <Day
          {...props}
        />
      )
    }

    const ExerciseEditComponent = (props) => {
      const date = props.match.params.date;
      const index = props.match.params.index;

      // return to '/' for a non-existing url
      // TODO: find a better way to do this
      if (this.props.getExercise(date, index) === undefined) {
        props.history.replace(`/`);
        return <div/>;
      }

      return (
        <ExerciseEdit
          date={date}
          index={index}
          {...props}
        />
      );
    }

    const ExerciseNewComponent = (props) => {
      const date = props.match.params.date;

      let dateData = this.props.data[date];
      let exercises = dateData !== undefined ? dateData.exercises : [];

      return (
        <ExerciseNew
          date={date}
          newIndex={exercises.length}
          {...props}
        />
      );
    }

    return <Router>
        <Layout>
          <NavDrawer
            active={this.props.drawerActive}
            pinned={this.props.drawerPinned}
            permanentAt="xxxl"
            onOverlayClick={this.props.onToggleDrawerActiveClick}>
            <p>Navigation menu</p>
          </NavDrawer>
          <Panel>
            <AppBar
              leftIcon="menu"
              onLeftIconClick={this.props.onToggleDrawerPinnedClick}
              title="Gym Notebook" />
            <div style={{ flex: 1, overflowY: "auto", padding: "1.8rem", maxWidth: "500px", margin: "auto" }}>
              <Route exact path="/" component={Days} />
              <Route exact path="/log/:date" render={DayComponent} />
              <Route path="/log/:date/new" render={ExerciseNewComponent} />
              <Route path="/log/:date/:index(\d+)" render={ExerciseEditComponent} />
            </div>
          </Panel>
          <Sidebar pinned={this.props.sidebarPinned} width={5}>
            <div>
              <IconButton icon="close" onClick={this.props.toggleSidebarClick} />
            </div>
            <div style={{ flex: 1 }}>
              <p>Supplemental content goes here.</p>
            </div>
          </Sidebar>
        </Layout>
      </Router>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onToggleDrawerPinnedClick: () => {
      dispatch(toggleDrawerPinned());
    },
    onToggleDrawerActiveClick: () => {
      dispatch(toggleDrawerActive());
    },
    toggleSidebarClick: () => {
      dispatch(toggleSidebarPinned());
    },

    onCurrDateSet: (date) => {
      dispatch(currDateSet(date))
    },
  };
};

const mapStateToProps = state => {
  return {
    data: state.data,

    drawerActive: state.drawer.drawerActive,
    drawerPinned: state.drawer.drawerPinned,
    sidebarPinned: state.drawer.sidebarPinned,

    currDate: state.currDate,

    // selectors
    getExercise: (date, index) => getExercise(state.data, date, index),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);