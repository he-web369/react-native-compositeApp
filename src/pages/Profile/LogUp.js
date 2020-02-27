import React, { Component } from 'react'
import { Text, View,StyleSheet,Dimensions, TextInput,TouchableOpacity } from 'react-native'
import { Avatar, Button } from 'react-native-elements'
import ImagePicker from 'react-native-image-picker'

export default class LogUp extends Component{
    state={
        avatarUri:''
    }

    choiceAvatar=()=>{
        ImagePicker.showImagePicker({
            title:'选择一张照片',
            cancelButtonTitle:"取消",
            takePhotoButtonTitle:"相机",
            chooseFromLibraryButtonTitle:"本地文件库",
        },res=>{
            console.log(res.data)
        })
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
                    <Text style={{textAlignVertical:'center'}}>签名：</Text>
                    <TextInput style={{flex:1}} maxLength={16}  placeholder="请输入签名" 
                    underlineColorAndroid="rgba(255,165,0,.7)"/>
                </View>
                <View style={{flexDirection:'row',margin:10,
                padding:10,borderWidth:2,
                borderRadius:30,
                borderColor:'rgba(255,165,0,.7)'
                }}>
                    <Text style={{textAlignVertical:'center'}}>头像：</Text>
                    <Avatar size="medium" rounded />
                    <View style={{flex:1,alignItems:'flex-end'}}>
                        <Button onPress={this.choiceAvatar} title="选择头像" titleStyle={{fontSize:14,color:'rgba(0,0,0,.7)'}} 
                        buttonStyle={{borderRadius:20,backgroundColor:'rgba(255,165,0,.7)'}}/>
                    </View>
                </View>
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