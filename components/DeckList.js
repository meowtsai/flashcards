import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { silver } from '../utils/color'
import {fetchFlashCardsResults } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDeckEntries } from '../actions'
import DeckItem from '../components/DeckItem'
import { Entypo } from '@expo/vector-icons'


class DeckList extends Component {
  state = {
    isLoading: true
  }

  componentDidMount() {
    const { dispatch } = this.props
    fetchFlashCardsResults()
    .then((deckEntries) => {
      if (deckEntries!==null)
      {
        this.setState({
          isLoading: false,
        })
      }
      dispatch(receiveDeckEntries(deckEntries))
    })
  }

  _renderItem = ({item}) => (
    <TouchableOpacity onPress={() =>
      this.props.navigation.navigate('DeckView',{ deckId: item.key })
      }>
      <DeckItem item={item} />
    </TouchableOpacity>
  )

  render () {
    const {listData} = this.props
    //console.log("render listData", listData)
    if (!listData || listData.length === 0){
      return (
        <View style={styles.message}>
          <Entypo name='add-to-list' size={80} />
          <Text style={{fontSize:20,marginTop:15}}>No cards available!</Text>
          <Text style={{fontSize:20,marginTop:15}}>Begin by click on [Add Deck] tab.</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={listData}
          renderItem={this._renderItem}
        />
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
  },
  message: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',

  },
})

function mapStateToProps (deckEntries) {
  //console.log("mapStateToProps",deckEntries)
  const listData = Object.keys(deckEntries).map((key) =>{
    const { title, questions } = deckEntries[key]
    if (undefined !== questions && questions.length) {
      return (
        {key,count:questions.length}
      )
    } else {
      return (
        {key,count:0}
      )
    }

  })
  return {
    listData
  }

}
export default connect(
  mapStateToProps,
)(DeckList)
