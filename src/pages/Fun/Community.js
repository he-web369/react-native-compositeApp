import React, { Component } from 'react'
import { Text,ScrollView, View,StyleSheet,Dimensions,RefreshControl,TouchableOpacity,TextInput } from 'react-native'
import {Divider,ButtonGroup,Button} from 'react-native-elements'
import { connect} from 'react-redux'

import Comment from '../../Components/Comment'
import {toggleRe} from '../../redux/actions'

const sH=Math.round(Dimensions.get('window').height)
const sW=Math.round(Dimensions.get('window').width)

const comments=[
    {
        user:{avatar:'xxx',username:'tom',sign:'12'},
        content:'xxxxadsssssssssssssssssasdccccccccccccccccx664646855555555555555555555555555555555221245444aaa',
        stars:12,
        id:1,
        share:64,
        rate:22,
        res:[
            {
                user:{avatar:'xxx',username:'tom',sign:'12'},
                content:'xxxxadssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssasdccccccccccccccccx664646855555555555555555555555555555555221245444aaa',
                stars:12,
                id:1,
                share:64,
                rate:22
            },
            {
                user:{avatar:'sss',username:'bily',sign:'1aaaswdd2'},
                content:'qqqqqazzz',
                stars:5,
                id:2,
                share:64,
                rate:22
            },
            {
                user:{avatar:'sss',username:'bily',sign:'1aaaswdd2'},
                content:'qqqqqazzz',
                stars:5,
                id:2,
                share:64,
                rate:22
            },
            {
                user:{avatar:'sss',username:'bily',sign:'1aaaswdd2'},
                content:'qqqqqazzz',
                stars:5,
                id:2,
                share:64,
                rate:22
            },
            {
                user:{avatar:'sss',username:'bily',sign:'1aaaswdd2'},
                content:'qqqqqazzz',
                stars:5,
                id:2,
                share:64,
                rate:22
            },
            {
                user:{avatar:'sss',username:'bily',sign:'1aaaswdd2'},
                content:'qqqqqazzz',
                stars:5,
                id:2,
                share:64,
                rate:22
            },
            {
                user:{avatar:'sss',username:'bily',sign:'1aaaswdd2'},
                content:'qqqqqazzz',
                stars:5,
                id:2,
                share:64,
                rate:22
            },
            {
                user:{avatar:'sss',username:'bily',sign:'1aaaswdd2'},
                content:'qqqqqazzz',
                stars:5,
                id:2,
                share:64,
                rate:22
            },
            {
                user:{avatar:'sss',username:'bily',sign:'1aaaswdd2'},
                content:'qqqqqazzz',
                stars:5,
                id:2,
                share:64,
                rate:22
            }
        ]
    },
    {
        user:{avatar:'sss',username:'bily',sign:'1aaaswdd2'},
        content:'qqqqqazzz',
        stars:5,
        id:2,
        share:64,
        rate:22,
        res:[]
    }
]
class Com extends Component{

    constructor(props){
        super(props)
        this.state={
            outBtnIdx:0,
            inBtnIdx:0,
            extend:false,
        }
    }
    changeDis=()=>{
        const newExtend= !this.state.extend
        this.setState({extend:newExtend})
    }
    handleRe=()=>{
        this.props.toggleRe(true)
        setTimeout(() => {
            this.props.toggleRe(false)
        }, 200)
    }
    scr=()=>{
        this.scRef.scrollTo({x: 0, y: 0, animated: true})
    }
    render(){
        const {outBtnIdx,inBtnIdx}=this.state
        const {refresh}=this.props
        return  (
            <ScrollView 
                ref={f=>this.scRef=f}
            style={{marginTop:sH*0.03}}
                refreshControl= {<RefreshControl
                        refreshing={refresh}
                        onRefresh={this.handleRe}
                        colors={['orange']}
                    />}
                >
                <View>
                    <View style={{flexDirection:'row',alignItems:'center',padding:10}}>
                        <Text>社区公告：</Text>
                        <View style={{
                            flex:1,
                            borderWidth:2,
                            borderRadius:10,
                            padding:10,
                            borderColor:"rgba(255,165,0,.7)",
                            justifyContent:'center'}}>
                            {this.state.extend?<Text onPress={this.changeDis} >44444444444444</Text>:
                            <Text onPress={this.changeDis}  ellipsizeMode="tail" numberOfLines={3}>aaaaaaaaaaaaaa</Text>}
                        </View>
                    </View>
                    <Divider/>
                    <View style={{flexDirection:'row',
                    padding:10,
                    justifyContent:'flex-end',
                    borderWidth:2,
                    borderRadius:10,
                    borderColor:"rgba(255,165,0,.7)",
                    margin:10,
                    }}>
                        <TextInput 
                        style={{flex:1}}
                        multiline
                        underlineColorAndroid="rgb(255,165,0)"
                        placeholder="请输入内容"/>
                        <TouchableOpacity 
                        style={{justifyContent:'center',
                        borderWidth:1,borderRadius:10,padding:5,
                        alignItems:'center',
                        backgroundColor:'rgba(255,165,0,.4)',
                        height:40,
                        alignSelf:'flex-end'
                        }}>
                            <Text >发送新帖</Text>
                        </TouchableOpacity>
                    </View>
                    <Divider/>
                    <ButtonGroup 
                    selectedButtonStyle={{backgroundColor:'rgba(255,165,0,0.7)'}}
                    onPress={(index)=>this.setState({outBtnIdx:index})}
                    selectedIndex={outBtnIdx}
                    buttons={['综合','电影','汽车']}/>
                    <Divider/>
                    <ButtonGroup 
                    containerStyle={{height: 30}}
                    selectedButtonStyle={{backgroundColor:'rgba(255,165,0,0.7)'}}
                    onPress={(index)=>this.setState({inBtnIdx:index})}
                    selectedIndex={inBtnIdx}
                    buttons={['最新','点赞','评论',"转发"]}/>
                </View>
                {
                    comments.map((comment,index)=>(
                        <Comment key={index} comment={comment}/>
                    ))
                }
                <View style={{width:220,flexDirection:'row',justifyContent:'space-evenly',alignSelf:'flex-end'}}>
                    <Button onPress={this.handleRe} title="继续加载" buttonStyle={{backgroundColor:'rgba(255, 165, 0,0.7)'}}/>
                    <Button onPress={this.scr} title="回到顶部" buttonStyle={{backgroundColor:'rgba(255, 165, 0,0.7)'}}/>
                </View>
            </ScrollView>
        )
    }
}

export default  connect(
    state=>({refresh:state.refresh}),
    {toggleRe}
)(Com)