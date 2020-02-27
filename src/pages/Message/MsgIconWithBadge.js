import React from 'react'
import { View ,Text } from 'react-native'
import {connect} from 'react-redux'

function MsgIconWithBadge({badgeCount}){
    return (
        <View style={{ width: 24, height: 24, margin: 5 }}>
          <Text style={{
                fontFamily:'iconfont',
                fontSize:22
            }}>&#xe69d;</Text>
          {badgeCount > 0 && (
            <View
              style={{
                position: 'absolute',
                right: -6,
                top: -3,
                backgroundColor: 'red',
                borderRadius: 6,
                width: 12,
                height: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                {badgeCount}
              </Text>
            </View>
          )}
        </View>
      )
}
export default connect(
    state=>({badgeCount:state.badgeCount})
)(MsgIconWithBadge)