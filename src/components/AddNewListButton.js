import React from 'react';
import { Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddNewListingDialog from './AddNewListingDialog';

const useStyles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    faButton: {
        margin: '0',
        top: '100px',
        right: '40px',
        bottom: 'auto',
        left: 'auto',
        position: 'fixed',
        padding: '1.5rem'
    }
});

export class AddNewListButton extends React.Component {
    state = {
        dialogOpen: false
    }

    openAddNewListingDialog = () => {
        if (!this.state.dialogOpen) {
            this.setState({
                dialogOpen: true
            });
        }
    }

    cancel = () => {
        this.setState({
            dialogOpen: false
        });
    }

    create = (name, type) => {
        this.props.onAddNewListing(name, type);
        this.setState({
            dialogOpen: false
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Fab variant="extended" color="primary" className={classes.faButton} onClick={this.openAddNewListingDialog}>
                    <AddIcon className={classes.extendedIcon} aria-label="add"/>
                    Create New List
                </Fab>
                <AddNewListingDialog
                    open={this.state.dialogOpen}
                    onCreate={this.create}
                    onCancel={this.cancel}
                />
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(AddNewListButton);