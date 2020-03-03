import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Close from '@material-ui/icons/Close';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Avatar } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { connect } from 'react-redux';
import MeetingList from '../Material List/index';
import firebase from '../../config/firebase';
import {withRouter} from 'react-router-dom';



import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    avatar: {
        width: 60,
        height: 60,
        top: 60,
        left: 10
    },
    drawerText: {
        paddingLeft: '10px',
        // backgroundColor: '#e0f2f111',
        color: "white"
    }
};

class MenuAppBar extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
        left: false,
    };
    toggleDrawer = (side, open) => () => {
        this.setState({
            left: open,
        });
    };

    handleChange = event => {
        this.setState({ auth: event.target.checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
        this.props.history.push('/editProfile');
        console.log("from unknown",this.props.history);
    };
    sideMenu = () => {
        console.log('sid menu');
    }



    logOut() {
        firebase.auth().signOut().then(x => {
            localStorage.clear();
            window.location.reload();
        })
    }


    render() {

        const Friends = this.props.meetingList;
        console.log(Friends)
        const request = [], pending = [], completed = [], accepted = [];
        Friends.map(data => {
            if (data.confirm) {
                accepted.push(data);
            }
            else if (data.completed) {
                completed.push(data)
            }
            else if (data.invited) {
                console.log("Req")
                request.push(data)
            }
            else {
                pending.push(data)
            }
        })





        const { classes } = this.props;
        const { auth, anchorEl, myData } = this.state;
        const open = Boolean(anchorEl);
        const { user } = this.props;
        console.log(this.props);


        const sideList = (
            <div>
                <div className={classes.list}>
                    <div style={{ width: "100%", height: "200px", backgroundImage: `url(https://i.dailymail.co.uk/i/pix/2017/04/06/11/3F006CA900000578-4386078-image-a-15_1491475710861.jpg)`, backgroundRepeat: 'no-repeat', backgroundSize: "cover" }}>
                        <span>
                            {user.profile &&
                                <Avatar src={user.profile.picture.data.url} className={classes.avatar} alt="Profile Picture" />
                            }
                            <br />
                            <br />
                            <br />
                            <Typography className={classes.drawerText} variant='overline'>{user.name}</Typography>
                            {/* <Typography className={classes.drawerText} variant='body2'>sfsd</Typography> */}
                        </span>
                    </div>
                    <Divider />
                    <List>
                        <ListItem>
                            <ListItemIcon><MailIcon /></ListItemIcon>
                            <MeetingList name={"Requests"} items={request} /><br />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon><MailIcon /></ListItemIcon>
                            <MeetingList name={"Accepted"} items={accepted} /><br />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon><MailIcon /></ListItemIcon>
                            <MeetingList name={"Pending"} items={pending} /><br />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon><MailIcon /></ListItemIcon>
                            <MeetingList name={"Completed"} items={completed} /><br />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button key="Logout" onClick={() => this.logOut()}>
                            <ListItemIcon><Close /></ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </div>
            </div>
        );


        return (
            <div className={classes.root}>

                {/* <SwipeableTemporaryDrawer /> */}

                <AppBar position="static">
                    <Toolbar>
                        <SwipeableDrawer
                            open={this.state.left}
                            onClose={this.toggleDrawer('left', false)}
                            onOpen={this.toggleDrawer('left', true)}
                        >
                            <div
                                tabIndex={0}
                                role="button"
                                onClick={this.toggleDrawer('left', true)}
                                onKeyDown={this.toggleDrawer('left', true)}
                            >
                                {sideList}
                            </div>
                        </SwipeableDrawer>
                        <IconButton
                            onClick={this.toggleDrawer('left', true)}
                            className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Meeting App
                        </Typography>
                        {auth && (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>Edit Profile</MenuItem>
                                    {/* <MenuItem onClick={this.handleClose}>My account</MenuItem> */}
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    return {
        meetingList: state.meetingList
    }
}

export default  withRouter(connect(mapStateToProps)(withStyles(styles)(MenuAppBar)));