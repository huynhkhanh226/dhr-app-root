import Root from '../Root';
import Config from '../../config/index.js';

export default (state, action) => {
    const newState = Root.router.getStateForAction(action, state);
    let nav = newState || state;
    getRoute(nav);
    return nav;
};

function getRoute(nav) {
    if(!nav.routes){
        return;
    }
    let route = nav.routes[nav.index];
    Config.currentScreen = route;
    getRoute(route);
}