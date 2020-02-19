
export const types = {
    CHANGE_SCREEN: 'CHANGE_SCREEN',
    RESET_SCREEN: 'RESET_SCREEN',
    BACK_SCREEN: 'BACK_SCREEN',
};

export function changeScreen(routeName,params) {
    return{
        type: types.CHANGE_SCREEN,
        routeName,
        params
    }
}

export function resetScreen(routeName) {
    return{
        type: types.RESET_SCREEN,
        routeName
    }
}

export function backScreen() {
    return{
        type: types.BACK_SCREEN
    }
}