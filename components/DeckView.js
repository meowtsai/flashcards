import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { silver } from '../utils/color'
import { connect } from 'react-redux'
import DeckItem from '../components/DeckItem'
import TextButton from '../components/TextButton'

class DeckView extends Component {

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params
    return {
      title: `${deckId}`
    }
  }

  render () {
    const { itemData, deckId } = this.props
    return (
      <View style={styles.container}>
        <DeckItem item={itemData} />

        { itemData.count>0 &&
        <TextButton  onPress={() => this.props.navigation.navigate(
                  'QuizView',
                  { deckId }
                )}>Start Quiz</TextButton>
        }
        <TextButton onPress={() => this.props.navigation.navigate(
                  'AddCard',
                  { deckId}
                )}>
          Add Card
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    padding: 10,
    fontSize: 22,
    fontWeight:'bold',
    textAlign: 'center',
  },

})

function mapStateToProps (deckEntries, { navigation }) {
  const { deckId } = navigation.state.params
  const { title, questions } = deckEntries[deckId]
  const itemData = {key:title,count:questions.length}
  return {
    deckId,
    itemData,
  }
}


export default connect(
  mapStateToProps,
)(DeckView)
