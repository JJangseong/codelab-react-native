// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from "./pages/List";
import Form from "./pages/Form";
import Detail from "./pages/Detail";

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="List" component={List} />
                <Stack.Screen name="Detail" component={Detail} />
                <Stack.Screen name="Form" component={Form} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;