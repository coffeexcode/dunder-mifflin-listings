import React from 'react';
import ListingCard from './ListingCards/ListingCard';
import { Grid } from '@material-ui/core';

class ListingGrid extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="grid">
                    <Grid container spacing={3}>
                        {this.props.listings.map((listing, index) =>
                            <Grid key={listing.id} item sm={12} md={6}>
                                <ListingCard
                                    {...listing}
                                    deleteList={this.props.deleteList}
                                    addItem={this.props.addItem}
                                    deleteItem={this.props.deleteItem}
                                    saveItem={this.props.saveItem}
                                />
                            </Grid>
                        )
                        }
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

export default ListingGrid;