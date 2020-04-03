/**
 * 操作asyncStorage
 */
import  AsyncStorage from '@react-native-community/async-storage'

 export  const _setData=async (key,value)=>{
        try {
            await AsyncStorage.setItem(key,value)
        } catch (error) {
            console.log(error)
        }
 }
 export const _getData = async (key) => {
    try {
      return  await AsyncStorage.getItem(key)
    } catch(e) {
        console.log(e)
    }
  }
  export const _removeValue = async (key) => {
    try {
      return  await AsyncStorage.removeItem(key)
    } catch(e) {
        console.log(e)
    }
  }