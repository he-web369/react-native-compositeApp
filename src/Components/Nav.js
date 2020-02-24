/**
 * 头部导航组件
 */

import React,{Component} from 'react'
import { TouchableOpacity,Text, View,StyleSheet,TextInput,Dimensions } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import {connect} from 'react-redux'

import {getMoviesDataApi} from '../api/index'
import {toggleRe,resetMov} from '../redux/actions'

const ScreenHeight=Math.round(Dimensions.get('window').height)
class Nav extends Component{

    state={
        inputVal:''
    }
    handleIn=(text)=>{
        this.setState({inputVal:text})
    }
    subMit= async (index)=>{
        this.props.toggleRe(true)
        const name=this.state.inputVal
        if(index===2&&this.state.inputVal!==''){
            let data=[]
            for (let index = 0; index < 300; index+=100) {
                const result =await getMoviesDataApi(index,250)
                result.subjects.forEach(item=>{
                    if(item.title.includes(name)||name.includes(item.title)){
                        data.push(item)
                        return
                    }
                    item.casts.forEach(actor=>{
                        if(actor.name.includes(name)||name.includes(actor.name)){
                            data.push(item)
                            return 
                        }
                    })
                    if(item.directors[0].name.includes(name)||name.includes(item.directors[0].name)){
                        data.push(item)
                        return 
                    }
                    item.genres.forEach(gen=>{
                        if(gen.includes(name)||name.includes(gen)){
                            data.push(item)
                            return 
                        }
                    })
                    if(item.year===name){
                        data.push(item)
                        return 
                    }
                    if(typeof (name*1)==='number'){
                        if(item.rating.average>new Number(name)){
                            data.push(item)
                            return 
                        }
                    }
                })
            }
            this.props.resetMov(data)
            this.props.toggleRe(false)
        }
        this.setState({inputVal:''})
    }
    render(){
        let {index}=this.props.navigationState
        const {isRefresh}=this.props
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
                <View style={style.inputContainer}>
                    <TextInput value={this.state.inputVal} onChangeText={this.handleIn} style={style.searchStyle} placeholder="请输入搜索内容"/>
                    <TouchableOpacity onPress={()=>this.subMit(index)} style={style.buttonStyle}>
                        {isRefresh?<Text style={{fontSize:12}}>链接中</Text>:
                            <Text style={{fontFamily:'iconfont',fontSize:25}}>&#xe65a;</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>)
    }
    handleNavigate=(str)=>{
       this.props.navigation.jumpTo(str)
    }
    handlePress=()=>{
        this.props.navigation.navigate('rncamera')
    }
}
export default connect(
    state=>({isRefresh:state.refresh}),
    {resetMov,toggleRe}
)(Nav)
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
    inputContainer:{
        height:'50%',
        width:'80%',
        backgroundColor:'white',
        borderRadius:30,
        position:'absolute',
        bottom:'-25%',
    },
    searchStyle:{
        height:'100%',
        width:'60%',
        textAlign:'center',
        alignSelf:'center'
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
    },
    buttonStyle:{
        width:60,
        height:"80%",
        borderRadius:5,
        backgroundColor:'orange',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        top:'10%',
        left:'80%'
    }
})