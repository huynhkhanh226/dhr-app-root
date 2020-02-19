import {combineReducers} from 'redux';
import Navigation from '../navigation/redux/navigation_reducers';

export default combineReducers({
    nav: Navigation,
});