import React from 'react';

import Card from 'react-toolbox/lib/card/Card'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import CardActions from 'react-toolbox/lib/card/CardActions'
import CardText from 'react-toolbox/lib/card/CardText'
import Button from 'react-toolbox/lib/button/Button'
import Input from 'react-toolbox/lib/input/Input'

import { withRouter } from 'react-router-dom';

class ExerciseEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { weight: '', reps: '' };
  }

  handleChange = (name, value) => {
    if (value < 0) {
      value = 0;
    }

    this.setState({ ...this.state, [name]: value });
  };

  handleSave = () => {
    this.props.exercise.sets.push({ weight: this.state.weight, reps: this.state.reps });
    this.props.saveExercise(this.props.date, this.props.index, this.props.exercise)
  }

  handleBack = () => {
    this.props.history.goBack();
  }

  render() {
    const saveStyle = {};
    const updateStyle = { display: "none" };
    const deleteStyle = { display: "none" };

    const disabled = (this.state.weight === '' || this.state.reps === '');

    // TODO: Select sets from the table, fill values, and show the Update and Delete buttons

    return (
      <React.Fragment >
        <Card>
          <CardTitle title={this.props.exercise.name}>
          </CardTitle>
          <CardText>
            <Input type='number' label='Weight (kgs)' value={this.state.weight} onChange={this.handleChange.bind(this, 'weight')} />
            <Input type='number' label='Reps' value={this.state.reps} onChange={this.handleChange.bind(this, 'reps')} />
          </CardText>
          <CardActions>
            <Button icon="check" label="Save" style={saveStyle} onMouseUp={this.handleSave} primary disabled={disabled} />
            <Button icon="check" label="Update" style={updateStyle} onMouseUp={this.handleUpdate} primary disabled={disabled} />
            <Button label="Delete" style={deleteStyle} onMouseUp={this.handleDelete} />
          </CardActions>
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
        </Card>
        <br />
        <Button icon="arrow_back" onMouseUp={this.handleBack} floating mini />
      </React.Fragment >
    );
  }
}

export default withRouter(ExerciseEdit);