import React from 'react';
import { Paper, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@material-ui/core';
import AdvancedListingCardItem from './AdvancedListingCardItem';
import BasicListingCardItem from './BasicListingCardItem';

class ListingCard extends React.Component {

    handleDelete = () => {
        this.props.deleteList(
            this.props.id
        );
    }

    handleAdd = () => {
        this.props.addItem(
            this.props.id,
            this.props.type,
        );
    }

    render() {
        const isAdvanced = this.props.type === 'advanced';
        return (
            <Paper className="listing-card">
                <div className="listing-title">
                    <Typography>
                        <h1> {this.props.title} </h1>
                    </Typography>
                </div>
                <div className="listing-content">
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    {isAdvanced 
                                    ?
                                        <React.Fragment>
                                            <TableCell> Name </TableCell>
                                            <TableCell align="center">Deadline</TableCell>
                                            <TableCell align="center">Priority</TableCell>
                                            <TableCell align="right"></TableCell>
                                        </React.Fragment>
                                    :
                                        <React.Fragment>
                                            <TableCell> Name </TableCell>
                                            <TableCell align="right"></TableCell>
                                        </React.Fragment>
                                    }

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {isAdvanced
                                    ?   
                                        this.props.items.map((item) =>
                                            <AdvancedListingCardItem
                                                key={item.id}
                                                listId={this.props.id}
                                                listType={this.props.listType}
                                                item={item}
                                                deleteItem={this.props.deleteItem}
                                                saveItem={this.props.saveItem}
                                            />)
                                    :
                                    this.props.items.map((item) => 
                                        <BasicListingCardItem
                                            key={item.id}
                                            listId={this.props.id}
                                            listType={this.props.type}
                                            item={item}
                                            deleteItem={this.props.deleteItem}
                                            saveItem={this.props.saveItem}
                                        />)
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="listing-actions">
                    <Button color="secondary" onClick={this.handleDelete}>
                        Delete List
                    </Button>
                    <Button variant="outlined" color="primary" onClick={this.handleAdd}>
                        Add Item
                    </Button>
                </div>
            </Paper>
        )
    }
}

export default ListingCard;