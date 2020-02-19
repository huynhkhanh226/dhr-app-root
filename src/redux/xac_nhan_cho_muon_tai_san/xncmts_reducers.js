import {types} from "./xncmts_actions";

const initialState = {
    getListWaitingBorrow: null,
    getListConfirmBorrow: null,
    getListAllBorrow: null,
    getDetailConfirmBorrow: null,
    getCaptionBorrow: null,
};

//Nhan action type tu Put va luu data vao store
export default function (state = initialState, action = {}) {
    switch (action.type) {
        case types.LIST_WAITING_BORROW_SUCCESS:
            return {
                ...state,
                getListWaitingBorrow: action.payload
            };
        case types.LIST_CONFIRM_BORROW_SUCCESS:
            return {
                ...state,
                getListConfirmBorrow: action.payload
            };
        case types.LIST_ALL_BORROW_SUCCESS:
            return {
                ...state,
                getListAllBorrow: action.payload
            };
        case types.GET_DETAIL_CONFIRM_BORROW_SUCCESS:
            return {
                ...state,
                getDetailConfirmBorrow: action.payload
            };
        case types.GET_CAPTION_CONFIRM_BORROW_SUCCESS:
            return {
                ...state,
                getCaptionBorrow: action.payload
            };
        default:
            return state;
    }
}