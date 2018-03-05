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

import mockData from '../data/mock-data'

class Main extends React.Component {
  state = {
    data: mockData
  };

  saveExercise = (date, index, exercise) => {
    let data = this.state.data
    let dateData = data[date];

    if (dateData === undefined) {
      data[date] = { exercises: [] }
      dateData = data[date];
    }

    let exercises = dateData.exercises;
    exercises[index] = exercise;

    this.setState({ data: data });
  }

  getExercises = (date) => {
    const currDateData = this.state.data[this.props.currDate];
    return currDateData !== undefined ? currDateData.exercises : []; 
  }

  createExercise = (date, name) => {
    let data = this.state.data
    let dateData = data[date];

    if (dateData === undefined) {
      data[date] = { exercises: [] }
      dateData = data[date];
    }

    let exercises = dateData.exercises;
    exercises.push({ name: name, sets: [] });

    this.setState({ data: data });
  }

  render() {
    const DaysComponent = (props) => {
      return (
        <Days
          data={this.state.data}
          {...props}
        />
      );
    }

    const DayComponent = (props) => {
      const date = props.match.params.date;
      this.props.onCurrDateSet(date);

      return (
        <Day
          exercises={this.getExercises(this.props.currDate)}
          {...props}
        />
      )
    }

    const ExerciseEditComponent = (props) => {
      const date = props.match.params.date;
      const index = props.match.params.index;

      let dateData = this.state.data[date];
      let exercises = dateData !== undefined ? dateData.exercises : [];
      let exercise = exercises[index];

      // TODO: return to '/' for a non-existing url

      return (
        <ExerciseEdit
          exercise={exercise}
          date={date}
          index={index}
          saveExercise={this.saveExercise}
          {...props}
        />
      );
    }

    const ExerciseNewComponent = (props) => {
      const date = props.match.params.date;

      let dateData = this.state.data[date];
      let exercises = dateData !== undefined ? dateData.exercises : [];

      return (
        <ExerciseNew
          date={date}
          newIndex={exercises.length}
          createExercise={this.createExercise}
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
              <Route exact path="/" render={DaysComponent} />
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
    drawerActive: state.drawer.drawerActive,
    drawerPinned: state.drawer.drawerPinned,
    sidebarPinned: state.drawer.sidebarPinned,

    currDate: state.currDate,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);