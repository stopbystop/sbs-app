"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_navigation_1 = require("react-navigation");
class MyProfileScreen extends React.Component {
    render() {
        return (React.createElement(react_native_1.Button, { onPress: () => this.props.navigation.navigate('Home', { name: 'Lucy' }), title: "Go Home!" }));
    }
}
MyProfileScreen.navigationOptions = {
    title: 'Lucy\'s Profile',
};
class MyHomeScreen extends React.Component {
    render() {
        return (React.createElement(react_native_1.View, null,
            React.createElement(react_native_1.Text, null, "I can develop in React Native! Maybe...."),
            React.createElement(react_native_1.Button, { onPress: () => {
                    this.test();
                    this.props.navigation.navigate('Profile', { name: 'Lucy' });
                }, title: "Go to Lucy's profile! Yes it is working!" })));
    }
    ;
    test() {
        var i = 0;
        i++;
        console.log(i);
    }
}
MyHomeScreen.navigationOptions = {
    title: 'Home',
};
exports.ModalStack = react_navigation_1.StackNavigator({
    Home: {
        screen: MyHomeScreen,
    },
    Profile: {
        path: 'people/:name',
        screen: MyProfileScreen,
    },
});
//# sourceMappingURL=Navigator.js.map