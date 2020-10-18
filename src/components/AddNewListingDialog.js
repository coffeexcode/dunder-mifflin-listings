import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

const useStyles = theme => ({
    cancelButton: {
        float: 'left',
    },
    last: {
        float: 'right',
    },
    textfield: {
        marginBottom: '0.5rem'
    }
});

class AddNewListingDialog extends React.Component {
    state = {
        name: '',
        type: 'basic',
    }

    handleCancel = () => {
        this.props.onCancel();
    }

    handleCreate = (event) => {
        event.preventDefault();

        this.props.onCreate(
            this.state.name,
            this.state.type,
        );

        this.setState({
            name: '',
            type: 'basic'
        });
    }

    handleInputChanged = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    handleTypeChanged = (event) => {
        this.setState({
            type: event.target.value
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <Dialog open={this.props.open} onClose={this.handleCancel} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="md">
                <form onSubmit={this.handleCreate}>
                    <DialogTitle id="form-dialog-title">Create New List</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter name for new list
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="List Name"
                            type="text"
                            fullWidth
                            value={this.state.name}
                            onChange={this.handleInputChanged}
                            required
                            className={classes.textfield}
                        />
                        <div className="seperator"></div>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">List Type</FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" value={this.state.type} onChange={this.handleTypeChanged}>
                                <FormControlLabel value="basic" control={<Radio />} label="Basic" />
                                <FormControlLabel value="advanced" control={<Radio />} label="Advanced" />
                            </RadioGroup>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={this.handleCancel} className={classes.cancelButton}>
                            Cancel
          </Button>
                        <Button variant="outlined" color="primary" type="submit" className={classes.last}>
                            Create
          </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

export default withStyles(useStyles)(AddNewListingDialog);