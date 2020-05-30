import * as React from "react";
import * as ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider } from "@material-ui/core/styles";
import pink from "@material-ui/core/colors/pink";
import teal from "@material-ui/core/colors/teal";
import "./index.scss";

let theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: teal,
  },
});

let theme2 = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#006064",
    },
    secondary: {
      main: "#006064",
    },
  },
});

class App extends React.Component<{}, { active: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      active: true,
    };
    console.log(11);
  }
  render() {
    return (
      <Box>
        <ThemeProvider theme={this.state.active ? theme : theme2}>
          <IconButton color="secondary" aria-label="delete" size="small">
            <ArrowDownwardIcon fontSize="inherit" />
          </IconButton>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              this.setState({ active: !this.state.active });
            }}
          >
            Hello 6687我就不信了你在说就还可以吧我觉得你说呢?
          </Button>
        </ThemeProvider>
      </Box>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
