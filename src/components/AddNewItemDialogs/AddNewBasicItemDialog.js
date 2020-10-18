import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


class AddNewBasicItemDialog extends React.Component {
    state = {
        name: '',
    }

    resetState = () => {
        this.setState({
            name: '',
        });
    }

    handleCancel = () => {
        this.props.close();

        this.resetState();
    }

    handleSave = (event) => {
        event.preventDefault();

        const item = {
            name: this.state.name,
        }

        this.props.add(
            this.props.listId,
            item
        );

        this.resetState();
    }

    handleNameChanged = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    render() {
        return (
            <Dialog open={this.props.isOpen} onClose={this.handleCancel} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="md">
                <form onSubmit={this.handleSave}>
                    <DialogTitle id="form-dialog-title"> <span>Create New List Item</span> </DialogTitle>
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
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

export default AddNewBasicItemDialog;