import React from 'react';
import { WriteMail, MailList } from '../interface'
import { useDispatch } from 'react-redux';
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
    const [leftbar, setLeftBar] = React.useState(false);
    const dispatch = useDispatch();

    const handleChange = (newValue) => {
        let state={    
            letter: false,
            list: false,
            menual: false
        }
        state = {...state, [newValue] : true};
        dispatch({ type: 'OPEN_PAGE', openpage:state})
    };

    const toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setLeftBar(open);
    };

    const handleDrawerClose = () => {
        setLeftBar(false);
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
                    <Typography variant="body1" className={classes.title} onClick={()=>handleChange('letter')}>
                        편지 쓰기
                    </Typography>
                </ListItem>
                <Divider/>
                <ListItem button>
                <ListItemIcon><ListAltIcon /></ListItemIcon>
                    <Typography variant="body1" className={classes.title} onClick={()=>handleChange('list')}>
                        편지 목록
                    </Typography>
                </ListItem>
                <Divider/>
                <ListItem button>
                <ListItemIcon><MenuBookIcon /></ListItemIcon>
                    <Typography variant="body1" className={classes.title} onClick={()=>handleChange('menual')}>
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
            <WriteMail />
            <MailList />
        </div>
    );
}
