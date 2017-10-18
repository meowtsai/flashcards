export const RECEIVE_DECK_ENTRIES ='RECEIVE_DECK_ENTRIES'
export const ADD_DECK_ENTRY ='ADD_DECK_ENTRY'
export const ADD_QUESTION_ENTRY ='ADD_QUESTION_ENTRY'
export const RECEIVE_QUIZ_TIME_ENTRY ='RECEIVE_QUIZ_TIME_ENTRY'
export const RESET_DB ='RESET_DB'


export function resetDB(){
  return {
    type: RESET_DB,
  }
}


export function receiveQuizTimeEntry(quizTimeEntry){
  //console.log("receiveQuizTimeEntry",quizTimeEntry)
  return {
    type: RECEIVE_QUIZ_TIME_ENTRY,
    quizTimeEntry,
  }
}


export function receiveDeckEntries(deckEntries){
  //console.log("receiveDeckEntries",deckEntries)
  return {
    type: RECEIVE_DECK_ENTRIES,
    deckEntries,
  }
}

export function addDeckEntry(deckEntry){
  return  {
    type: ADD_DECK_ENTRY,
    deckEntry,
  }
}

export function addQuestionEntry(questionEntry, deckId){
  return  {
    type: ADD_QUESTION_ENTRY,
    questionEntry,
    deckId,
  }
}
