import React, { Component } from 'react';

import Card from 'react-toolbox/lib/card/Card'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'

class ExerciseCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <CardTitle title={this.props.exercise.name}>
        </CardTitle>
        <List>

          {this.props.exercise.sets.map((set) =>
            <ListItem caption={set.weight +"kg    "+set.reps+" reps"} />

          )}
        </List>
      </Card>
    );
  }
}

export default ExerciseCard;