import React from 'react';
import AddNewAdvancedItemDialog from './AddNewAdvancedItemDialog';
import AddNewBasicItemDialog from './AddNewBasicItemDialog';

class AddNewItemDialog extends React.Component {

    render() {
        const isAdvanced = this.props.listType === 'advanced';

        if (isAdvanced) {
            return <AddNewAdvancedItemDialog
                isOpen={this.props.isOpen}
                listId={this.props.listId}
                listType={this.props.listType}
                close={this.props.close}
                add={this.props.add}
            />
        } else {
            return <AddNewBasicItemDialog
                isOpen={this.props.isOpen}
                listId={this.props.listId}
                listType={this.props.listType}
                close={this.props.close}
                add={this.props.add}
            />
        }
    }
}

export default AddNewItemDialog;