import React, { Component } from 'react'
import { Text, View,StyleSheet,Alert } from 'react-native'

import Calendar from './Calendar'
import MyBackButton from './useNavigationButton'

export default class Sign extends Component{
    state={
        checkedDate:{}
    }
    render(){
       return  (
            <View style={{flex:1,backgroundColor:'orange'}}>
                <Calendar
                    headerStyle={style.headerStyle}
                    touchEvent={this.handlePress}
                    check={this.state.checkedDate}
                />
                <MyBackButton />
            </View>
        )
    }
    handlePress=(str)=>{
        let dateNumber=str.slice(-2)*1
        if(new Date().getDate()===dateNumber&&this.state.checkedDate[str]!=='checked'){
            const {checkedDate}=this.state
            checkedDate[str]='checked'
            this.setState({
                checkedDate
            })
            Alert.alert('签到提醒','签到成功')
        }else if(new Date().getDate()<dateNumber){
            Alert.alert('签到提醒','时间还没有到呢')
        }else if(new Date().getDate()>dateNumber){
            Alert.alert('签到提醒','时间已过')
        }else{
            Alert.alert('签到提醒','已签到，无须重复签到')
        }
    }
}
const style=StyleSheet.create({
    headerStyle:{
      backgroundColor: 'orange',
      color:'black',
      fontSize: 15,
      fontWeight:'bold'
    }
})