import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { silver, } from '../utils/color'


export default function DeckItem ({ item }) {
    return (
      <View key={item.key} style={styles.deckItem}>
        <Text style={[styles.deckItemText,{fontWeight: 'bold', fontSize:20}]}>{item.key}</Text>
        <Text style={[styles.deckItemText]}>{item.count} Cards</Text>
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
  deckItem: {
    width: 200,
    height: 100,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: silver,
    justifyContent: 'center',
    },
  deckItemText: {
    textAlign: 'center',
    }
})
