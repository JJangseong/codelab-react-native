/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigators/AppNavigator";
import {Provider} from 'context-q'



const App: () => Node = () => {


  return (
    <Provider defaultState={{showDate: false}}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
