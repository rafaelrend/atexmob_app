import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import { StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

import { Provider } from 'react-redux';
import firebase from 'firebase';
import store from './store';

import NavigationService from './services/NavigationService';
import RootNavigator from './navigation/RootNavigator';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false
    };
  }

  componentWillMount() {
    const config = {
      apiKey: "AIzaSyATa1xEfA_EMUT-x_OUVs4zi1hv97i70JA",
      authDomain: "apppwa-27cdf.firebaseapp.com",
      databaseURL: "https://apppwa-27cdf.firebaseio.com",
      projectId: "apppwa-27cdf",
      storageBucket: "apppwa-27cdf.appspot.com",
      messagingSenderId: "754790199043"
    };
    firebase.initializeApp(config);
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    else {
      return (
        <Provider store={store}>
          <StyleProvider style={getTheme(material)}>
            <RootNavigator
              ref={navigatorRef=>{
                NavigationService.setTopLevelNavigator(navigatorRef)
              }} 
            />
          </StyleProvider>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('../assets/imgs/logo.png'),
        require('../assets/imgs/logo-clean.png')
      ]),
      Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font
      })
    ]);
  }
  _handleLoadingError = error => {
    console.log(error);
  };
  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

export default App;
