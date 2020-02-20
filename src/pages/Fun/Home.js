import React, { Component } from 'react'
import { Text, View,StyleSheet,Dimensions } from 'react-native'

const ScreenHeight=Math.round(Dimensions.get('window').height)

export default class Home extends Component{
    render(){
       return  (
            <View style={{marginTop:ScreenHeight*0.03}}
            >
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
            </View>
        )
    }
}