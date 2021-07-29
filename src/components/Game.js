import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import RandomNumber from './RandomNumber';
import {grey} from 'chalk';
class Game extends React.Component {
  state = {
    selectedNumbers: [],
  };
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
  };

  randomNumbers = Array.from({length: this.props.randomNumberCount}).map(
    () => 1 + Math.floor(10 * Math.random()),
  );
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  isNumberSelected = numberIndex => {
    return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
  };

  selectNumber = numberIndex => {
    this.setState(prevState => ({
      selectedNumbers: [...prevState.selectedNumbers, numberIndex],
    }));
    console.log(this.state.selectedNumbers);
  };
  gameStatus = () => {
    const sumSelected = this.state.selectedNumbers.reduce((acc, curr) => {
      return acc + this.randomNumbers[curr];
    }, 0);
    console.log(sumSelected);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.target}>{this.target}</Text>
        <View style={styles.randomContainer}>
          {this.randomNumbers.map((randomNumber, index) => (
            <RandomNumber
              key={index}
              id={index}
              number={randomNumber}
              isDisabled={this.isNumberSelected(index)}
              onPress={this.selectNumber}
            />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    flex: 1,
  },
  target: {
    fontSize: 40,
    backgroundColor: 'grey',
    margin: 50,
    textAlign: 'center',
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

export default Game;
