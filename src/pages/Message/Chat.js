import React, { PureComponent } from 'react'
import { Text, View,StyleSheet,Dimensions, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import AIcon from 'react-native-vector-icons/AntDesign'
import { Avatar,Overlay,Button } from 'react-native-elements'
import {connect } from 'react-redux'

import {updateMessages} from '../../redux/actions'

const ScreenWidth=Math.round(Dimensions.get('window').width)
 class Chat extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            showBox:false,
            value:''
        }

    }
    
    sendMsg=()=>{
        const {value}=this.state
        const {user }=this.props
        const {chatId }=this.props.route.params
        const from=user._id
        let to=null
        if(user.friends){
             to=user.friends.find(item=>chatId.includes(item._id))._id
        }
        if(!value)return
        const ws=new WebSocket("ws://192.168.0.101:5001")
        ws.onopen=()=>{
            const str=`${from},${to},${value}`
            ws.send(str)
            this.setState({value:''})
            this.scRef.scrollToEnd()
        }
        ws.onmessage=(e)=>{
           this.props.updateMessages(JSON.parse(e.data))
           ws.close()
        }
    }

    render(){
        const {navigation,messages,user}=this.props
        const {value}=this.state
        if(!this.props.route.params){
            this.props.route.params={}
        }
        const {chatId }=this.props.route.params
        let msgDetail=null
        let to=null
        if(user.friends){
            msgDetail=messages.filter(item=>item.chat_id===chatId)
            to=user.friends.find(item=>chatId.includes(item._id))
        }
      return   (
          <View style={{flex:1}}>
          {user.username?
            <View style={{flex:1}}>
                <TouchableOpacity 
                style={{flexDirection:'row',backgroundColor:"#dcdcdc",padding:10,marginBottom:20}} 
                onPress={()=>navigation.goBack()}>
                    <AIcon name="back" size={30}/>
                    <Text style={{fontSize:16,marginHorizontal:10}}>{to.username}</Text>
                </TouchableOpacity>
                <ScrollView ref={f=>this.scRef=f} style={{marginBottom:50}}>
                    {msgDetail?msgDetail.sort((a,b)=>a.date-b.date).map((msg,index)=>{
                        if(msg.from===user._id){
                            return (
                                <View key={index} style={{flexDirection:'row',justifyContent:'flex-end',paddingHorizontal:10,marginBottom:10,alignItems:'center'}}>
                                    <Text style={{
                                        marginRight:10,marginLeft:80,
                                        backgroundColor:'rgba(255,165,0,.7)',
                                        borderRadius:10,
                                        padding:10,
                                        textAlignVertical:'center'
                                        }}>{msg.message}</Text>
                                    <Avatar rounded size="small" />
                                </View>
                            )
                        }else{
                            return (
                                <View  key={index} style={{flexDirection:'row',justifyContent:'flex-start',paddingHorizontal:10,marginBottom:10,alignItems:'center'}}>
                                    <Avatar rounded size="small" onPress={()=>this.setState({showBox:true})}/>
                                    <Text style={{marginLeft:10,marginRight:80,
                                                borderWidth:1,
                                                borderColor:'rgba(255,165,0,.7)',
                                                borderRadius:10,
                                                padding:10,
                                                textAlignVertical:'center'
                                    }}>{msg.message}</Text>
                                </View>
                            )
                        }
                    }):null}
                </ScrollView>
                <View style={{flexDirection:'row',height:50,
                position:'absolute',bottom:0,
                padding:5,
                justifyContent:'flex-end'
                }}>
                    <TextInput 
                    value={value}
                    onChangeText={(text)=>this.setState({value:text})}
                    style={{width:"80%"}}
                    underlineColorAndroid="rgb(255,165,0)"
                     placeholder="请输入内容"/>
                    <TouchableOpacity 
                    onPress={this.sendMsg}
                    style={{justifyContent:'center',
                    borderWidth:1,borderRadius:10,padding:5,
                    width:70,
                    alignItems:'center',
                    backgroundColor:'rgba(255,165,0,.4)'
                    }}>
                        <Text >发送</Text>
                    </TouchableOpacity>
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
                        <Text style={{alignSelf:'center'}}>{to.username}</Text>
                        <Text style={{fontSize:16}}>签名:</Text>
                        <Text style={{flex:3,
                            borderWidth:2,
                            borderRadius:10,padding:5,
                            paddingHorizontal:10,
                            borderColor:"rgba(255,165,0,.7)",
                            marginVertical:5
                        }} >{to.sign}</Text>
                        <View style={{flexDirection:'row',marginBottom:5,height:40}}>
                            <TextInput underlineColorAndroid="rgba(255,165,0,.7)" style={{flex:2}} placeholder="输入备注名"/>
                            <Button title="备注" buttonStyle={{flex:1,backgroundColor:'gray'}}/>
                        </View>
                        <Button title="删除好友" onPress={() => this.setState({ showBox: false })}  buttonStyle={{backgroundColor:'gray'}}/>
                    </View>
                </Overlay>
            </View>:<Text></Text>}  
            </View>
        )
    }
}

export default connect(
    state=>({messages:state.messages,user:state.user}),
    {updateMessages}
)(Chat)