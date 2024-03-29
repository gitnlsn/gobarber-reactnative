import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
    return (
        <Auth.Navigator
            screenOptions={{
                headerShown: false,
                headerTintColor: '#FFF',
                headerStyle: {
                    backgroundColor: '#7159C1'
                },
                cardStyle: {
                    backgroundColor: '#312E38'
                },
            }}
        >
            <Auth.Screen name="SignIn" component={SignIn} />
            <Auth.Screen name="SignUp" component={SignUp} />
        </Auth.Navigator>
    );
}

export default AuthRoutes;
