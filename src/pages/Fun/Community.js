import React, { Component } from 'react'
import { Text, View,StyleSheet,Dimensions } from 'react-native'

const ScreenHeight=Math.round(Dimensions.get('window').height)
export default class Com extends Component{
    render(){
       return  (
            <View style={{marginTop:ScreenHeight*0.03}}>
                <Text>Community</Text></View>
        )
    }
}