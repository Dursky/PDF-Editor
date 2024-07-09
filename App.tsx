import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/Home';
import PDFEditorScreen from './src/screens/PDFEditor';
import {RootStackParamList} from './src/types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PdfEditor" component={PDFEditorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
