import React from 'react';
import {Provider} from 'react-redux';
import store from './src/Redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {Appnavigation} from './src/navigation/Appnavigation';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Appnavigation />
      </NavigationContainer>
    </Provider>
  );
}
