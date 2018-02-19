import React from 'react';

import Card from 'react-toolbox/lib/card/Card'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import CardActions from 'react-toolbox/lib/card/CardActions'
import CardText from 'react-toolbox/lib/card/CardText'
import Button from 'react-toolbox/lib/button/Button'

import { withRouter } from 'react-router-dom';

class ExerciseCard extends React.Component {
  handleEditExercise = () => {
    this.props.history.push(`/log/${this.props.date}/${this.props.index}`);
  }

  render() {
    return (
      <Card>
        <CardTitle title={this.props.exercise.name}>
        </CardTitle>
        <CardText>
          <table>
            <tbody>
              {this.props.exercise.sets.map((set, index) =>
                <tr key={index}>
                  <td>
                    {set.weight}
                  </td>
                  <td>
                  </td>
                  <td>
                    kgs
                  </td>
                  <td>
                    {set.reps}
                  </td>
                  <td>
                    reps
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardText>
        <CardActions>
          <Button icon="edit" label="Edit" onMouseUp={this.handleEditExercise} />
        </CardActions>
      </Card>
    );
  }
}

export default withRouter(ExerciseCard);