import React from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '~/scenes/home';
import Search from '~/scenes/search';
import Profile from '~/scenes/profile';
import Map from '~/scenes/map';
import HomeIcon from '~/assets/icons/home.svg';
import SearchIcon from '~/assets/icons/search.svg';
import ProfileIcon from '~/assets/icons/profile.svg';
import { Colors } from '~/styles';
import ICON_DIMENSIONS from '~/utils/constants';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const AppStack = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        const { width, height } = ICON_DIMENSIONS;
        const { name } = route;
        let icon;

        switch (name) {
          case 'Home':
            icon = <HomeIcon width={width} height={height} fill={color} />;
            break;
          case 'Search':
            icon = <SearchIcon width={width} height={height} fill={color} />;
            break;
          case 'Profile':
            icon = <ProfileIcon width={width} height={height} fill={color} />;
            break;
          default:
        }
        return icon;
      },
    })}
    tabBarOptions={{
      showLabel: false,
      activeTintColor: Colors.lightBlue,
      inactiveTintColor: Colors.mediumGray,
    }}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      /* eslint-disable */
      'lora-bold': require('./assets/fonts/Lora-Bold.ttf'),
      'lora-bold-italic': require('./assets/fonts/Lora-BoldItalic.ttf'),
      'lora-italic': require('./assets/fonts/Lora-Italic.ttf'),
      'lora-regular': require('./assets/fonts/Lora-Regular.ttf'),
      'sanchez-italic': require('./assets/fonts/Sanchez-Italic.ttf'),
      'sanchez-regular': require('./assets/fonts/Sanchez-Regular.ttf'),
      /* eslint-enable */
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { fontLoaded } = this.state;
    return fontLoaded ? (
      <NavigationContainer>
        <RootStack.Navigator headerMode="none">
          <RootStack.Screen name="App" component={AppStack} />
          <RootStack.Screen name="MapModal" component={Map} />
        </RootStack.Navigator>
      </NavigationContainer>
    ) : null;
  }
}
