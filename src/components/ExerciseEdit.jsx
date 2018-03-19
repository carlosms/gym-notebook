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
    this.state = { weight: "", reps: "", editIndex: null };
  }

  exercise = () => {
    return this.props.getExercise(this.props.date, this.props.index);
  };

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
  };

  handleUpdate = () => {
    let updated = Object.assign({}, this.exercise());
    let set = updated.sets[this.state.editIndex];
    updated.sets[this.state.editIndex] = {
      ...set,
      weight: this.state.weight,
      reps: this.state.reps
    };

    this.props.saveExercise(this.props.date, this.props.index, updated);
    this.unselect();
  };

  handleDelete = () => {
    let updated = Object.assign({}, this.exercise());
    updated.sets.splice(this.state.editIndex, 1);

    this.props.saveExercise(this.props.date, this.props.index, updated);
    this.unselect();
  };

  handleClear = () => {
    this.setState({ ...this.state, weight: "", reps: "" });
  };

  unselect = () => {
    this.setState({
      ...this.state,
      editIndex: null,
      weight: "",
      reps: ""
    });
  };

  onRowClick = index => () => {
    if (this.state.editIndex === index) {
      this.unselect();
      return;
    }

    const set = this.exercise().sets[index];
    this.setState({
      ...this.state,
      editIndex: index,
      weight: set.weight,
      reps: set.reps
    });
  };

  trClass = (index) => {
    if (this.state.editIndex === index) {
      return 'selected';
    }

    return '';
  }

  render() {
    const visibleStyle = { flexGrow: 1 };
    const hiddenStyle = { flexGrow: 1, display: "none" };

    const editing = this.state.editIndex !== null;

    const saveStyle = editing ? hiddenStyle : visibleStyle;
    const clearStyle = editing ? hiddenStyle : visibleStyle;
    const updateStyle = editing ? visibleStyle : hiddenStyle;
    const deleteStyle = editing ? visibleStyle : hiddenStyle;

    const inputStyle = { flexGrow: "1", margin: "0 20px" };

    const disabled = this.state.weight === "" || this.state.reps === "";

    return (
      <React.Fragment>
        <Card>
          <CardTitle title={this.exercise().name} />
          <CardText style={{ display: "flex", justifyContent: "center" }}>
            <div style={inputStyle}>
              <Input
                type="number"
                label="Weight (kgs)"
                value={this.state.weight}
                onChange={this.handleChange.bind(this, "weight")}
              />
            </div>
            <div style={inputStyle}>
              <Input
                type="number"
                label="Reps"
                value={this.state.reps}
                onChange={this.handleChange.bind(this, "reps")}
              />
            </div>
          </CardText>
          <CardActions
            style={{
              width: "80%",
              margin: "auto",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Button
              icon="check"
              label="Save"
              style={saveStyle}
              onMouseUp={this.handleSave}
              primary
              disabled={disabled}
            />
            <Button
              label="Clear"
              style={clearStyle}
              onMouseUp={this.handleClear}
            />
            <Button
              icon="check"
              label="Update"
              style={updateStyle}
              onMouseUp={this.handleUpdate}
              primary
              disabled={disabled}
            />
            <Button
              label="Delete"
              style={deleteStyle}
              onMouseUp={this.handleDelete}
            />
          </CardActions>
          <CardText>
            <table className="exercise_card edit">
              <tbody>
                {this.exercise().sets.map((set, index) => (
                  <tr key={index} className={this.trClass(index)} onClick={this.onRowClick(index)}>
                    <td className="exercise_number">{set.weight}</td>
                    <td className="exercise_label">kgs</td>
                    <td className="exercise_number">{set.reps}</td>
                    <td className="exercise_label">reps</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardText>
        </Card>
        <br />
        <BackButton />
      </React.Fragment>
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