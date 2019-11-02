import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(3),
    },
    appbar: {
      flexGrow: 1,
      backgroundColor: '#ffeb3b'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    lettertitle: {
        marginTop: 12,
        padding: 6
    }
  }));

export default function WriteMail() {
    const classes = useStyles();
    const openpage = useSelector(state => state.rootReducer.openpage, []);
    const list = useSelector(state => state.rootReducer.list, []);

    return (
        <div hidden={!(openpage.list)}> 
            <Paper className={classes.paper}>
                <Grid container className={classes.lettertitle}>
                    <Typography variant="h4">
                        편지 목록
                    </Typography>
                </Grid>
                {
                  list.map((value) => (
                    <div key={value}>
                      <Typography variant="h4">
                        {value.name}
                      </Typography> 
                    </div>
                  ))
                }
            </Paper>
        </div>
    );
}
