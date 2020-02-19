import {types} from "./user_actions";

const initialState = {
    login: null,
};

//Nhan action type tu Put va luu data vao store
export default function (state = initialState, action = {}) {
    switch (action.type){
        case types.LOGIN_SUCCESS:
            return{
                ...state,
                login: action.payload
            };
        default:
            return state;
    }
}