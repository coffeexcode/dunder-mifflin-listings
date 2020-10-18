import React from 'react';
import { withStyles } from '@material-ui/core';
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import EditBasicItemDialog from '../EditItemDialogs/EditBasicItemDialog';


const useRowStyles = theme => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

class ListingCardItem extends React.Component {
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

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <TableRow className={classes.root}>
                    <TableCell component="th" scope="row" onClick={() => this.handleOpen(!this.state.open)}> 
                        {this.props.item.name}
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
                <EditBasicItemDialog
                    open={this.state.editDialog.open}
                    close={this.closeEditDialog}
                    item={this.props.item}
                    itemId={this.props.item.id}
                    listId={this.props.listId}
                    saveItem={this.props.saveItem}
                />
            </React.Fragment>
        );
    }
}

export default withStyles(useRowStyles)(ListingCardItem);
