import React, { Component } from "react";
import { View, Button, Text } from "react-native";

import { StackNavigator } from "react-navigation";

const HomeScreen = ({ navigation }) => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home</Text>
        <Button onPress={() => navigation.navigate("About")} title="Go to about" />
    </View>
);

const AboutScreen = () => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>About</Text>
    </View>
);

const RootNavigator = StackNavigator({
    Home: { screen: HomeScreen, navigationOptions: { headerTitle: "Home" } },
    About: { screen: AboutScreen, navigationOptions: { headerTitle: "About" } }
});

export default RootNavigator;