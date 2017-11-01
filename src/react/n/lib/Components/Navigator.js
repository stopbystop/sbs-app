"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_navigation_1 = require("react-navigation");
const Navigation = require("react-navigation");
const HomeScreen = () => (React.createElement(react_native_1.View, { style: { flex: 1, alignItems: "center", justifyContent: "center" } },
    React.createElement(react_native_1.Text, null, "Home"),
    React.createElement(react_native_1.Button, { onPress: () => Navigation.NavigationActions.navigate({ routeName: "About" }), title: "Go to about" })));
const AboutScreen = () => (React.createElement(react_native_1.View, { style: { flex: 1, alignItems: "center", justifyContent: "center" } },
    React.createElement(react_native_1.Text, null, "About")));
const RootNavigator = react_navigation_1.StackNavigator({
    Home: { screen: HomeScreen, navigationOptions: { headerTitle: "Home" } },
    About: { screen: AboutScreen, navigationOptions: { headerTitle: "About" } }
});
exports.default = RootNavigator;
//# sourceMappingURL=Navigator.js.map