import React, { Component,PureComponent } from 'react'
import {SectionList,Animated,Dimensions, ScrollView,Text, View,StyleSheet,TouchableOpacity,ProgressBarAndroid  } from 'react-native'
import Video from 'react-native-video'
import {captureRef} from 'react-native-view-shot'

import MyBackButton from '../../Components/useNavigationButton'
import { Easing } from 'react-native-reanimated'
const ScreenWidth=Math.round(Dimensions.get('window').width)
export default class Play extends PureComponent{

    constructor(props){
        super(props)
        this.state={
            paused:true,
            loading:true,
            full:false,
            currentTime:"00:00:00",
            totalTime:"00:00:00",
            progress:0,
            bufferProgress:0,
            repeat:false,
            rate:1,
            volume:0.5,
            showVolumeBtn:false,
            fadeAnim:new Animated.Value(0),
            changeSpeed:false
        }
    }
    outSty=() => {
        Animated.timing(                  
            this.state.fadeAnim,                       
          {
            toValue: 0,                  
            duration: 10000, 
            easing: Easing.linear()          
          }
        ).start()                      
    }
    inSty=() => {
        Animated.timing(                  
            this.state.fadeAnim,                       
          {
            toValue: 1,                  
            duration: 10000,
            easing: Easing.linear()                  
          }
        ).start()                      
    }
    playVideo=()=>{
        this.setState({
            paused:false
        })
    }
    toggleVideo=()=>{
        const paused=!this.state.paused
        this.setState({
            paused
        })
    }
    togggleFull=()=>{
        const full=!this.state.full
        this.setState({
            full
        })
    }
    toggleRepeat=()=>{
        const repeat=!this.state.repeat
        this.setState({
            repeat
        })
    }
    handleProgress=(e)=>{
        const {currentTime,playableDuration,seekableDuration}=e
        this.setState({
            currentTime:this.transFromTime(currentTime),
            totalTime:this.transFromTime(seekableDuration),
            progress:currentTime/seekableDuration,
            bufferProgress:playableDuration/seekableDuration
        })
    }
    handleLoad=(e)=>{
        const {currentTime,duration}=e
        this.setState({
            currentTime:this.transFromTime(currentTime),
            totalTime:this.transFromTime(duration),
            loading:false
        })
    }
    transFromTime=(time)=>{
        let hours=Math.floor(time/3600)
        let minutes=Math.floor(time%3600/60)
        let seconds=Math.floor(time%3600%60)
        function ti(number){
           return  (number<10)?('0'+number):(number.toString())
        }
        hours=ti(hours)
        minutes=ti(minutes)
        seconds=ti(seconds)
        return hours+':'+minutes+':'+seconds
    }
    transFromTimeToSeconds(timeStr){
        let ss=3600
      return  timeStr.split(':').reduce((time,item)=>{
           time+=item*ss
           ss/=60
           return time
      },0)
    }
    resetSeek=(e)=>{
        let newPosition=e.nativeEvent.locationX/(ScreenWidth*0.7)
        this.videoRef.seek(this.transFromTimeToSeconds(this.state.totalTime)*newPosition)
        this.setState({
            progress:newPosition
        })
    }
    handleJump=()=>{
        const {currentTime,totalTime}=this.state
        const nowTime=this.transFromTimeToSeconds(currentTime)
        const allTime=this.transFromTimeToSeconds(totalTime)
        this.videoRef.seek(nowTime+10)
        this.setState({
            currentTime:this.transFromTime(nowTime+10),
            progress:(nowTime+10)/allTime
        })
    }
    changeVolume=(e)=>{
        if(e.nativeEvent.locationX>55){
            e.nativeEvent.locationX=60
        }else if(e.nativeEvent.locationX<5){
            e.nativeEvent.locationX=0
        }
        const newVolume= Math.round(e.nativeEvent.locationX)/60
        this.setState({
            volume:newVolume
        })
    }
    //节流函数
    throttle=(fn,delay)=>{
        let lastTime=0
        return function(e){
            let nowTime=Date.now()
            if(nowTime-lastTime>delay){
                fn.call(this,e)
                lastTime=nowTime
            }
        }
    }
    showVB=()=>{
        const showVolumeBtn=!this.state.showVolumeBtn
        this.setState({
            showVolumeBtn,
            fadeAnim:showVolumeBtn?new Animated.Value(1):new Animated.Value(0)
        })
        showVolumeBtn?this.inSty():this.outSty()
    }
    showC=()=>{
        let changeSpeed=!this.state.changeSpeed
        this.setState({
            changeSpeed
        })
    }
    changeS=(num)=>{
        this.setState({rate:num,changeSpeed:false})
    }
    cutPic=()=>{
        captureRef(this.videoRef,{
            format:'jpg',
            quality:0.8,
        }).then(uri=>{
        })
        .catch(err=>console.log(err))
    }
    render(){
        let movie=null
        if(!this.props.route.params){
            movie={}
        }else{
            movie=this.props.route.params.movie||{}
        }
        let {changeSpeed,volume,paused,loading,full,currentTime,totalTime,progress,bufferProgress,rate,repeat}=this.state
        let otherStyle=StyleSheet.create({other:{left:60*volume-5}})
       return  (
            <ScrollView >
                <MyBackButton/>
                <Video
                    ref={(f)=>this.videoRef=f}
                    poster={movie.images?movie.images.large:null}
                    posterResizeMode='stretch'
                    paused={paused}
                    rate={rate}
                    volume={volume}
                    repeat={repeat}
                    fullscreen={full}
                    resizeMode="stretch"
                    source={{uri:''}}
                    style={styles.videoStyle}
                    onLoadStart={()=>this.setState({loading:true})}
                    onLoad={(e)=>this.handleLoad(e)}
                    onProgress={(e)=>this.handleProgress(e)}
                    onSeek={(e)=>e.seekTime+4}
                    />
                <View  style={{backgroundColor:'black',width:'100%',flexDirection:'row'}}>
                    <View style={{width:'70%',position:'relative',justifyContent:'center',alignItems:'center'}}>
                        <ProgressBarAndroid 
                            styleAttr="Horizontal" 
                            indeterminate={false}
                            progress={bufferProgress}
                            color="gray"
                            style={{width:'100%',position:'absolute',opacity:0.8}}
                        />
                        <ProgressBarAndroid 
                            onTouchStart={(e)=>this.resetSeek(e)}
                            onTouchMove={(e)=>this.resetSeek(e)}
                            onTouchEnd={(e)=>this.resetSeek(e)}
                            styleAttr="Horizontal" 
                            indeterminate={false}
                            progress={progress}
                            color="orange"
                            style={{width:'100%',position:'absolute'}}
                        />
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white'}}>{currentTime}/{totalTime}</Text>
                    </View>
                </View>
                <View style={styles.containerStyle}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.toggleVideo} >
                        {paused?<Text style={styles.iconStyle}>&#xe77e;</Text>:
                            <Text style={styles.iconStyle}>&#xe79f;</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={this.handleJump} style={styles.buttonStyle}>
                        <Text style={styles.iconStyle}>—></Text>
                    </TouchableOpacity>
                    <View style={styles.rateStyle}>
                        <TouchableOpacity onPress={this.showC} style={{...styles.speedStyle}}>
                            <Text style={styles.iconStyle}>&#xe619;</Text>
                        </TouchableOpacity>
                        {changeSpeed?
                        (<View style={{position:'absolute',width:'100%',height:90,backgroundColor:'orange',top:-90}}>
                            <TouchableOpacity onPress={()=>this.changeS(1)} style={styles.speedStyle1}>
                                <Text style={{...styles.iconStyle,fontSize:20}}>1.0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.changeS(2)} style={{...styles.speedStyle1,borderTopWidth:0}}>
                                <Text style={{...styles.iconStyle,fontSize:20}}>2.0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.changeS(3)} style={{...styles.speedStyle1,borderTopWidth:0,borderBottomWidth:0}}>
                                <Text style={{...styles.iconStyle,fontSize:20}}>3.0</Text>
                            </TouchableOpacity>
                        </View>):null
                        }
                    </View>
                    <TouchableOpacity onPress={this.cutPic} style={styles.buttonStyle}>
                        <Text style={styles.iconStyle}>&#xe654;</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.toggleRepeat} style={styles.buttonStyle}>
                       {repeat?<Text style={styles.iconStyle}>&#xe6a9;</Text>:
                        <Text style={{fontSize:30}}>X</Text>
                       }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.showVB}  style={styles.buttonStyle}>
                        {volume?<Text style={styles.iconStyle}>&#xe63f;</Text>:
                            <Text style={styles.iconStyle}>&#xe640;</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.togggleFull} style={styles.buttonStyle}>
                        {full?<Text style={styles.iconStyle}>&#xe71f;</Text>:
                            <Text style={styles.iconStyle}>&#xe62b;</Text>
                        }
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this.playVideo} style={paused?styles.flyStyle:styles.noneStyle}><Text style={styles.iconStyleFly}>&#xe77e;</Text></TouchableOpacity>
                <ProgressBarAndroid
                    style={loading?styles.loadingStyle:styles.noneStyle}
                    color="orange"
                />
                <Animated.View 
                    onTouchStart={(e)=>this.changeVolume(e)}
                    style={{...styles.volumeContainerStyle,opacity:this.state.fadeAnim}}>
                    <ProgressBarAndroid 
                        styleAttr="Horizontal" 
                        indeterminate={false}
                        progress={volume}
                        color="orange"
                        style={styles.volumeStyle}
                    />
                    <TouchableOpacity 
                    ref={(f)=>this.volRef=f} 
                    style={[styles.volumeBtnStyle,otherStyle.other]}/>
                </Animated.View >
                <Text>{movie.title||'none'}</Text>
            </ScrollView>
        )
    }
}
const styles=StyleSheet.create({
    speedStyle1:{
        justifyContent:'center', 
        alignItems:'center',
        height:30,
        width:'100%',
        backgroundColor:'orange',
        borderWidth:1
    },
    speedStyle:{
        justifyContent:'center', 
        alignItems:'center',
        height:30,
        width:'100%',
        backgroundColor:'orange',
        height:40,
        borderWidth:1
    },
    rateStyle:{
        width:"12%",
        justifyContent:'space-around',
        alignItems:'center',
        marginVertical:10
    },  
    volumeBtnStyle:{
        width:10,
        height:16,
        backgroundColor:'orange',
        borderRadius:2,
        borderWidth:1,
        borderStyle:'solid',
        position:'absolute',
        top:'50%',
        transform:[{translateY:-8}],
        left:25
    },  
    volumeContainerStyle:{
        width:60,
        height:ScreenWidth*0.12,
        position:'absolute',
        transform:[{rotateZ:'-90deg'}],
        bottom:72,
        left:'71.25%'
    },
    relativeStyle:{
        position:'relative'
    },
    volumeStyle:{
        width:"100%",
        height:"100%",
    },
    loadingStyle:{
        position:'absolute',
        top:"40%",
        left:'45%'
    },
    videoStyle:{
        width:'100%',
        height:300,backgroundColor:'black'
    },
    buttonStyle:{
        width:"12%",
        height:40,
        backgroundColor:'orange',
        borderWidth:1,
        borderStyle:'solid',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10
    },
    iconStyle:{
        fontFamily:'iconfont',
        fontSize:25,
    },
    containerStyle:{
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    flyStyle:{
        width:60,
        height:60,
        borderRadius:30,
        backgroundColor:'orange',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        top:'60%',
        left:'80%',
        opacity:0.8
    },
    iconStyleFly:{
        fontFamily:'iconfont',
        fontSize:30,
        color:'white'
    },
    noneStyle:{
        display:'none'
    },
    noOpacity:{
        opacity:0
    }
})