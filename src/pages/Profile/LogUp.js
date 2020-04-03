import React, { Component } from 'react'
import { Text, View,StyleSheet, TextInput,TouchableOpacity,Alert } from 'react-native'
import { Avatar, Button } from 'react-native-elements'
import ImagePicker from 'react-native-image-picker'
import {connect} from 'react-redux'

import {getUser} from '../../redux/actions'
import { logUp,checkUserName,updateUser} from '../../api/index'
import {_setData} from '../../utils/storage'

 class LogUp extends Component{
    state={
        avatarUri:null,
        username:'',
        password:'',
        sign:'',
        nickName:''
    }
    componentDidMount(){
        if(this.props.user.username){
            const {username,sign,nickName}=this.props.user
            this.setState({username,sign,nickName})
        }
    }
    choiceAvatar=()=>{
        ImagePicker.showImagePicker({
            title:'选择一张照片',
            cancelButtonTitle:"取消",
            takePhotoButtonTitle:"相机",
            chooseFromLibraryButtonTitle:"本地文件库",
            cameraType: 'back',
            mediaType: 'photo',
            allowsEditing: false, 
            noData: false,
            storageOptions: {
                skipBackup: true,
                waitUntilSaved:true
            }
        },(response)=>{
            if (response.didCancel) {
                console.info('User cancelled photo picker')
              } else if (response.error) {
                console.info('ImagePicker Error: ', response.error)
              } else {
                this.setState({avatarUri:response.uri})
            }
        })
    }
    checkUserName=async ()=>{
        const {username}=this.state
        if(!(/^\w+$/.test(username))){
            Alert.alert('提示信息','用户名格式错误')
            return false
        }else if(!this.props.user.username||username!==this.props.user.username){
           const result=await checkUserName(username)
           if(result.code===1){
            Alert.alert('提示信息',result.msg)
            this.setState({username:''})
            return false
           }
           return true
        }
    }
    handleLogup=async()=>{
        const {username,password,sign,nickName}=this.state
        if(username===''||password===''){
            Alert.alert('提示信息','输入值不能为空')
        }else if(!(/^\w+$/.test(password))){
            Alert.alert('提示信息','密码或用户名格式错误')
        }else {
            const result=await logUp({username,password,sign,nickName})
            if(result.code===0){
                _setData("username",username).then(res=>{
                    this.props.getUser(result.data)
                    this.props.navigation.navigate('detailProfile')
                })
            }
        }
    }
    hadleUpdate=async ()=>{
        const {username,sign,nickName}=this.state
        const result=await updateUser({_id:this.props.user._id,username,sign,nickName})
        if(result.code===0){
            _setData("username",username).then(res=>{
                this.props.getUser(result.data)
                this.props.navigation.navigate('detailProfile')
            })
        }
    }
    render(){
        const {username,password,sign,nickName,avatarUri}=this.state
        const {user}=this.props
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
                     placeholder="请输入用户名" 
                     onBlur={this.checkUserName}
                     value={username}
                     onChangeText={(text)=>this.setState({username:text})}
                     underlineColorAndroid="rgba(255,165,0,.7)"/>
                </View>
                 <View style={{flexDirection:'row',margin:10,
                padding:10,borderWidth:2,
                borderRadius:30,
                borderColor:'rgba(255,165,0,.7)'
                }}>
                    <Text style={{textAlignVertical:'center'}}>昵称：</Text>
                    <TextInput style={{flex:1}} maxLength={12} 
                    textContentType="username"
                     placeholder="请输入昵称" 
                     value={nickName}
                     onChangeText={(text)=>this.setState({nickName:text})}
                     underlineColorAndroid="rgba(255,165,0,.7)"/>
                </View>
                {!user.username&&<View style={{flexDirection:'row',margin:10,
                        padding:10,borderWidth:2,
                        borderRadius:30,
                        borderColor:'rgba(255,165,0,.7)'
                        }}>
                            <Text style={{textAlignVertical:'center'}}>密码：</Text>
                            <TextInput style={{flex:1}} maxLength={16}  placeholder="请输入密码" 
                            textContentType="password"
                            value={password}
                            onChangeText={(text)=>this.setState({password:text})}
                            underlineColorAndroid="rgba(255,165,0,.7)"/>
                        </View>}
                <View style={{flexDirection:'row',margin:10,
                padding:10,borderWidth:2,
                borderRadius:30,
                borderColor:'rgba(255,165,0,.7)'
                }}>
                    <Text style={{textAlignVertical:'center'}}>签名：</Text>
                    <TextInput style={{flex:1}} maxLength={16}  placeholder="请输入签名" 
                    value={sign}
                    onChangeText={(text)=>this.setState({sign:text})}
                    underlineColorAndroid="rgba(255,165,0,.7)"/>
                </View>
                <View style={{flexDirection:'row',margin:10,
                padding:10,borderWidth:2,
                borderRadius:30,
                borderColor:'rgba(255,165,0,.7)'
                }}>
                    <Text style={{textAlignVertical:'center'}}>头像：</Text>
                    <Avatar size="medium" rounded source={{uri:avatarUri}}/>
                    <View style={{flex:1,alignItems:'flex-end'}}>
                        <Button onPress={this.choiceAvatar} title="选择头像" titleStyle={{fontSize:14,color:'rgba(0,0,0,.7)'}} 
                        buttonStyle={{borderRadius:20,backgroundColor:'rgba(255,165,0,.7)'}}/>
                    </View>
                </View>
                {user.username?
                    <TouchableOpacity 
                    onPress={this.hadleUpdate}
                    style={{margin:10,
                    padding:10,borderWidth:2,
                    borderRadius:30,
                    borderColor:'rgba(255,165,0,.7)'}}>
                        <Text style={{textAlign:'center',fontSize:18}}>更   新</Text>
                    </TouchableOpacity>:
                    <TouchableOpacity 
                    onPress={this.handleLogup}
                    style={{margin:10,
                    padding:10,borderWidth:2,
                    borderRadius:30,
                    borderColor:'rgba(255,165,0,.7)'}}>
                        <Text style={{textAlign:'center',fontSize:18}}>注   册</Text>
                    </TouchableOpacity>
                }
                {
                    user.username?
                    <TouchableOpacity 
                    onPress={()=>this.props.navigation.goBack()}
                    style={{margin:10,
                    padding:10,borderWidth:2,
                    borderRadius:30,
                    borderColor:'rgba(255,165,0,.7)'}}>
                        <Text style={{textAlign:'center',fontSize:18}}>返   回</Text>
                    </TouchableOpacity>:
                    <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('login')}
                        style={{margin:10,
                        padding:10,borderWidth:2,
                        borderRadius:30,
                        borderColor:'rgba(255,165,0,.7)'}}>
                            <Text style={{textAlign:'center',fontSize:18}}>去登录页</Text>
                        </TouchableOpacity>
                }
            </View>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {getUser}
)(LogUp)