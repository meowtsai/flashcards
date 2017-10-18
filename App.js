import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import AddDeck from './components/AddDeck'
import DeckList from './components/DeckList'
import DeckView from './components/DeckView'
import AddCard from './components/AddCard'
import QuizView from './components/QuizView'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { silver, white, black, purple } from './utils/color'
import { setLocalNotification } from './utils/helpers'
import { Entypo } from '@expo/vector-icons'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Deck List',
      tabBarIcon: ({ tintColor }) => <Entypo name='list' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <Entypo name='plus' size={30} color={tintColor} />
    },
  },
},
{
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  },
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: Platform.OS === 'ios' ? white : black,
      headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? black : white,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: "Add Card",
      headerTintColor: Platform.OS === 'ios' ? white : black,
      headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? black : white,
      }
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      title: "Quiz",
      headerTintColor: Platform.OS === 'ios' ? white : black,
      headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? black : white,
      }
    }
  }
})



export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
      <View style={styles.container}>
        <MainNavigator />
      </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
})
