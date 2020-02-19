
import { connect } from 'react-redux';

import {
    createReactNavigationReduxMiddleware,
    createReduxContainer,
} from 'react-navigation-redux-helpers';

import Root from './Root.js';

const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
);

const AppWithNavigationState = createReduxContainer(Root, 'root');

const mapStateToProps = (state) => ({
    state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export {
    AppNavigator,
    middleware
};