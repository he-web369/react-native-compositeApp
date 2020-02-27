import React, { Component } from 'react'
import { Text, View,StyleSheet,Dimensions,TextInput,TouchableOpacity } from 'react-native'

export default class Login extends Component{
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
                    <TextInput style={{flex:1}} maxLength={16}  placeholder="请输入验证码" 
                    underlineColorAndroid="rgba(255,165,0,.7)"/>
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