import * as React from "react";
import { Button, Text, View } from "react-native";
import { NavigationContainer, StackNavigator, NavigationScreenProps, NavigationScreenProp, NavigationStackScreenOptions } from 'react-navigation';

class MyProfileScreen extends React.Component<NavigationScreenProps<any>, any> {
    static navigationOptions = {
        title: 'Lucy\'s Profile',
    }

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate('Home', { name: 'Lucy' })}
                title="Go Home!"
            />
        );
    }
}

class MyHomeScreen extends React.Component<NavigationScreenProps<any>, any>  {
    static navigationOptions = {
        title: 'Home',
    }

    render() {
        return (
            <View>
                <Text>I can develop in React Native! Maybe....</Text>
            <Button
                onPress={() => {
                    this.test();
                    this.props.navigation.navigate('Profile', { name: 'Lucy' })}
                }

                title="Go to Lucy's profile! Yes it is working!"
            />
            </View>
        );
    };
    test(){
        var i = 0;
        i++;
        console.log(i);
    }
}

export const ModalStack = StackNavigator({
    Home: {
        screen: MyHomeScreen,
    },
    Profile: {
        path: 'people/:name',
        screen: MyProfileScreen,
    },
})