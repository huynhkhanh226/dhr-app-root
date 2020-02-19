// action types
export const types = {
    LIST_WAITING_PROPOSAL: 'LIST_WAITING_PROPOSAL',
    LIST_WAITING_PROPOSAL_SUCCESS: 'LIST_WAITING_PROPOSAL_SUCCESS',

    LIST_CONFIRM_PROPOSAL: 'LIST_CONFIRM_PROPOSAL',
    LIST_CONFIRM_PROPOSAL_SUCCESS: 'LIST_CONFIRM_PROPOSAL_SUCCESS',

    LIST_ALL_PROPOSAL: 'LIST_ALL_PROPOSAL',
    LIST_ALL_PROPOSAL_SUCCESS: 'LIST_ALL_PROPOSAL_SUCCESS',

    GET_DETAIL_CONFIRM_PROPOSAL: 'GET_DETAIL_CONFIRM_PROPOSAL',
    GET_DETAIL_CONFIRM_PROPOSAL_SUCCESS: 'GET_DETAIL_CONFIRM_PROPOSAL_SUCCESS',

    GET_LIST_INVENTORY_PROPOSE: 'GET_LIST_INVENTORY_PROPOSE',
    GET_LIST_INVENTORY_PROPOSE_SUCCESS: 'GET_LIST_INVENTORY_PROPOSE_SUCCESS',

    APPROVAL_VOUCHER_PROPOSAL: 'APPROVAL_VOUCHER_PROPOSAL',
    APPROVAL_VOUCHER_PROPOSAL_SUCCESS: 'APPROVAL_VOUCHER_PROPOSAL_SUCCESS',

    REMOVE_VOUCHER_PROPOSAL: 'REMOVE_VOUCHER_PROPOSAL',
    REMOVE_VOUCHER_PROPOSAL_SUCCESS: 'REMOVE_VOUCHER_PROPOSAL_SUCCESS',

};

export function getListWaitingProposal(params, cb) {
    return {
        type: types.LIST_WAITING_PROPOSAL,
        params,
        cb
    }
}

export function getListConfirmProposal(params, cb) {
    return {
        type: types.LIST_CONFIRM_PROPOSAL,
        params,
        cb
    }
}

export function getListAllProposal(params, cb) {
    return {
        type: types.LIST_ALL_PROPOSAL,
        params,
        cb
    }
}

export function getDetailConfirmProposal(params, cb) {
    return {
        type: types.GET_DETAIL_CONFIRM_PROPOSAL,
        params,
        cb
    }
}

export function getVoucherInventoryProposal(params, cb) {
    return {
        type: types.GET_LIST_INVENTORY_PROPOSE,
        params,
        cb
    }
}

export function appVoucherProposal(params, cb) {
    return {
        type: types.APPROVAL_VOUCHER_PROPOSAL,
        params,
        cb
    }
}

export function RmVoucherProposal(params, cb) {
    return {
        type: types.REMOVE_VOUCHER_PROPOSAL,
        params,
        cb
    }
}


