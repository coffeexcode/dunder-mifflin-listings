import React from 'react';
import { withStyles } from '@material-ui/core';
import { TableRow, TableCell, Collapse, Box, IconButton, Chip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import EditAdvancedItemDialog from '../EditItemDialogs/EditAdvancedItemDialog';
import Moment from 'moment';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = theme => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    Low: {
        backgroundColor: '#B1E7B7'
    },
    Regular: {
        backgroundColor: '#7E9181'
    },
    Medium: {
        backgroundColor: '#C7CEDB'
    },
    High: {
        backgroundColor: '#EDC79B'
    },
    Critical: {
        backgroundColor: '#CA6680'
    }
});

class AdvancedListingCardItem extends React.Component {
    state = {
        open: false,
        editDialog: {
            open: false
        }
    }

    closeEditDialog = () => {
        this.setState({
            editDialog: {
                open: false,
            }
        });
    }

    saveItem = (listId, itemId, item) => {
        this.closeEditDialog();

        this.props.saveItem(
            listId, itemId, item
        );
    }
    handleDeleteListingItem = () => {
        this.props.deleteItem(
            this.props.listId,
            this.props.item.id
        )
    }

    openEditDialog = () => {
        this.setState({
            editDialog: {
                open: true
            }
        });
    }

    handleOpen(open) {
        this.setState({
            open: open
        })
    }

    renderPriorityChip() {
        const { classes } = this.props;

        if (this.props.item.priority === 'Low') {
            return <Chip label={this.props.item.priority} className={classes.Low}/>
        } else if (this.props.item.priority === 'Regular') {
            return <Chip label={this.props.item.priority} className={classes.Regular}/>
        } else if (this.props.item.priority === 'Medium') {
            return <Chip label={this.props.item.priority} className={classes.Medium}/>
        } else if (this.props.item.priority === 'High') {
            return <Chip label={this.props.item.priority} className={classes.High}/>
        } else if (this.props.item.priority === 'Critical') {
            return <Chip label={this.props.item.priority} className={classes.Critical}/>
        } else {
            return <span></span>
        }
    }

    renderDate() {
        var date = Moment(this.props.item.deadline).format('MMMM Do, YYYY h:mm A');

        if (date === 'Invalid date') {
            return '';
        } else return date;
    }

    render() {
        const { classes } = this.props;
        const isDescriptionEmpty = this.props.item.description === '';

        Moment.locale('en');

        return (
            <React.Fragment>
                <TableRow className={classes.root}>
                    <TableCell component="th" scope="row" onClick={() => this.handleOpen(!this.state.open)}> 
                    {!isDescriptionEmpty &&
                        <IconButton aria-label="expand row" size="small">
                            {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    }
                    {this.props.item.name}
                    </TableCell>
                    <TableCell align="center">  
                        { this.renderDate() }
                    </TableCell>
                    <TableCell align="center">
                        { this.renderPriorityChip() }
                    </TableCell>
                    <TableCell align="right">
                        <IconButton aria-label="delete" onClick={this.handleDeleteListingItem}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton aria-label="edit" onClick={this.openEditDialog}>
                            <CreateIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
                {!isDescriptionEmpty &&
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                                <Box margin={1}>
                                    <div>
                                        {this.props.item.description}
                                    </div>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                }
                <EditAdvancedItemDialog
                    open={this.state.editDialog.open}
                    close={this.closeEditDialog}
                    item={this.props.item}
                    itemId={this.props.item.id}
                    listId={this.props.listId}
                    saveItem={this.saveItem}
                />
            </React.Fragment>
        );
    }
}

export default withStyles(useRowStyles)(AdvancedListingCardItem);
