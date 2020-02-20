import {createStore,applyMiddleware} from 'redux'
import ThunkMiddleware from 'redux-thunk'

import reducers from './reducers'

export default createStore(reducers,applyMiddleware(ThunkMiddleware))