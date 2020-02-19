import {types} from "./xntsdn_actions";

const initialState = {
    getListWaitingReceived: null,
    getListConfirmReceived: null,
    getListAllReceived: null,
    getDetailConfirmReceived: null,
    // getCaptionBorrow: null,
};

//Nhan action type tu Put va luu data vao store
export default function (state = initialState, action = {}) {
    switch (action.type) {
        case types.LIST_WAITING_RECEIVED_SUCCESS:
            return {
                ...state,
                getListWaitingReceived: action.payload
            };
        case types.LIST_CONFIRM_RECEIVED_SUCCESS:
            return {
                ...state,
                getListConfirmReceived: action.payload
            };
        case types.LIST_ALL_RECEIVED_SUCCESS:
            return {
                ...state,
                getListAllReceived: action.payload
            };
        case types.GET_DETAIL_CONFIRM_RECEIVED_SUCCESS:
            return {
                ...state,
                getDetailConfirmReceived: action.payload
            };
        default:
            return state;
    }
}