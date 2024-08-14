import React from 'react';
import {Provider} from 'react-redux';
import store from './src/Redux/store';
import {Appnavigation} from './src/navigation/Appnavigation';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/components/core/Toast';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Appnavigation />
        <Toast config={toastConfig} />
      </GestureHandlerRootView>
    </Provider>
  );
}
