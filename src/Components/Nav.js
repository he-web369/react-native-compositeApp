/**
 * 头部导航组件
 */

import React,{Component} from 'react'
import { Text, View,StyleSheet,TextInput,Dimensions } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'

const ScreenHeight=Math.round(Dimensions.get('window').height)
export default class Nav extends Component{

    render(){
        let {index}=this.props.navigationState
        return (<View style={style.totalStyle}>
                <View style={style.topStyle}>
                    <Text onPress={this.handlePress} style={style.qrStyle}>&#xe636;</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text onPress={()=>this.handleNavigate('community')} style={index===0?style.decorationStyle:null}>社区</Text>
                        <Text onPress={()=>this.handleNavigate('home')} style={index===1?{
                            marginHorizontal:10,textDecorationLine:'underline',fontSize:20
                            }:{marginHorizontal:10}}>首页</Text>
                        <Text onPress={()=>this.handleNavigate('movies')} style={index===2?style.decorationStyle:null}>电影</Text>
                    </View>
                    <Text 
                    onPress={()=>this.props.navigation.navigate('sign')} 
                    style={style.qrStyle}>&#xe635;</Text>
                </View>
               <TextInput style={style.searchStyle} placeholder="请输入搜索内容"/>
            </View>)
    }
    handleNavigate=(str)=>{
       this.props.navigation.jumpTo(str)
    }
    handlePress=()=>{
        this.props.navigation.navigate('rncamera')
    }
}
 
const style=StyleSheet.create({
    totalStyle:{
        width:'100%',
        height:0.1*ScreenHeight,
        backgroundColor:'orange',
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50,
        alignItems:'center',
        zIndex:5
    },
    searchStyle:{
        height:'60%',
        width:'80%',
        backgroundColor:'white',
        borderRadius:20,
        position:'absolute',
        bottom:'-30%',
        textAlign:'center'
    },
    topStyle:{
        height:'50%',
        width:'90%',
        position:'absolute',
        top:'15%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    qrStyle:{
        fontFamily:'iconfont',
        fontSize:30,
    },
    decorationStyle:{
        textDecorationLine:'underline',
        fontSize:20,
    }
})