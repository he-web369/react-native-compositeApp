import React, { Component } from 'react'
import { Text, View,StyleSheet,Dimensions,TouchableOpacity, ScrollView,TextInput } from 'react-native'
import AIcon from 'react-native-vector-icons/AntDesign'
import FIcon from 'react-native-vector-icons/Entypo'
import { Avatar,Divider,Overlay,Button } from 'react-native-elements'

const ScreenWidth=Math.round(Dimensions.get('window').width)
export default class FriendList extends Component{
    constructor(props){
        super(props)
        this.state={
            showBox:false
        }

    }
    render(){
        const {navigation}=this.props
      return   (
            <View>
                <TouchableOpacity 
                style={{flexDirection:'row',backgroundColor:"#dcdcdc",padding:10}} 
                onPress={()=>navigation.goBack()}>
                    <AIcon name="back" size={30}/>
                    <Text style={{fontSize:16,marginHorizontal:10}}>好友列表</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row',padding:10,justifyContent:'flex-end'}}>
                    <TextInput style={{width:130}} underlineColorAndroid="rgba(255,165,0,.7)" placeholder="请输入用户名称"/>
                    <Button title="搜索" titleStyle={{color:'black'}} buttonStyle={{backgroundColor:"rgba(255,165,0,.7)"}}/>
                </View>
                <Divider/>
                <ScrollView style={{marginBottom:50}}>
                    {
                        wordArr.map((item,index)=>(
                            <View key={index}>
                                <Text style={{paddingHorizontal:20,backgroundColor:'rgba(255,165,0,.7)',fontSize:12}}>{item}</Text>
                                <TouchableOpacity 
                                onPress={()=>this.setState({showBox:true})} 
                                style={{flexDirection:'row',padding:10,paddingLeft:20,borderBottomWidth:1,borderBottomColor:"rgba(0,0,0,.1)"}}>
                                    <Avatar size="small" rounded/>
                                    <Text style={{fontSize:16,marginLeft:10}}>12</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                 
                                style={{flexDirection:'row',padding:10,paddingLeft:20,borderBottomWidth:1,borderBottomColor:'rgba(245,245,245,.7)'}}>
                                    <Avatar onPress={()=>this.setState({showBox:true})} size="small" rounded/>
                                    <Text style={{fontSize:16,marginLeft:10}}>12</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                    <Divider />
                    <View  style={{flexDirection:'row',justifyContent:'center',padding:10}}>
                        <FIcon name="list" size={30}/>
                        <Text style={{marginLeft:10,textAlignVertical:'center'}}>共52位联系人</Text>
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
                        <Text style={{alignSelf:'center'}}>user.username</Text>
                        <Text style={{fontSize:16}}>签名:</Text>
                        <Text style={{flex:3,
                            borderWidth:2,
                            borderRadius:10,padding:5,
                            paddingHorizontal:10,
                            borderColor:"rgba(255,165,0,.7)",
                            marginVertical:5
                        }} >user.sign</Text>
                        <View style={{flexDirection:'row',marginBottom:5,height:40}}>
                            <TextInput underlineColorAndroid="rgba(255,165,0,.7)" style={{flex:2}} placeholder="输入备注名"/>
                            <Button title="备注" buttonStyle={{flex:1,backgroundColor:'gray'}}/>
                        </View>
                        <Button title="删除好友" onPress={() => this.setState({ showBox: false })}  buttonStyle={{backgroundColor:'gray'}}/>
                    </View>
                </Overlay>
                </ScrollView>
            </View>
        )
    }
}
const wordArr=new Array(26).fill('').map((item,index)=>(String.fromCharCode(index+65)))