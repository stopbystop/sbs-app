"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const Navigator_1 = require("./Components/Navigator");
class MyAwesomeProject extends React.Component {
    render() {
        return (React.createElement(Navigator_1.ModalStack, null));
    }
}
exports.default = MyAwesomeProject;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#AA00BB',
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
react_native_1.AppRegistry.registerComponent('sbsrn', () => MyAwesomeProject);
//# sourceMappingURL=index.js.map