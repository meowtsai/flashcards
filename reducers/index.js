import {
  RECEIVE_DECK_ENTRIES,
  ADD_DECK_ENTRY,
  ADD_QUESTION_ENTRY,
  } from '../actions/'



function deckEntries(state={},action){
  //console.log("reducers",action)
  switch (action.type) {
    case RECEIVE_DECK_ENTRIES:
      return {
        ...state,
        ...action.deckEntries,
      }
    case ADD_DECK_ENTRY:
        return {
          ...state,
          ...action.deckEntry,
        }
    case ADD_QUESTION_ENTRY:
      return  {
        ...state,
        [action.deckId]:{
          ...state[action.deckId],
          "questions":[
            ...state[action.deckId]["questions"],
          action.questionEntry,
          ]

        }
      }
    default:
      return state

  }
}

export default deckEntries
