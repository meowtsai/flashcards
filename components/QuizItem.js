import React, { Component } from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import { silver, white, black, red } from '../utils/color'


export default function QuizItem ({ item, onFlipCard, showAnswer }) {
    return (
      <View key={item.key} style={styles.QuesionItem}>
        <Text style={[styles.QuesionItemText,{fontWeight: 'bold', fontSize:30}]}>
          {!showAnswer ? item.question:item.answer}
        </Text>
        <TouchableOpacity style={{marginTop:10}} onPress={onFlipCard}>
            <Text style={{color:red}}>
            {!showAnswer ? "Show me the Answer":"Show me the Question"}
            </Text>
        </TouchableOpacity>
      </View>

    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    justifyContent: 'center',
    alignItems: 'center'
  },
  QuesionItem: {
    width: 300,
    height: 150,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: white,
    justifyContent: 'center',
    alignItems: 'center',
    },
  QuesionItemText: {
    textAlign: 'center',
    },

})
