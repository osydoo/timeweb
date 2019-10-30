import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MailIcon from '@material-ui/icons/Mail';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(3)
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

export default function FirstPage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [leftbar, setLeftBar] = React.useState(false);
    const letter = useSelector(state => state.rootReducer.letter, []);

    const toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setLeftBar(open);
    };

    const handleDrawerClose = () => {
        setLeftBar(false);
    }

    const handleWriting = e => {
        dispatch({ type: 'ADD_LETTER', letter:{ ...letter, [e.target.id]: e.target.value }})
    }

    const sideList = () => (
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
                <ListItem>
                    <Typography variant="h6" className={classes.title}>
                        메뉴
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        <CloseIcon />
                    </IconButton>
                </ListItem>
                <Divider/>
                <ListItem button>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <Typography variant="body1" className={classes.title}>
                        편지 쓰기
                    </Typography>
                </ListItem>
                <Divider/>
                <ListItem button>
                <ListItemIcon><ListAltIcon /></ListItemIcon>
                    <Typography variant="body1" className={classes.title}>
                        편지 목록
                    </Typography>
                </ListItem>
                <Divider/>
                <ListItem button>
                <ListItemIcon><MenuBookIcon /></ListItemIcon>
                    <Typography variant="body1" className={classes.title}>
                        사용 방법
                    </Typography>
              </ListItem>
              <Divider/>
          </List>
        </div>
    );

    return (
        <div>
            <AppBar position="sticky"  className={classes.appbar}>
                <Toolbar >
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        TimeWeb
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                open={leftbar}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {sideList()}
            </SwipeableDrawer>
            <Paper className={classes.paper}>
                <Grid container className={classes.lettertitle}>
                    <Typography variant="h4">
                        편지 쓰기
                    </Typography>
                    <CreateIcon />
                </Grid>
                <Grid container>
                    <Grid item xs={3}>
                        <Typography variant="h5" className={classes.lettertitle}>
                            제목
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                        id="title"
                        placeholder="미래의 나에게!"
                        fullWidth
                        margin="normal"
                        onChange={handleWriting}
                        />
                    </Grid>
                </Grid>
                <TextField
                id="body"
                placeholder="나는 과연 미래에 무엇을 하고 있을가??"
                margin="normal"
                fullWidth
                variant="outlined"
                multiline
                rows="20"
                rowsMax="20"
                onChange={handleWriting}
                />
            </Paper>
        </div>
    );
}
