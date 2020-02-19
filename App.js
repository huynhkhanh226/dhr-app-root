import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

// import SplashScreen from 'react-native-splash-screen';
import logger from 'redux-logger'

import ContainerView from './src/components/ContainerView.js';
import {AppNavigator} from './src/navigation/AppNavigator.js';


import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import allReducers from './src/utils/allReducers';
import { middleware } from './src/utils/redux';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './src/utils/rootSaga';

const sagaMiddleware = createSagaMiddleware();
let store = createStore(allReducers, compose(applyMiddleware(...[sagaMiddleware, middleware, logger])));

export default class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <StatusBar barStyle="default"/>
                    <ContainerView>
                        <AppNavigator />
                    </ContainerView>
                </View>
            </Provider>
        );
    }
}

sagaMiddleware.run(rootSaga);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: 'white'
    },
    statusBarUnderlay: {
        height: 24,
        backgroundColor: 'white'
    }
});
