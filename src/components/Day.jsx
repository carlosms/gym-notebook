import React from 'react';

import Button from 'react-toolbox/lib/button/Button'

import { withRouter } from 'react-router-dom';

import ExerciseCard from './ExerciseCard'

class Day extends React.Component {
  handleNewExercise = () => {
    this.props.history.push(`/log/${this.props.date}/new`);
  }

  handleBack = () => {
    this.props.history.goBack();
  }

  render() {
    const backButton = this.props.history.location.pathname !== '/' ?
      (<div>
        <br />
        <Button icon="arrow_back" onMouseUp={this.handleBack} floating mini />
      </div>)
      :
      ''

    return (
      <div>
        {this.props.exercises.map((exercise, index) =>
          <React.Fragment key={exercise.name}>
            <ExerciseCard
              date={this.props.date}
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

export default withRouter(Day);