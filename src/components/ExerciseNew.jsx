import React from 'react';

import Card from 'react-toolbox/lib/card/Card'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import CardText from 'react-toolbox/lib/card/CardText'
import CardActions from 'react-toolbox/lib/card/CardActions'
import Button from 'react-toolbox/lib/button/Button'
import Input from 'react-toolbox/lib/input/Input'

import BackButton from './BackButton'

class ExerciseNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  handleChange = (name, value) => {
    if (value < 0) {
      value = 0;
    }

    this.setState({ ...this.state, [name]: value });
  };

  handleSave = () => {
    this.props.createExercise(this.props.date, this.state.name);
    this.props.history.replace(`/log/${this.props.date}/${this.props.newIndex}`)
  };

  render() {
    const disabled = (this.state.name === '');

    return (
      <React.Fragment>
        <Card>
          <CardTitle title="New exercise">
          </CardTitle>
          <CardText>
            <Input type='text' label='Name' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} />
          </CardText>
          <CardActions>
            <Button icon="check" label="Save" onMouseUp={this.handleSave} primary disabled={disabled} />
          </CardActions>
        </Card>
        <br />
        <BackButton/>
      </React.Fragment>
    );
  }
}

export default ExerciseNew;