import React, { Component } from 'react'
import {TouchableOpacity,ScrollView, Text,View,StyleSheet,Dimensions} from 'react-native'
import {WebView} from 'react-native-webview'

const windowHeight=Math.round(Dimensions.get('window').height)
const windowWidth=Math.round(Dimensions.get('window').width)
import MyButton from '../../Components/useNavigationButton'
export default class Search extends Component{
    
    render(){
        return (
            <ScrollView >
                <View style={styles.containerStyle}>
                    <WebView 
                    style={{width:windowWidth,height:"100%"}}
                    source={{uri:"https://www.baidu.com"}}/>
                </View>
            </ScrollView>
        )
    }
}
const styles=StyleSheet.create({
    containerStyle:{
        width:windowWidth,height:windowHeight*0.87+6
    }
})