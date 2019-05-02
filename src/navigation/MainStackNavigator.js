import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { modalTransitionConfig } from './config';
import material from '../../native-base-theme/variables/material';

import MainTabNavigator from './MainTabNavigator';

const MainStackNavigator = createStackNavigator({
    Tabs:{screen:MainTabNavigator}
}, {
    initialRouteName:'Tabs',
    mode:'modal',
    modalTransitionConfig,
    defaultNavigationOptions:{
        header:null,
        headerMode:'screen'
    }
});

export default MainStackNavigator;