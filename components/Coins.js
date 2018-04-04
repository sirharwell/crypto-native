import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getCoins } from '../actions/coins';
import Coin from './Coin';

class Coins extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCoins())
    this.ticker = setInterval( () => dispatch(getCoins()), 60000)
  }

  componentWillUnmount() {
    clearInterval(this.ticker)
  }

  render() {
    const { coins } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>My Portfolio</Text>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          { coins.map( coin => <Coin key={coin.id} {...coin} /> ) }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
  },
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  header: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
})

const mapStateToProps = (state) => {
  return { coins: state.coins }
}

export default connect(mapStateToProps)(Coins);
