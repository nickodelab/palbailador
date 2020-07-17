
import React from 'react';
import { Grow, Snackbar, withStyles } from '@material-ui/core/';
import { Alert as MuiAlert } from '@material-ui/lab/';

const styles = theme => ({
    alert: {
        // margin: theme.spacing(2),
    },
    ok: {
        backgroundColor: theme.palette.primary.main,
    }
});

const Alert = ({ level, children, classes, ...props }) => <>
    <MuiAlert
        classes={{ root: classes.alert, filledSuccess: classes.ok }}
        severity={level}
        variant="filled"
        {...props}
    >
        {children}
    </MuiAlert>
</>;

export default withStyles(styles)(Alert);
