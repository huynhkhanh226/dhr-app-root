import {types} from "./home_actions";

const initialState = {
    listMenu: null,
    listNoty: null,
    listVoucherNum: null
};

//Nhan action type tu Put va luu data vao store
export default function (state = initialState, action = {}) {
    switch (action.type){
        case types.LIST_MENU_SUCCESS:
            return{
                ...state,
                listMenu: action.payload
            };
        case types.LIST_NOTY_SUCCESS:
            return{
                ...state,
                listNoty: action.payload
            };
        case types.GET_VOUCHER_NUM_SUCCESS:
            return{
                ...state,
                listVoucherNum: action.payload
            };
        default:
            return state;
    }
}
