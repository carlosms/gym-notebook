import React from 'react';
import { connect } from "react-redux";

import Card from 'react-toolbox/lib/card/Card'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import CardActions from 'react-toolbox/lib/card/CardActions'
import CardText from 'react-toolbox/lib/card/CardText'
import Button from 'react-toolbox/lib/button/Button'

import { withRouter } from 'react-router-dom';

import "./ExerciseCard.css";

class ExerciseCard extends React.Component {
  handleEditExercise = () => {
    this.props.history.push(`/log/${this.props.date}/${this.props.index}`);
  }

  render() {
    return <Card>
        <CardTitle title={this.props.exercise.name} />
        <CardText>
          <table class="exercise_card">
            <tbody>
              {this.props.exercise.sets.map((set, index) => <tr key={index}>
                  <td class="exercise_number">{set.weight}</td>
                  <td class="exercise_label">kgs</td>
                  <td class="exercise_number">{set.reps}</td>
                  <td class="exercise_label">reps</td>
                </tr>)}
            </tbody>
          </table>
        </CardText>
        <CardActions>
          <Button icon="edit" label="Edit" onMouseUp={this.handleEditExercise} />
        </CardActions>
      </Card>;
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

export default connect(mapStateToProps, mapDispatchToProps)( withRouter(ExerciseCard) );
