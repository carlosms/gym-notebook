import React from 'react';
import { connect } from "react-redux";
import { getExercises } from "../state/data";

import Button from 'react-toolbox/lib/button/Button'

import { withRouter } from 'react-router-dom';

import ExerciseCard from './ExerciseCard'
import BackButton from './BackButton'

import "./Day.css";

class Day extends React.Component {
  handleNewExercise = () => {
    this.props.history.push(`/log/${this.props.date}/new`);
  }

  render() {
    const backButton = this.props.history.location.pathname !== '/' ?
      (<div>
        <br />
        <BackButton/>
      </div>)
      :
      ''

    return (
      <div>
        {this.props.exercises.length > 0 ? (
        this.props.exercises.map((exercise, index) =>
          <React.Fragment key={exercise.name}>
            <ExerciseCard
              exercise={exercise}
              index={index} />
            <br />
          </React.Fragment>
        )
        ) : (
          <p className="empty-log">Workout log is empty</p>
        )
      }
        <Button icon='add' label='New exercise'
          onMouseUp={this.handleNewExercise}
          flat primary />
        {backButton}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    date: state.currDate,
    exercises: getExercises(state.data, state.currDate),

    // selectors
    getExercises: (date) => getExercises(state.data, date),
  };
};

export default connect(mapStateToProps)( withRouter(Day) );
