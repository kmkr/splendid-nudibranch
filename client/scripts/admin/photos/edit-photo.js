import React, {Component, PropTypes} from 'react';
import EditTags from '../tags/edit-tags';

class EditPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTags: [],
            description: props.photo.description || ''
        };
    }

    descriptionUpdated(e) {
        this.setState({
            description: e.target.value
        });
    }

    tagAdded(newTag) {
        this.setState({
            newTags: [...this.state.newTags, newTag].sort()
        });
    }

    isDisabled() {
        const {photo} = this.props;
        const photoClean = this.state.description === photo.description || !this.state.description;
        const tagsClean = this.state.newTags.length === 0;

        return photoClean && tagsClean;
    }

    update() {
        this.props.onUpdateClick(this.props.photo, {description: this.state.description}, this.state.newTags);
        this.setState({
            newTags: []
        });
    }

    render() {
        const {photo, onDeleteClick} = this.props;

        return (
            <div>
                <textarea
                    placeholder="Photo description"
                    value={this.state.description}
                    onChange={this.descriptionUpdated.bind(this)}></textarea>

                <ul>
                    {photo.tags.sort().map(tag => <li key={tag}>{tag}</li>)}
                    {this.state.newTags.map(tag => <li key={tag}>{tag} (unsaved)</li>)}
                </ul>
                <EditTags
                    onAdd={this.tagAdded.bind(this)}
                    tags={photo.tags} />
                <button
                    disabled={this.isDisabled()}
                    onClick={this.update.bind(this)}>
                    Update
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
