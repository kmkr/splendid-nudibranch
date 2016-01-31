import React, {Component, PropTypes} from 'react';

class EditPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.photo.description || ''
        };
    }

    descriptionUpdated(e) {
        this.setState({
            description: e.target.value
        });
    }

    render() {
        const {photo, onUpdateClick, onDeleteClick} = this.props;

        return (
            <div>
                <textarea
                    placeholder="Photo description"
                    value={this.state.description}
                    onChange={this.descriptionUpdated.bind(this)}></textarea>

                <button
                    disabled={this.state.description === photo.description}
                    onClick={onUpdateClick.bind(this, photo, {description: this.state.description})}>
                    Update photo
                </button>

                <button onClick={onDeleteClick.bind(this, photo)}>
                    Delete
                </button>
            </div>
        );
    }
}

EditPhoto.propTypes = {
    photo: PropTypes.object.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onUpdateClick: PropTypes.func.isRequired
};

export default EditPhoto;
