import React from 'react'
import BoxOffice from "../pages/BoxOffice";
import MovieDetail from "../pages/MovieDetail";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function BoxOfficeNavigator() {
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BoxOffice" component={BoxOffice} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  )
}

export default BoxOfficeNavigator
