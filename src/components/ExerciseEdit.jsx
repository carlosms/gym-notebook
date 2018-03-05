import React from 'react';

import Card from 'react-toolbox/lib/card/Card'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import CardActions from 'react-toolbox/lib/card/CardActions'
import CardText from 'react-toolbox/lib/card/CardText'
import Button from 'react-toolbox/lib/button/Button'
import Input from 'react-toolbox/lib/input/Input'

import BackButton from './BackButton'

import { connect } from "react-redux";
import { saveExercise } from "../state/data";
import { getExercise } from "../state/data";

import "./ExerciseCard.css";

class ExerciseEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { weight: '', reps: '' };
  }

  exercise = () => {
    return this.props.getExercise(this.props.date, this.props.index);
  }

  handleChange = (name, value) => {
    if (value < 0) {
      value = 0;
    }

    this.setState({ ...this.state, [name]: value });
  };

  handleSave = () => {
    let updated = Object.assign({}, this.exercise());
    updated.sets.push({ weight: this.state.weight, reps: this.state.reps });
    this.props.saveExercise(this.props.date, this.props.index, updated);
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
          <CardTitle title={this.exercise().name}>
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
            <table className="exercise_card">
              <tbody>
                {this.exercise().sets.map((set, index) =>
                  <tr key={index}>
                    <td className="exercise_number">{set.weight}</td>
                    <td className="exercise_label">kgs</td>
                    <td className="exercise_number">{set.reps}</td>
                    <td className="exercise_label">reps</td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardText>
        </Card>
        <br />
        <BackButton />
      </React.Fragment >
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveExercise: (date, index, exercise) => {
      dispatch(saveExercise(date, index, exercise));
    },
  };
};

const mapStateToProps = state => {
  return {
    // selectors
    getExercise: (date, index) => getExercise(state.data, date, index),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseEdit);