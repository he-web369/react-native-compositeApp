/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json'
import 'react-native-gesture-handler'
import SplashScreen from 'react-native-splash-screen';

AppRegistry.registerComponent(appName, () => {
    setTimeout(() => {
        SplashScreen.hide()
    }, 1000)
   return App
});
