import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawerScreen from './src/screens/SideDrawer/SideDrawer';

import configureStore from './src/store/configureStore';

const store = configureStore();

//Register Screens
Navigation.registerComponent(
  'awesome-places.AuthScreen',
  () => (props) => (
    <Provider store={store}>
      <AuthScreen {...props}/>
    </Provider>
  ), () => AuthScreen
);
Navigation.registerComponent(
  'awesome-places.ShareScreen',
  () => (props) => (
    <Provider store={store}>
      <SharePlaceScreen {...props}/>
    </Provider>
  ),
  () => SharePlaceScreen,
);
Navigation.registerComponent(
  'awesome-places.FindScreen',
  () => (props) => (
    <Provider store={store}>
      <FindPlaceScreen {...props}/>
    </Provider>
  ),
  () => FindPlaceScreen,
);
Navigation.registerComponent(
  'awesome-places.PlaceDetailScreen',
  () => (props) => (
    <Provider store={store}>
      <PlaceDetailScreen {...props}/>
    </Provider>
  ),
  () => PlaceDetailScreen,
);
Navigation.registerComponent(
  'awesome-places.SideDrawerScreen',
  () => SideDrawerScreen
);

Navigation.setRoot({
  root: {
    stack: {
      children: [{
        component: {
          name: 'awesome-places.AuthScreen'
        }
      }],
      options: {
        topBar: {
          noBorder: true,
          title: {
            text: 'Awesome Place Login'
          },
          subtitle: {
            text: 'Login to share and find a awesome place'
          }
        }
      }
    }
  }
})