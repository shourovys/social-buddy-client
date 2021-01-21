import * as api from '../api/index.js';
import { ADD_USER } from "../constants/actionTypes";

export const addUser = (userInfo) =>{
    return {
        type: ADD_USER ,
        data:userInfo
    }
}

export const loginUser = (fromData, history)=> async (dispatch) =>{
    const {data} = await api.loginApi(fromData)

    history.push('/')
    dispatch(addUser(data))
}

export const sineUpUser = (fromData, history)=> async (dispatch) =>{
    const {data} = await api.sineUpApi(fromData)

    history.push('/')
    dispatch(addUser(data))
}
