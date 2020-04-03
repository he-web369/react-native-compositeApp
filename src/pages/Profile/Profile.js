import React, { Component } from 'react'
import { Text, View ,Alert,TouchableOpacity} from 'react-native'
import { Avatar } from 'react-native-elements'
import AIcon from 'react-native-vector-icons/AntDesign'
import {connect} from 'react-redux'

import {deleteLogin,msgLogOut} from '../../redux/actions'
import {_getData,_removeValue } from '../../utils/storage'

 class Profile extends Component{


    componentDidMount(){
        _getData('username').then(res=>{
            if(!res){
                Alert.alert(
                    "提示信息",
                    "请先登录"
                )
                this.props.navigation.navigate('login')
            }
       })
    }
    goLogin=()=>{
        Alert.alert(
            "提示信息",
            "确定退出吗？",
            [
                {text:'确定',onPress:()=>{
                    _removeValue('username').then(res=>{
                        this.props.deleteLogin()
                        this.props.msgLogOut()
                        this.props.navigation.navigate('login')
                    })
                }},
                {text:'取消',onPress:()=>{},style:'cancel'}
            ]
        )
    }
    render(){
        const {navigation,user}=this.props
       return  (
            <View>
                <View style={{flexDirection:'row',margin:10,marginTop:50,
                padding:20,borderWidth:2,
                borderRadius:30,
                borderColor:'rgba(255,165,0,.7)'
                }}>
                    <Avatar size="large" rounded source={{uri:user.avatarUri}}/>
                    <View style={{padding:10}}>
                        <Text style={{fontSize:16}}>昵称：{user.nickName}</Text>
                        <Text style={{color:'rgba(0,0,0,0.5)'}}>用户名：{user.username}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',margin:10,
                padding:20,borderWidth:2,
                borderRadius:30,
                borderColor:'rgba(255,165,0,.7)'
                }}>
                    <Text>sign：{user.sign}</Text>
                </View>
                <TouchableOpacity 
                    onPress={()=>navigation.navigate('logup')}
                    style={{flexDirection:'row',margin:10,
                    padding:20,borderWidth:2,
                    borderRadius:30,
                    borderColor:'rgba(255,165,0,.7)'}}>
                        <AIcon name="setting" size={24}/>
                        <Text>设置</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={this.goLogin}
                    style={{margin:10,
                    padding:20,borderWidth:2,
                    borderRadius:30,
                    borderColor:'rgba(255,165,0,.7)'}}>
                        <Text style={{textAlign:'center'}}>退   出</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {deleteLogin,msgLogOut}
)(Profile)