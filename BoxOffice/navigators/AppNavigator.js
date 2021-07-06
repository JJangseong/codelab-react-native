import React from 'react'
import { createDrawerNavigator } from "@react-navigation/drawer";
import BoxOfficeNavigator from "./BoxOfficeNavigator";

const Drawer = createDrawerNavigator();

function AppNavigator() {
  return (
    <Drawer.Navigator  screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="BoxOfficeNavigator" component={BoxOfficeNavigator} />
    </Drawer.Navigator>
  )
}

export default AppNavigator
