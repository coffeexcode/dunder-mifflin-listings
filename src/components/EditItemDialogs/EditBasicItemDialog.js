import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core';

const useStyles = theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
});

class EditItemDialog extends React.Component {
    state = {
        name: this.props.item.name,
    }

    resetState = () => {
        this.setState({
            name: this.props.item.name,
        });
    }

    handleCancel = () => {
        this.props.close();

        this.resetState();
    }

    handleSave = (event) => {
        event.preventDefault();

        const item = {
            id: this.props.itemId,
            name: this.state.name,
        }

        this.props.saveItem(
            this.props.listId,
            this.props.itemId,
            item
        );

        this.props.close();

        this.resetState();
    }

    handleNameChanged = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.handleCancel} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="md">
                <form onSubmit={this.handleSave}>
                    <DialogTitle id="form-dialog-title">
                        <span>Edit List Item</span>
                    </DialogTitle>
                    <DialogContent>
                        <div>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Item Name"
                                type="text"
                                fullWidth
                                value={this.state.name}
                                onChange={this.handleNameChanged}
                                required
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={this.handleCancel}>
                            Cancel
                    </Button>
                        <Button variant="outlined" color="primary" type="submit">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

export default withStyles(useStyles)(EditItemDialog);