import {types} from "./xndxvt_actions";

const initialState = {
    getListWaitingProposal: null,
    getListConfirmProposal: null,
    getListAllProposal: null,
    getDetailConfirmProposal: null,
    getVoucherInventoryProposal: null,
    // RmVoucherConfirm: null,
};

//Nhan action type tu Put va luu data vao store
export default function (state = initialState, action = {}) {
    switch (action.type) {
        case types.LIST_WAITING_PROPOSAL_SUCCESS:
            return {
                ...state,
                getListWaitingProposal: action.payload
            };
        case types.LIST_CONFIRM_PROPOSAL_SUCCESS:
            return {
                ...state,
                getListConfirmProposal: action.payload
            };
        case types.LIST_ALL_PROPOSAL_SUCCESS:
            return {
                ...state,
                getListAllProposal: action.payload
            };
        case types.GET_DETAIL_CONFIRM_PROPOSAL_SUCCESS:
            return {
                ...state,
                getDetailConfirmProposal: action.payload
            };
        case types.GET_LIST_INVENTORY_PROPOSE_SUCCESS:
            return {
                ...state,
                getVoucherInventoryProposal: action.payload
            };
        default:
            return state;
    }
}