"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const Navigator_1 = require("./Components/Navigator");
class MyAwesomeProject extends React.Component {
    render() {
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(Navigator_1.default, null)));
    }
}
exports.default = MyAwesomeProject;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
alert('here');
react_native_1.AppRegistry.registerComponent('sbsrn', () => MyAwesomeProject);
//# sourceMappingURL=index.js.map