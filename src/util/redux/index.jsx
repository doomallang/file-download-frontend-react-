import { combineReducers } from 'redux'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import authInfo from 'util/redux/authInfo'
import modal from 'util/redux/modal'
import history from 'util/redux/history'
import page from 'util/redux/page'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({ authInfo, modal, page, history })
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer