import { combineReducers, configureStore } from '@reduxjs/toolkit';
import networkParamsReducer from './SCA_Calculator/networkParamsSlice';
import voltageRangeReducer from './SCA_Calculator/voltageRangeSlice';
import calcFormReducer from './SCA_Calculator/calcFormSlice';


export default configureStore({
    reducer: {
        networkParams: networkParamsReducer,
        voltageRange: voltageRangeReducer,
        calcForm: calcFormReducer
    }
});