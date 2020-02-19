import {types} from "./main_actions";

const initialState = {
    user: null,
    setting: null,
    loading: null,
    tabBar: true,
    checkLogin:null,
    numberBadge:null,
    company:null,
    getListMenuHome:null,
    getListMenuMSS:null,
    badge: 0
};

export default function (state = initialState, action = {}) {
    switch (action.type){
        case types.TAB_BAR_SUCCESS:
            return{
                ...state,
                tabBar: action.payload
            };
        case types.GET_SETTING_COMPLETE:
            return{
                ...state,
                token: action.token,
                profile: action.profile,
                setting: action.setting,
                language:  action.language,
                company:  action.company
            };
        case types.GET_MENU_HOME_SUCCESS:
            return{
                ...state,
                getListMenuHome: action.payload
            };
        case types.GET_MENU_MSS_SUCCESS:
            return{
                ...state,
                getListMenuMSS: action.payload
            };
        case types.UPDATE_BADGE_COMPLETE:
            return{
                ...state,
                badge: action.badge,
            };
        default:
            return state;
    }
}
