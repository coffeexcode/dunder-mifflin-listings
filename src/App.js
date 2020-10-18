import React from 'react';
import './App.css';
import AppHeader from './components/Header';
import ListingGrid from './components/ListingGrid';
import AddNewListButton from './components/AddNewListButton';
import { Container } from '@material-ui/core';
import AddNewItemDialog from './components/AddNewItemDialogs/AddNewItemDialog';

class App extends React.Component {
  state = {
    listings: [],
    addDialog: {
      open: false,
      listId: -1,
      listType: '',
    }
  }

  openAddDialog = (listId, listType) => {
    console.log(listId);
    console.log(listType);

    if (!this.state.addDialog.open) {
      this.setState({
        addDialog: {
          open: true,
          listId: listId,
          listType: listType
        }
      });
    }
  }

  closeAddDialog = () => {
    this.setState({
      addDialog: {
        open: false,
        listId: -1,
        listType: '',
      }
    })
  }

  addNewListing = (listName, type) => {
    this.setState({
      listings: [...this.state.listings, {
        id: Date.now(),
        title: listName,
        type: type,
        items: []
      }]
    });
  }

  deleteList = (listId) => {
    this.setState({
      listings: this.state.listings.filter(({ id }) => id !== listId)
    });
  }

  addListingItem = (listId, item) => {
    let currentListings = this.state.listings;
    let toEdit = currentListings.find(({ id }) => id === listId);
    
    toEdit.items.push({
      id: Date.now(),
      name: item.name,
      deadline: item.deadline,
      priority: item.priority,
      description: item.description
    });

    this.setState({
      listings: currentListings,
      addDialog: {
        open: false,
        listId: -1,
      }
    });
  }

  saveItem = (listId, itemId, item) => {
    let listToEditIndex = this.state.listings.findIndex(({id}) => id === listId);
    let itemToEditIndex = this.state.listings[listToEditIndex].items.findIndex(({id}) => id === itemId);

    let newListings = [...this.state.listings];

    newListings[listToEditIndex].items[itemToEditIndex] = item;

    this.setState({
      listings: newListings
    });
  }

  deleteItem = (listId, itemId) => {
    let currentListings = this.state.listings;
    let toDeleteFrom = currentListings.find(({ id }) => id === listId);
    let afterDelete = toDeleteFrom.items.filter(({ id }) => id !== itemId);

    toDeleteFrom.items = afterDelete;

    this.setState({
      listings: currentListings
    });
  }

  getList = (listId) => {
    return this.state.listings.find(({id}) => id === listId);
  }

  render() {
    return (
      <div className="App">
        <AppHeader></AppHeader>
        <Container maxWidth="xl">
          <AddNewListButton
            onAddNewListing={this.addNewListing}
          />
          <ListingGrid
            listings={this.state.listings}
            deleteList={this.deleteList}
            addItem={this.openAddDialog}
            deleteItem={this.deleteItem}
            saveItem={this.saveItem}
          >
          </ListingGrid>
          <AddNewItemDialog 
            isOpen={this.state.addDialog.open}
            listId={this.state.addDialog.listId}
            listType={this.state.addDialog.listType}
            add={this.addListingItem}
            close={this.closeAddDialog}
          />
        </Container>
      </div>
    );
  }
}

export default App;
