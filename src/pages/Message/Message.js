import React, { PureComponent } from 'react'
import { Text, View,StyleSheet,Dimensions, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import FIcon from 'react-native-vector-icons/FontAwesome5'
import AIcon from 'react-native-vector-icons/AntDesign'
import { Avatar } from 'react-native-elements'
import {connect} from 'react-redux'

import {getMessages} from '../../redux/actions'
import {getMsgs,updateRead} from '../../api/index'

 class Message extends PureComponent{

    async componentDidMount(){
        if(!this.props.user.username){
            this.props.navigation.navigate('profile')
        }else {
            const result =await getMsgs(this.props.user._id)
            this.props.getMessages(result.data)
        }
    }
    jumpAndRead=async (chatId)=>{
        this.props.navigation.navigate('chat',{chatId})
        let to=null
        if(this.props.user.friends){
             to=this.props.user.friends.find(item=>chatId.includes(item._id))._id
        }
       const result= await updateRead({from:this.props.user._id,to})
       if(result.code===0){
           this.props.getMessages(result.data)
       }
    }
    render(){
        const {navigation,messages,user}=this.props
        let msgOBj={}
        messages.forEach(item=>{
            if(!msgOBj[item.chat_id]){
                msgOBj[item.chat_id]=[item]
            }else{
                msgOBj[item.chat_id].push(item)
            }
        })
      return   (
            <View>
                <View style={{backgroundColor:'#dcdcdc',flexDirection:'row',padding:10,justifyContent:'flex-end'}}>
                    <TextInput 
                    style={{width:80,marginHorizontal:5,marginTop:-10}}
                    underlineColorAndroid="rgba(255,165,0,.5)"
                    placeholder="搜索好友"/>
                    <AIcon name="search1" size={30} />
                    <AIcon name="addusergroup" size={30} style={{paddingHorizontal:15}}
                    onPress={()=>navigation.navigate('msgstacklist')}
                    />
                </View>
                <ScrollView >
                    {Object.keys(msgOBj).length?
                    Object.keys(msgOBj).map((chatId,index)=>(
                            <TouchableOpacity 
                            onPress={()=>this.jumpAndRead(chatId)}
                            key={index}
                            style={{
                            padding:15,
                            flexDirection:'row',
                            borderBottomWidth:1,
                            borderBottomColor:'rgba(255,165,0,.5)'
                            }}>
                            <Avatar  size="medium" rounded/>
                            <View
                                style={{
                                position: 'absolute',
                                top: 6,
                                left:50,
                                backgroundColor: 'red',
                                borderRadius: 10,
                                width: 20,
                                height: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                }}
                            >
                                <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
                                {msgOBj[chatId].reduce((count,item)=>{
                                    if(item.to===user._id&&!item.isRead){
                                            count++
                                    }
                                    return count
                                },0)}
                                </Text>
                                </View>
                            <View style={{flex:2,marginHorizontal:10}}>
                                <Text style={{fontSize:17}}>{user.friends.find(item=>chatId.includes(item._id))?user.friends.find(item=>chatId.includes(item._id)).username:null}</Text>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={{color:'gray'}}>
                                    {msgOBj[chatId].sort((a,b)=>a.date-b.date)[msgOBj[chatId].length-1].message}
                                </Text>
                            </View>
                            <Text style={{color:'gray'}} >{
                              new Date(msgOBj[chatId].sort((a,b)=>a.date-b.date)[msgOBj[chatId].length-1].date).getHours()
                            }:{
                                new Date(msgOBj[chatId].sort((a,b)=>a.date-b.date)[msgOBj[chatId].length-1].date).getMinutes()
                            }</Text>
                        </TouchableOpacity>
                        )):null
                    }
                </ScrollView>
            </View>
        )
    }
}
export default connect(
    state=>({messages:state.messages,user:state.user}),
    {getMessages}
)(Message)