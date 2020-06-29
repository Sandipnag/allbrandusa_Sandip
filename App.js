import 'react-native-gesture-handler';
import React from 'react';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import { createAppContainer } from 'react-navigation';
import Splash from './pages/splash';
import Menu from './pages/menu';
import Aboutus from './pages/about_us';
import ContactUs from './pages/contact_us';
import Exports from './pages/exports';
import Partners from './pages/partners';
import Products from './pages/products';


const AppNavigator = createAnimatedSwitchNavigator(
  {
    // Splash: Splash,
    Menu:Menu,
    Aboutus:Aboutus,
    ContactUs:ContactUs,
    Exports:Exports,
    Partners:Partners,
    Products:Products
  },
  {
    transition: (
      <Transition.Together>
        {/* <Transition.In type="slide-right" durationMs={500} /> */}
      </Transition.Together>
    ),
  }
);

export default createAppContainer(AppNavigator);;
