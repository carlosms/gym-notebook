import React, { Component } from 'react';

import ExerciseCard from './ExerciseCard'

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "2018-01-22T18:22:43.069Z",
      exercises: [
        {
          name: "Squat",
          sets: [
            {
              weight: 70,
              reps: 5
            },
            {
              weight: 70,
              reps: 5
            },
            {
              weight: 70,
              reps: 8
            }
          ]
        },
        {
          name: "Deadlift",
          sets: [
            {
              weight: 110,
              reps: 5
            },
            {
              weight: 115,
              reps: 5
            },
            {
              weight: 120,
              reps: 3
            }
          ]
        }
      ]
    };
  }

  render() {
    return (
      <ul>
        {this.state.exercises.map((exercise) =>
        <li>
          <ExerciseCard key={exercise.name}
            exercise={exercise} />
        </li>

        )}
      </ul>

    );
  }
}

export default Day;