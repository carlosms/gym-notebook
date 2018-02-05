import React from 'react';

import Card from 'react-toolbox/lib/card/Card'
import CardTitle from 'react-toolbox/lib/card/CardTitle'

class ExerciseCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <CardTitle title={this.props.exercise.name}>
        </CardTitle>
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
      </Card>
    );
  }
}

export default ExerciseCard;