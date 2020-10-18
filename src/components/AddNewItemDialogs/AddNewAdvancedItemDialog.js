import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core';

const useStyles = theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    form: {
        padding: '0.5rem'
    }
});

class AddNewAdvancedItemDialog extends React.Component {
    state = {
        name: '',
        deadline: '',
        priority: '',
        description: '',
    }

    resetState = () => {
        this.setState({
            name: '',
            deadline: '',
            priority: '',
            description: '',
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
            deadline: this.state.deadline,
            priority: this.state.priority,
            description: this.state.description
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

    handleDeadlineChanged = (event) => {
        this.setState({
            deadline: event.target.value
        });
    }

    handlePriorityChanged = (event) => {
        this.setState({
            priority: event.target.value
        });
    }

    handleDescriptionChanged = (event) => {
        this.setState({
            description: event.target.value
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <Dialog open={this.props.isOpen} onClose={this.handleCancel} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="md" className={classes.form}>
                <form onSubmit={this.handleSave}>
                    <DialogTitle id="form-dialog-title"> <span>Create New List Item</span> </DialogTitle>
                    <DialogContent>
                    <Grid container spacing={2}>
                            <Grid item xs={12}>
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
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="datetime-local"
                                    label="Deadline"
                                    type="datetime-local"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={this.state.deadline}
                                    onChange={this.handleDeadlineChanged}
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl className={classes.formControl} fullWidth={true}>
                                    <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.priority}
                                        onChange={this.handlePriorityChanged}
                                        fullWidth={true}
                                    >
                                        <MenuItem value={""}>None</MenuItem>
                                        <MenuItem value={"Low"}>Low</MenuItem>
                                        <MenuItem value={"Regular"}>Regular</MenuItem>
                                        <MenuItem value={"Medium"}>Medium</MenuItem>
                                        <MenuItem value={"High"}>High</MenuItem>
                                        <MenuItem value={"Critical"}>Critical</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    rows={2}
                                    variant="outlined"
                                    value={this.state.description}
                                    onChange={this.handleDescriptionChanged}
                                    fullWidth={true}
                                />
                            </Grid>
                        </Grid>
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

export default withStyles(useStyles)(AddNewAdvancedItemDialog);