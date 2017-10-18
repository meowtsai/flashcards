import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Keyboard } from 'react-native'
import { silver } from '../utils/color'
import { addDeckToDB } from '../utils/api'
import { connect } from 'react-redux'
import { addDeckEntry } from '../actions'
import TextButton from '../components/TextButton'


class AddDeck extends Component {
  state = {
    inputValue: '',
  }

submit = () => {
  const {inputValue} = this.state
  if (inputValue!=='')
  {
    let entry ={
      title: inputValue,
      questions: [],
    }

    //update redux { entry, key }
    this.props.dispatch(addDeckEntry({
      [inputValue]:entry
    }))

    addDeckToDB(entry, inputValue)
    this.setState({inputValue:''})
    Keyboard.dismiss()
    this.props.navigation.goBack()
  }

}

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>
          What is the title of your new deck?
        </Text>

        <TextInput
          style={styles.input}
          value={this.state.inputValue}
          placeholder="Deck Title"
          onChangeText={(inputValue) =>
          {
            this.setState({inputValue})
          }}
        />
        <TextButton onPress={()=>this.submit()}>
          Submit
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
    fontSize: 30,
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


export default connect()(AddDeck)
