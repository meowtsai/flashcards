import React, { Component } from 'react'
import { View, Text, StyleSheet, } from 'react-native'
import {
  clearLocalNotification,
  setLocalNotification
 } from '../utils/helpers'
import { red, green } from '../utils/color'
import { addQuizTakenTimeToDB } from '../utils/api'
import { connect } from 'react-redux'
import QuizItem from '../components/QuizItem'
import TextButton from '../components/TextButton'
import { FontAwesome } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'


class QuizView extends Component {

  state = {
    currentQ: 0,
    quizResult: [],
    showAnswer: false,
  }

  markCorrect = () => {
    const {quizResult} = this.state
    quizResult.push("O")
    this.setState({
      currentQ: this.state.currentQ + 1,
      quizResult,
      showAnswer: false,
    })
  }

  markIncorrect = () => {
    const {quizResult} = this.state
    quizResult.push("X")
    this.setState({
      currentQ: this.state.currentQ + 1,
      quizResult,
      showAnswer: false,
    })
  }

  displayAnswer = () => {
    this.setState({
      showAnswer: !this.state.showAnswer,
    })
  }

  onQuizCompleted = () => {
    const quizTakenTime = Date.now();
    addQuizTakenTimeToDB({"timestamp":quizTakenTime})

    clearLocalNotification()
      .then(setLocalNotification)
  }

  toQuiz = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'QuizView'}))
  }

  toDeckView = () => {
    const { deckId } = this.props
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'}),
        NavigationActions.navigate({ routeName: 'DeckView', params: {deckId}, })
      ]
    })
    this.props.navigation.dispatch(resetAction)

  }


  render () {
    const { title, questions, deckId } = this.props
    const { currentQ, quizResult, showAnswer } = this.state
    const progressText = `Quiz Progress: ${currentQ+1} / ${questions.length}`

    if(currentQ === questions.length){
      this.onQuizCompleted()
      const score = quizResult.reduce((accumulator, currentValue) => {
        if (currentValue === 'O')
        {
          accumulator++
        }
        return accumulator;
      },0)

      const scoreText = `[ ${score} / ${questions.length} ]`
      return(
        <View style={styles.message}>
          <FontAwesome name='check-square-o' size={80} />
          <Text style={{fontSize:20,marginTop:15}}>Quiz Completed!</Text>
          <Text style={{fontSize:20,marginTop:15}}>You scored {scoreText} this time!</Text>
          <TextButton onPress={() => this.props.navigation.navigate(
                    'QuizView',
                    { deckId }
                  )}>Restart Quiz</TextButton>
          <TextButton onPress={() => this.toDeckView()}>
            Back to Deck
          </TextButton>
        </View>
      )}


    return (
      <View style={styles.container}>
        <Text>{progressText}</Text>
        <QuizItem item={questions[currentQ]} onFlipCard={() => this.displayAnswer()} showAnswer={showAnswer}/>
        { showAnswer &&
        <View>
        <TextButton style={{marginTop:100,backgroundColor:green}} onPress={() => this.markCorrect()}>
          Correct
        </TextButton>

        <TextButton  style={{backgroundColor:red}} onPress={() => this.markIncorrect()}>
          Incorrect
        </TextButton>
        </View>
        }
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
  message: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
})

function mapStateToProps (deckEntries, { navigation }) {
  const { deckId } = navigation.state.params
  const { title, questions } = deckEntries[deckId]
  return {
    deckId,
    title,
    questions,
  }
}


export default connect(
  mapStateToProps,
)(QuizView)
