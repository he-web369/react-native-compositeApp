import React, { Component } from 'react'
import { Text, View,StyleSheet,TextInput,TouchableOpacity,Alert } from 'react-native'
import {connect} from 'react-redux'

import {getUser,getMessages} from '../../redux/actions'
import {checkUserName,login,getMsgs} from '../../api/index'
import {_setData} from '../../utils/storage'

 class Login extends Component{
    state={
        time:30,
        showTime:false,
        username:'',
        password:'',
        validateCode:''
    }

    timeOut=()=>{
        if(this.state.time!==30)return
        this.setState({showTime:true})
        this.timer&&clearInterval(this.timer)
        this.timer=setInterval(() => {
            this.setState({time:this.state.time-1})
            if(this.state.time===0){
                this.setState(({showTime:false,time:30}))
                clearInterval(this.timer)
            }
        }, 1000)
    }
    handleLogin=async()=>{
        const {username,password,validateCode}=this.state
        if(username===''||password===''||validateCode===''){
            Alert.alert('提示信息','输入值不能为空')
        }else if(!(/^\w+$/.test(password))||!(/^\w+$/.test(username))){
            Alert.alert('提示信息','密码或用户名格式错误')
        }else if(validateCode!=='1'){
            Alert.alert('提示信息','验证码错误')
        }else{
            const result= await login({username,password,validateCode})
            if(result.code===0){
                _setData("username",username).then(r=>{
                    this.props.getUser(result.data)
                    getMsgs(result.data._id).then(re=>{
                        this.props.getMessages(re.data)
                        this.props.navigation.navigate('profile')
                        this.setState({username:'',password:'',validateCode:''})
                    })
                })
            }else{
                Alert.alert('提示信息',result.msg)
            }
        }
    }
    
    render(){
        const {username,password,validateCode}=this.state
       return  (
            <View>
                <View style={{flexDirection:'row',margin:10,marginTop:50,
                padding:10,borderWidth:2,
                borderRadius:30,
                borderColor:'rgba(255,165,0,.7)'
                }}>
                    <Text style={{textAlignVertical:'center'}}>用户名：</Text>
                    <TextInput 
                    value={username}
                    onChangeText={(text)=>this.setState({username:text})}
                    style={{flex:1}} 
                    maxLength={12} 
                    textContentType="username"
                    placeholder="请输入用户名" underlineColorAndroid="rgba(255,165,0,.7)"/>
                </View>
                <View style={{flexDirection:'row',margin:10,
                padding:10,borderWidth:2,
                borderRadius:30,
                borderColor:'rgba(255,165,0,.7)'
                }}>
                    <Text style={{textAlignVertical:'center'}}>密码：</Text>
                    <TextInput style={{flex:1}} maxLength={16}  placeholder="请输入密码" 
                    textContentType="password"
                    underlineColorAndroid="rgba(255,165,0,.7)"
                    value={password}
                    onChangeText={(text)=>this.setState({password:text})}
                    />
                </View>
                <View style={{flexDirection:'row',margin:10,
                padding:10,borderWidth:2,
                borderRadius:30,
                borderColor:'rgba(255,165,0,.7)'
                }}>
                    <Text style={{textAlignVertical:'center'}}>验证码：</Text>
                    <TextInput style={{flex:1}} maxLength={6}  
                    value={validateCode}
                    onChangeText={(text)=>this.setState({validateCode:text})}
                    placeholder="请输入验证码" 
                    underlineColorAndroid="rgba(255,165,0,.7)"/>
                    <TouchableOpacity onPress={this.timeOut}
                        style={{width:130,backgroundColor:'rgba(0,0,0,.2)',borderWidth:1,borderRadius:25,justifyContent:'center',paddingHorizontal:5}}
                    ><Text style={this.state.showTime?{textAlign:'center',fontSize:12,color:'rgba(0,0,0,.3)'}:{textAlign:'center',fontSize:12}}>
                        {this.state.showTime?this.state.time+"秒后可再次发送":"点击发送验证码"}</Text></TouchableOpacity>
                </View>
                <TouchableOpacity 
                onPress={this.handleLogin}
                style={{margin:10,
                padding:10,borderWidth:2,
                borderRadius:30,
                borderColor:'rgba(255,165,0,.7)'}}>
                    <Text style={{textAlign:'center',fontSize:18}}>登   录</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>this.props.navigation.navigate('logup')}
                style={{margin:10,
                padding:10,borderWidth:2,
                borderRadius:30,
                borderColor:'rgba(255,165,0,.7)'}}>
                    <Text style={{textAlign:'center',fontSize:18}}>注   册</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default connect(
    state=>({}),
    {getUser,getMessages}
)(Login)