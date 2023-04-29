import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import DailyCard from '../screens/DailyCard';
import PhoneVerification from '../screens/PhoneVerifications';
import Favorites from '../screens/Favorites';
import Detail from '../screens/Detail';

const Stack = createStackNavigator();

const MainStackNavigator = ({ user }) => {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: 'Sign Up' }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: 'Sign In' }}
      />
      <Stack.Screen
        name="DailyCard"
        component={DailyCard}
        options={{
          // title: 'Daily Card',
          // headerLeft: () => (user ? null : undefined),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PhoneVerification"
        component={PhoneVerification}
        options={{ title: 'Phone Verification' }}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{ title: 'Favorites' }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ title: 'Detail Card' }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
