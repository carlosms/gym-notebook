import React from 'react';

import ExerciseCard from './ExerciseCard'

class Day extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.exercises.map((exercise) =>
          <React.Fragment key={exercise.name}>
            <ExerciseCard
              exercise={exercise} />
            <br />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Day;