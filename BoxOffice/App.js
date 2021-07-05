/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BoxOffice from "./pages/BoxOffice";

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ffffff",
  },
};

const Stack = createStackNavigator();

const App: () => Node = () => {
  return (
    <>
      <NavigationContainer theme={Theme}>
        <Stack.Navigator>
          <Stack.Screen name="BoxOffice" component={BoxOffice} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
