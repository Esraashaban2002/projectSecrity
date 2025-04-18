import authReducer from './authReducer';
import handleCart from './handleCart'
import { combineReducers } from "redux";
const rootReducers = combineReducers({
    auth: authReducer,
    handleCart: handleCart,
    
})
export default rootReducers