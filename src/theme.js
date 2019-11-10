import { createMuiTheme } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: purple,
    },
    status: {
        danger: 'orange',
    },
});

export default theme