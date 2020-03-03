import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux';
import Notification from '../notificationScreen/index';

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            items1: [],
            openDialog: false,
            index: null
        };
        this.changeState = this.changeState.bind(this);

    }


    static getDerivedStateFromProps(nextProps, nextState,previousProps,previousState) {

        console.log('Material List  ** NExt props', nextProps);
        console.log("Material user =>",nextState );
        // if (state.items1) {

        // }
        // console.log('Material List  ** NExt props);
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleDialogOpne(index) {
        console.log("Handle Works", index)
        this.setState({ index: index, openDialog: true })
    }
    changeState() {
        this.setState({ index: null, openDialog: false })
    }

    render() {
        const { classes, name, items = [] } = this.props;
        this.state.items1 = items;
        const items1 = this.state.items1;
        console.log("from matrial", this.props.currentUser)
        return (
            <div>
                <Button onClick={this.handleClickOpen}>{name}</Button>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Dialog
                        open={this.state.openDialog}
                        onClose={() => this.setState({ openDialog: false })}
                    >
                        {this.state.openDialog &&
                            <Notification
                                closeScreen={() => this.setState({ openDialog: false })}
                                name={name}
                                currentUser={this.props.currentUser} changeState={this.changeState} friend={items[this.state.index]}
                            />}
                    </Dialog>
                    <List>
                        {items1.map((data, index) => {
                            return (
                                <ListItem onClick={() => this.handleDialogOpne(index)} style={{ cursor: 'pointer' }}  >
                                    <ListItemText primary={data.name} secondary={"Hi There Wana Meet ?"} />
                                    <IconButton
                                        onClick={() => this.handleDialogOpne(index)}
                                        aria-owns={'menu-appbar'}
                                        aria-haspopup="true"
                                        // onClick={this.handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </ListItem>
                            )
                        })}
                        {/* <ListItem button>
                            <ListItemText primary="Phone ringtone" secondary="Titania" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                        </ListItem> */}
                    </List>
                </Dialog>
            </div>
        );
    }
}

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        meetingList: state.meetingList,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(withStyles(styles)(FullScreenDialog));