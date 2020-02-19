// action types
export const types = {
    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
};

export function login(params, cb) {
    return {
        type: types.LOGIN,
        params,
        cb
    }
}
