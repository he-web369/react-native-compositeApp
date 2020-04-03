import React,{PureComponent} from 'react'
import { View ,Text,Dimensions, ScrollView } from 'react-native'
import { MapView, MapTypes, Geolocation, Overlay, MapApp,GetDistance } from 'react-native-baidu-map'
import {Input, Button} from 'react-native-elements'
import {connect } from 'react-redux'

import {getLocation} from '../../../redux/actions'
import HomeHeader from './HomeHeader'
const ScreenHeight=Math.round(Dimensions.get('window').height)
const ScreenWidth=Math.round(Dimensions.get('window').width)
const { Marker, Cluster } = Overlay


 class Map extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            longitude:0,
            latitude:0,
            currentTitle:'',
            point1:{longitude:0,latitude:0,name:''},
            point2:{longitude:1,latitude:0,name:''},
            distance:0,
        }
    }
    componentDidMount(){
        Geolocation.getCurrentPosition().then(res=>{
            this.setState({
                longitude:res.longitude,
                latitude:res.latitude,
                currentTitle:res.address
            })
            this.props.getLocation({longitude:res.longitude,latitude:res.latitude})
        }).catch(err=>{console.log(err)})
    }
    handleE=(e)=>{
        const {point1,point2}=this.state
        if(point1.longitude===0){
            this.setState({point1:e})
        }else if(point1.longitude===e.longitude){
            this.setState({point1:{longitude:0,latitude:0,name:''},distance:0})
        }else if(point2.longitude===e.longitude){
            this.setState({point2:{longitude:1,latitude:0,name:''},distance:0})
        }else{
            this.setState({point2:e})
            GetDistance.getLocationDistance(e,{longitude:point1.longitude,latitude:point1.latitude})
            .then(res=>{
                this.setState({
                    distance:res.distance
                })
            })
        }
    }
    render(){
        const {navigation,locations}=this.props
        const {longitude,latitude,point1,point2,currentTitle,distance}=this.state
        return (
            <View style={{marginTop:ScreenHeight*0.03}}>
                <HomeHeader distance={distance} point={[point1.name,point2.name,currentTitle]} navigation={navigation} index={1}/>
                <MapView
                     width={ScreenWidth}
                     height={440}
                     zoom={18}
                     zoomControlsVisible={true}
                     mapType={MapTypes.NORMAL}
                     center={{longitude,latitude}}
                     onMapPoiClick={this.handleE}
                     showsUserLocation
                     locationData={{longitude,latitude}}
                >
                    <Marker  location={{longitude:point1.longitude,latitude:point1.latitude}} />
                    <Marker  location={{longitude:point2.longitude,latitude:point2.latitude}} />
                    <Cluster>
                        {locations.length>0?locations.map((item,index)=>(
                            <Marker  key={index} location={{longitude:item.location[0]*1,latitude:item.location[1]*1}} />
                        )):null}
                    </Cluster>
                </MapView>
            </View>
        )
    }
} 
export default connect(
    state=>({locations:state.locations}),
    {getLocation}
)(Map)