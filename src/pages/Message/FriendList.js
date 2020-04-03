import React, { Component } from 'react'
import { Text, View,StyleSheet,Dimensions,TouchableOpacity, ScrollView,TextInput,Alert } from 'react-native'
import AIcon from 'react-native-vector-icons/AntDesign'
import FIcon from 'react-native-vector-icons/Entypo'
import { Avatar,Divider,Overlay,Button } from 'react-native-elements'
import {connect} from 'react-redux'

import {searchF,addF,updateRead} from '../../api/index'
import {_getData} from '../../utils/storage'
import {updateUser,getMessages} from '../../redux/actions'

const ScreenWidth=Math.round(Dimensions.get('window').width)
 class FriendList extends Component{
    constructor(props){
        super(props)
        this.state={
            showBox:false,
            searchValue:'',
            searchUser:{}
        }

    }
    handleSearch=async ()=>{
        const {searchValue}=this.state
        if(!searchValue)return
        const result=await searchF(searchValue)
        if(result.code===0){
            this.setState({searchUser:result.data,showBox:true})
        }else{
            Alert.alert('提示信息','无此用户')
        }
    }
    handleAdd=()=>{
        this.setState({showBox:false})
        const {searchUser}=this.state
        addF({ownName:this.props.user.username,addName:searchUser.username}).then(res=>{
            Alert.alert('提示信息',"ok")
            console.log(res.data)
            this.props.updateUser(res.data)
        })
    }
    jumpAndRead=async (user,to)=>{
        this.props.navigation.navigate('chat',{chatId:[user._id,to._id].sort().join('')})
       const result= await updateRead({from:user._id,to:to._id})
       if(result.code===0){
        this.props.getMessages(result.data)
       }
    }
    render(){
        const {navigation,user}=this.props
        const {searchUser,searchValue}=this.state
      return   (
            <View style={{flex:1}}>
                <TouchableOpacity 
                style={{flexDirection:'row',backgroundColor:"#dcdcdc",padding:10}} 
                onPress={()=>navigation.goBack()}>
                    <AIcon name="back" size={30}/>
                    <Text style={{fontSize:16,marginHorizontal:10}}>好友列表</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row',padding:10,justifyContent:'flex-end'}}>
                    <TextInput 
                    onChangeText={(text)=>this.setState({searchValue:text})}
                    value={this.state.searchValue}
                    style={{width:130}} underlineColorAndroid="rgba(255,165,0,.7)" placeholder="请输入用户名称"/>
                    <Button 
                    onPress={this.handleSearch}
                    title="搜索" titleStyle={{color:'black'}} buttonStyle={{backgroundColor:"rgba(255,165,0,.7)"}}/>
                </View>
                <Divider/>
                <ScrollView style={{flex:1}}>
                    {
                        wordArr.map((item,index)=>(
                            <View key={index}>
                                <Text style={{marginVertical:10,paddingHorizontal:20,backgroundColor:'rgba(255,165,0,.7)',fontSize:12}}>{item}</Text>
                                    {user.friends?.filter(f=>f.username.substring(0,1).toUpperCase()===item).map((ff,index)=>(
                                    <TouchableOpacity key={index}
                                    onPress={()=>this.jumpAndRead(user,ff)}
                                    style={{flexDirection:'row',padding:10,paddingLeft:20,borderBottomWidth:1,borderBottomColor:"rgba(0,0,0,.1)"}}>
                                        <Avatar size="small" rounded  onPress={()=>this.setState({showBox:true,searchUser:ff})} />
                                        <Text style={{fontSize:16,marginLeft:10}}>{ff.username}</Text>
                                    </TouchableOpacity>
                                    ))}
                            </View>
                            ))
                    }
                    <Divider />
                    <View  style={{flexDirection:'row',justifyContent:'center',padding:10}}>
                        <FIcon name="list" size={30}/>
                        <Text style={{marginLeft:10,textAlignVertical:'center'}}>共{user.friends?.length||0}位联系人</Text>
                    </View>
                <Overlay
                    overlayStyle={{padding:20}}
                    borderRadius={10}
                    isVisible={this.state.showBox}
                    windowBackgroundColor="rgba(0, 0, 0, .6)"
                    width={ScreenWidth-140}
                    height={370}
                    overlayBackgroundColor="white"
                    onBackdropPress={() => this.setState({ showBox: false })}
                >
                    <View style={{width:"100%",flex:1}}>
                        <Avatar
                            containerStyle={{alignSelf:'center'}}
                            size="large"
                            rounded
                            activeOpacity={0.7}
                            />
                        <Text style={{alignSelf:'center'}}>{searchUser.username}</Text>
                        <Text style={{fontSize:16}}>签名：</Text>
                        <Text style={{flex:3,
                            borderWidth:2,
                            borderRadius:10,padding:5,
                            paddingHorizontal:10,
                            borderColor:"rgba(255,165,0,.7)",
                            marginVertical:5
                        }} >{searchUser.sign}</Text>
                        {!searchValue?<View style={{flexDirection:'row',marginBottom:5,height:40}}>
                            <TextInput underlineColorAndroid="rgba(255,165,0,.7)" style={{flex:2}} placeholder="输入备注名"/>
                            <Button title="备注" buttonStyle={{flex:1,backgroundColor:'gray'}}/>
                        </View>:null}
                        {!searchValue?<Button title="删除好友" onPress={() => this.setState({ showBox: false })}  buttonStyle={{backgroundColor:'gray'}}/>:
                        <Button title="添加好友" onPress={this.handleAdd}  buttonStyle={{backgroundColor:'gray'}}/>
                        }
                    </View>
                </Overlay>
                </ScrollView>
            </View>
        )
    }
}
const wordArr=new Array(26).fill('').map((item,index)=>(String.fromCharCode(index+65)))
export default connect(
    state=>({user:state.user}),
    {updateUser,getMessages}
)(FriendList)