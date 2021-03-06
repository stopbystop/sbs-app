/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { deepOrange500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';


const AppBarExampleIcon = () => (
    <AppBar title="Hello!"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
);

const styles = {
    container: {
        textAlign: 'center',

    },
};

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
});
class Main extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            open: false,
        };
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    }
    handleTouchTap = () => {
        this.setState({
            open: true,
        });
    }
    render() {

        
        const standardActions = (
            <FlatButton
                label="Ok"
                primary={true}
                onTouchTap={this.handleRequestClose}
            />
        );
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <AppBarExampleIcon />
                    <Dialog
                        open={this.state.open}
                        title="Super Secret Password"
                        actions={[standardActions]}
                        onRequestClose={this.handleRequestClose}

                    >
                        1-2-3-4-5
          </Dialog>
                    <h1>Material-UI</h1>
                    <h2>example project</h2>
                    <RaisedButton
                        label="Super Secret Password. Yes!"
                        secondary={true}
                        onTouchTap={this.handleTouchTap}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}
export { Main };
