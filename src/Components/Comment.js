import React,{PureComponent} from 'react'
import {StyleSheet, View,Dimensions,TextInput} from 'react-native'
import {Avatar,Text, Icon,Divider,Overlay, Button,Input} from 'react-native-elements'
import Vicon from 'react-native-vector-icons/FontAwesome'

const ScreenWidth=Math.round(Dimensions.get('window').width)

const styles=StyleSheet.create({
    basicSty:{
        borderWidth:2,
        borderRadius:10,
        borderColor:"rgba(192,192,192,.7)",
        margin:10,
        padding:10,
        paddingBottom:2
    },
    containerS:{
        width:ScreenWidth*0.8,
        alignSelf:'flex-end',
        borderWidth:2,
        borderRadius:10,
        borderColor:"rgba(192,192,192,.7)",
        padding:10,
        paddingBottom:0,
        marginVertical:10,
        backgroundColor:"rgba(192,192,192,.2)"
    },
    innerSty:{
        marginBottom:10
    }
})
export default class Comment extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            showBox:false,
            isHeart:false,
            extend:false,
            showCommentBox:false,
            start:0,
            end:0,
            value:''
        }
    }
    handleShow=()=>{
        const {comment}=this.props
        if(comment.res.length===0)return
        const showCommentBoxRe= !this.state.showCommentBox
        const {start}=this.state
        let  newEnd=(comment.res.length-start)>5?(start+5):comment.res.length
        this.setState({showCommentBox:showCommentBoxRe,end:newEnd})
    }
    changeDis=()=>{
        const newExtend= !this.state.extend
        this.setState({extend:newExtend})
    }
    handleForward=()=>{
        const {start,end}=this.state
        const {comment}=this.props
        if(comment.res.length-1-end>0){
            if(comment.res.length-1-end>5){
                this.setState({start:start+5,end:end+5})
                return 
            }
            this.setState({start:start+5,end:comment.res.length})
        }        
    }
    handleBack=()=>{
        const {start,end}=this.state
        if(start-5>=0){
            if(end-start===5){
                this.setState({start:start-5,end:end-5})
                return 
            }
            this.setState({start:start-5,end:start})
        }  
    }
    handleJump=()=>{
        let {start,end,value}=this.state
        value=value*1
        const {comment}=this.props
        const finIndex=Math.ceil(comment.res.length/5)
        if( typeof (value*1)!=='number'||(value*1)<=0||(value*1)>finIndex)return 
        if(value===finIndex){
            this.setState({start:(finIndex-1)*5,end:comment.res.length,value:''})
            return
        }
        this.setState({start:(value-1)*5,end:value*5,value:''})
    }
    render(){
        const {comment}=this.props
        const {start,end,value}=this.state
        return (
            <View style={comment.res?styles.basicSty:styles.innerSty}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Avatar
                            size="small"
                            rounded
                            source={{uri:comment.user.avatar}}
                            activeOpacity={0.7}
                            onPress={()=>this.setState({showBox:true})}
                            />
                        <Text >{comment.user.username}</Text>
                    </View>
                    <View style={{flex:6,justifyContent:'space-between'}}>
                        <View style={{
                            borderWidth:2,
                            borderRadius:10,
                            padding:10,
                            marginBottom:10,
                            borderColor:"rgba(255,165,0,.7)",
                            flex:4,justifyContent:'center'}}>
                            {this.state.extend?<Text onPress={this.changeDis} >{comment.content}</Text>:
                            <Text onPress={this.changeDis}  ellipsizeMode="tail" numberOfLines={3}>{comment.content}</Text>}
                        </View>
                        <View style={{alignItems:'flex-end',justifyContent:'flex-end',flexDirection:'row'}}>
                            {comment.res?
                            <View  style={{flexDirection:'row'}}>
                                <Icon 
                                onPress={this.handleShow}
                                name="comment"
                                size={24}
                                color="rgba(255, 165, 0, 0.7)" 
                                iconStyle={{marginRight:5}}/>
                                <Text style={{alignSelf:'center',marginRight:5}}>{comment.res.length}</Text>
                            </View>:null}
                            {this.state.isHeart?
                            <Vicon 
                            name="heart"
                            size={24}
                            color="rgba(255, 165, 0, 0.7)" 
                            style={{marginRight:5}}
                            onPress={()=>this.setState({isHeart:false})}
                            />:    
                            <Vicon  
                            name="heart-o"
                            size={24}
                            color="rgba(255, 165, 0, 0.7)" 
                            style={{marginRight:5}}
                            onPress={()=>this.setState({isHeart:true})}
                            />}
                            <Text style={{alignSelf:'center',marginRight:5}}>{comment.rate}</Text>
                            <Icon 
                            name="share"
                            size={24}
                            color="rgba(255, 165, 0, 0.7)" 
                            iconStyle={{marginRight:5}}
                            />
                            <Text style={{alignSelf:'center',marginRight:5}}>{comment.share}</Text>
                            <Icon 
                            name="delete"
                            size={24}
                            color="rgba(255, 165, 0, 0.7)" 
                            />
                        </View>
                    </View>
                </View>
                {this.state.showCommentBox?
                <View style={styles.containerS}>
                    {comment.res.slice(start,end).map((item,index)=>(
                        <Comment key={index} comment={item}/>
                    ))}
                    {comment.res.length>5?<View style={{alignSelf:'flex-end',
                        width:260,
                        flexDirection:'row',
                        justifyContent:'space-evenly'}}>
                        <Button
                            onPress={this.handleBack}
                            buttonStyle={{backgroundColor:'rgba(255, 165, 0,0.7)'}}
                            title='上一页'
                        />
                        <Button
                        onPress={this.handleForward}
                        buttonStyle={{backgroundColor:'rgba(255, 165, 0,0.7)'}}
                            title='下一页'
                        />
                        <View style={{alignItems:'center',width:40}}>
                            <TextInput 
                            underlineColorAndroid="orange"
                            placeholder='页码' 
                            maxLength={4}
                            value={value}
                            onChangeText={(value)=>this.setState({value})}
                            />
                        </View>
                        <Button
                        onPress={this.handleJump}
                        buttonStyle={{backgroundColor:'rgba(255, 165, 0,0.7)'}}
                            title='转到'
                        />
                    </View>:null}
                </View>:null}
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