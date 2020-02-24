import React,{PureComponent} from 'react'
import { View,Dimensions} from 'react-native'
import {Avatar,Text, Icon,Divider,Overlay, Button} from 'react-native-elements'

const ScreenWidth=Math.round(Dimensions.get('window').width)

export default class Comment extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            showBox:false
        }
    }
    render(){
        const {comment}=this.props
        return (
            <View>
                <View style={{flexDirection:'row',minHeight:100,padding:10,paddingBottom:2}}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Avatar
                            size="small"
                            rounded
                            source={{uri:comment.user.avatar}}
                            activeOpacity={0.7}
                            onPress={()=>this.setState({showBox:true})}
                            containerStyle={{marginTop:5}}
                            />
                        <Text >{comment.user.username}</Text>
                    </View>
                    <View style={{flex:5,justifyContent:'space-between'}}>
                        <View style={{flex:4,justifyContent:'center'}}>
                            <Text style={{
                                flex:1,borderWidth:2,
                                borderRadius:10,padding:5,
                                paddingHorizontal:10,
                                borderColor:"rgba(255,165,0,.7)"}}>{comment.content}</Text>
                        </View>
                        <View style={{alignItems:'flex-end',justifyContent:'flex-end',flexDirection:'row'}}>
                            <Icon 
                            name="comment"
                            size={24}
                            color="rgba(255, 165, 0, 0.7)" 
                            iconStyle={{marginRight:5}}
                            />
                            <Icon 
                            name="beenhere"
                            size={24}
                            color="rgba(255, 165, 0, 0.7)" 
                            iconStyle={{marginRight:5}}
                            />
                            <Icon 
                            name="delete"
                            size={24}
                            color="rgba(255, 165, 0, 0.7)" 
                            iconStyle={{marginRight:5}}
                            />
                        </View>
                    </View>
                </View>
                <Divider/>
                <Overlay
                    borderRadius={10}
                    isVisible={this.state.showBox}
                    windowBackgroundColor="rgba(0, 0, 0, .6)"
                    width={ScreenWidth-140}
                    height={370}
                    overlayBackgroundColor="rgba(255, 165, 0, .8)"
                    onBackdropPress={() => this.setState({ showBox: false })}
                >
                    <View style={{width:"100%",flex:1}}>
                        <Avatar
                            containerStyle={{alignSelf:'center'}}
                            size="large"
                            rounded
                            source={{uri:comment.user.avatar}}
                            activeOpacity={0.7}
                            />
                        <Text style={{alignSelf:'center'}}>{comment.user.username}</Text>
                        <Text style={{fontSize:16}}>签名:</Text>
                        <Text style={{flex:2,
                            borderWidth:2,
                            borderRadius:10,padding:5,
                            paddingHorizontal:10,
                            borderColor:"rgba(255,165,0,.7)",
                            marginVertical:10
                        }} >{comment.user.sign}</Text>
                        <Button title="添加好友" buttonStyle={{marginBottom:10,backgroundColor:'gray'}}/>
                        <Button title="返回" onPress={() => this.setState({ showBox: false })}  buttonStyle={{backgroundColor:'gray'}}/>
                    </View>
                </Overlay>

               
            </View>
        )
    }
}