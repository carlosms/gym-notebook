import React from 'react';
import { connect } from "react-redux";

import Button from 'react-toolbox/lib/button/Button'

import { withRouter } from 'react-router-dom';

import ExerciseCard from './ExerciseCard'
import BackButton from './BackButton'

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
        {this.props.exercises.map((exercise, index) =>
          <React.Fragment key={exercise.name}>
            <ExerciseCard
              exercise={exercise}
              index={index} />
            <br />
          </React.Fragment>
        )}
        <Button icon='add' label='New exercise'
          onMouseUp={this.handleNewExercise}
          flat primary />
        {backButton}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // TODO history
  };
};

const mapStateToProps = state => {
  return {
    date: state.currDate
  };
};

export default connect(mapStateToProps, mapDispatchToProps)( withRouter(Day) );
