import React, { Component } from 'react'
import { Text, View,StyleSheet,Dimensions,TextInput,TouchableOpacity } from 'react-native'

export default class Login extends Component{
    state={
        time:30,
        showTime:false
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
    render(){
       return  (
            <View>
                <View style={{flexDirection:'row',margin:10,marginTop:50,
                padding:10,borderWidth:2,
                borderRadius:30,
                borderColor:'rgba(255,165,0,.7)'
                }}>
                    <Text style={{textAlignVertical:'center'}}>用户名：</Text>
                    <TextInput style={{flex:1}} maxLength={12} 
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
                    underlineColorAndroid="rgba(255,165,0,.7)"/>
                </View>
                <View style={{flexDirection:'row',margin:10,
                padding:10,borderWidth:2,
                borderRadius:30,
                borderColor:'rgba(255,165,0,.7)'
                }}>
                    <Text style={{textAlignVertical:'center'}}>验证码：</Text>
                    <TextInput style={{flex:1}} maxLength={6}  placeholder="请输入验证码" 
                    underlineColorAndroid="rgba(255,165,0,.7)"/>
                    <TouchableOpacity onPress={this.timeOut}
                        style={{width:130,backgroundColor:'rgba(0,0,0,.2)',borderWidth:1,borderRadius:25,justifyContent:'center',paddingHorizontal:5}}
                    ><Text style={this.state.showTime?{textAlign:'center',fontSize:12,color:'rgba(0,0,0,.3)'}:{textAlign:'center',fontSize:12}}>
                        {this.state.showTime?this.state.time+"秒后可再次发送":"点击发送验证码"}</Text></TouchableOpacity>
                </View>
                <TouchableOpacity style={{margin:10,
                padding:10,borderWidth:2,
                borderRadius:30,
                borderColor:'rgba(255,165,0,.7)'}}>
                    <Text style={{textAlign:'center',fontSize:18}}>登   录</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{margin:10,
                padding:10,borderWidth:2,
                borderRadius:30,
                borderColor:'rgba(255,165,0,.7)'}}>
                    <Text style={{textAlign:'center',fontSize:18}}>注   册</Text>
                </TouchableOpacity>
            </View>
        )
    }
}