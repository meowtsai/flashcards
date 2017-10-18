import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native'
import { silver, white, black } from '../utils/color'
import { addCardToDB } from '../utils/api'
import { connect } from 'react-redux'
import { addQuestionEntry } from '../actions'
import TextButton from '../components/TextButton'

class AddCard extends Component {
  state = {
    inputQuestionValue: '',
    inputAnswerValue: '',
  }

submit = () => {
    const { inputQuestionValue, inputAnswerValue } = this.state
    const { deckId, deckData } = this.props

    if (inputQuestionValue!=='' && inputAnswerValue!=='')
    {
      let newQuestion ={
        answer: inputAnswerValue,
        question: inputQuestionValue,
      }

      let dbEntry ={
        title: deckId,
        questions: [newQuestion],
      }

      this.props.dispatch(addQuestionEntry(
        newQuestion,
        deckId,
      ))

      addCardToDB(newQuestion, deckId)
      this.setState({inputQuestionValue:'', inputAnswerValue: '',})
      Keyboard.dismiss()
      this.props.navigation.goBack()
    }

}

render () {
  const { deckId } = this.props
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.headerText}>
        {deckId}
      </Text>

      <TextInput
        style={styles.input}
        value={this.state.inputQuestionValue}
        placeholder="Enter a question here."
        onChangeText={(inputQuestionValue) =>
        {
          this.setState({inputQuestionValue})
        }}
      />

      <TextInput
        style={[styles.input, {marginTop:10,}]}
        value={this.state.inputAnswerValue}
        placeholder="Enter the answer here."
        onChangeText={(inputAnswerValue) =>
        {
          this.setState({inputAnswerValue})
        }}
      />
      <TextButton onPress={()=>this.submit()}>
        Add to Deck
      </TextButton>
    </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  headerText: {
    padding: 10,
    fontSize: 20,
    fontWeight:'bold',
    textAlign: 'center',
  },
  input: {
    height:44,
    width: 330,
    borderWidth: 1,
    borderColor: silver,
  },
})

function mapStateToProps (deckEntries, { navigation }) {
  const { deckId } = navigation.state.params
  const deckData = deckEntries[deckId]
  return {
    deckId,
    deckData,
  }
}


export default connect(
  mapStateToProps,
)(AddCard)
