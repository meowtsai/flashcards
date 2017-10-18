import { AsyncStorage } from 'react-native'

const FLASHCARDS_STORAGE_KEY = 'FlashCard:deck'
const FLASHCARDS_STORAGE_QUIZ_KEY = 'FlashCard:quiz'
export const QuizTakenTime_KEY = 'QuizTakenTime'

export function addQuizTakenTimeToDB( entry ){
  //console.log("addDeckToDB",entry +"," +key )
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_QUIZ_KEY, JSON.stringify({
      [QuizTakenTime_KEY]: entry
    }))
}

export function fetchQuizTakenTime(){
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_QUIZ_KEY)
    .then(results => JSON.parse(results)[QuizTakenTime_KEY])
}


export function fetchFlashCardsResults(){
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
      .then(results => JSON.parse(results))
}

export function clearFlashCardsDB(){
  return AsyncStorage.removeItem(FLASHCARDS_STORAGE_KEY)
  .then(results => {
    AsyncStorage.removeItem(FLASHCARDS_STORAGE_QUIZ_KEY)
  })
}

export function addDeckToDB( entry, key ){
  //console.log("addDeckToDB",entry +"," +key )
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
      [key]: entry
    }))
  }

export function addCardToDB( questionEntry, key ){
  //console.log("addCardToDB",JSON.stringify(questionEntry) +"," +key )
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      newData = {...data[key],"questions":[
        ...data[key]["questions"],questionEntry,]}
        AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
          [key]: newData
        }))
    })

}
