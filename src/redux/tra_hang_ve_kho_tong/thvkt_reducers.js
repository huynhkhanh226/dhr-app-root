import {types} from "./thvkt_actions";

const initialState = {
    getListReason: null,
    getListStatus: null,
    getListMDIVoucher: null,
    getDetailMDIVoucher: null,
    getCbDefaultMDIVoucher: null,
};

//Nhan action type tu Put va luu data vao store
export default function (state = initialState, action = {}) {
    switch (action.type) {
        case types.LIST_REASON_SUCCESS:
            return {
                ...state,
                getListReason: action.payload
            };
        case types.LIST_STATUS_SUCCESS:
            return {
                ...state,
                getListStatus: action.payload
            };
        case types.LIST_MDI_VOUCHER_SUCCESS:
            return {
                ...state,
                getListMDIVoucher: action.payload
            };
        case types.GET_DETAIL_MDI_VOUCHER_SUCCESS:
            return {
                ...state,
                getDetailMDIVoucher: action.payload
            };
        case types.GET_COMBO_DEFAULT_MDI_VOUCHER_SUCCESS:
            return {
                ...state,
                getCbDefaultMDIVoucher: action.payload
            };
        default:
            return state;
    }
}