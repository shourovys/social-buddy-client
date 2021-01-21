import { ADD_USER, LOGOUT_USER } from '../constants/actionTypes';
const user = (state={authData:null},action) =>{
    switch (action.type) {
        case ADD_USER:
            localStorage.setItem('profile',JSON.stringify(action.data))
            return {
                ...state,
                authData:action.data
            }
    
        case LOGOUT_USER:
            localStorage.setItem('profile',null)
            console.log(state);
            return {
                ...state,
                authData:null
            }
    
        default:
            const profile = JSON.parse(localStorage.getItem('profile'))
            return {
                ...state,
                authData:profile
            }
    }
}
export default user