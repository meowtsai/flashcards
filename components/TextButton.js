import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { skyBlue, white } from '../utils/color'

export default function TextButton ({children, onPress, style}) {
  return (
    <TouchableOpacity onPress={onPress} style={[Platform.OS==='ios'? styles.iosResetBtn:styles.androidResetBtn,style]}>
      <Text style={styles.btnText}>{children}</Text>
    </TouchableOpacity>

  )
}


const styles = StyleSheet.create({
  iosResetBtn: {
    marginTop: 20,
    backgroundColor: skyBlue,
    borderRadius: 10,
    padding: 10,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: 'center',
    width: 200,

  },
  androidResetBtn: {
    marginTop: 20,
    backgroundColor: skyBlue,
    borderRadius: 7,
    padding: 10,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: 'flex-end',
    width: 200,

  },
  btnText: {
    fontSize:22,
    color: white,
    justifyContent: 'center',
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold',
  },

})
