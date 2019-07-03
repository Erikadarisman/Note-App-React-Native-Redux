import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import AppNavigator from './src/AppNavigator';
import { Provider } from 'react-redux'

import store from './src/public/redux/store';


const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
