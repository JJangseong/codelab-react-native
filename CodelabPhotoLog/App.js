/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigators/AppNavigator";



const App: () => Node = () => {


  return (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
  );
};

export default App;
