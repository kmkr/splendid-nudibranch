import React, {Component, PropTypes} from 'react';
import AddTag from '../tags/add-tag';
import './edit-photo.scss';

class EditPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTags: [],
            title: props.photo.title || '',
            description: props.photo.description || ''
        };
    }

    titleUpdated(e) {
        this.setState({
            title: e.target.value
        });
    }

    descriptionUpdated(e) {
        this.setState({
            description: e.target.value
        });
    }

    tagAdded(newTag) {
        if (this.props.photo.tags.includes(newTag) || newTag.length < 2) {
            return;
        }

        this.setState({
            newTags: [...this.state.newTags, newTag].sort()
        });
    }

    isDisabled() {
        const {photo} = this.props;
        const descriptionClean = this.state.description === photo.description || !this.state.description;
        const titleClean = this.state.title === photo.title || !this.state.title;
        const tagsClean = this.state.newTags.length === 0;

        return descriptionClean && titleClean && tagsClean;
    }

    update() {
        this.props.onUpdateClick(this.props.photo, {
            title: this.state.title,
            description: this.state.description
        }, this.state.newTags);
        this.setState({
            newTags: []
        });
    }

    render() {
        const {photo, onDeleteClick} = this.props;

        return (
            <div className="edit-photo">
                <input
                    placeholder="Title"
                    value={this.state.title}
                    onChange={this.titleUpdated.bind(this)} />
                <textarea
                    placeholder="Photo description"
                    value={this.state.description}
                    onChange={this.descriptionUpdated.bind(this)}></textarea>

                <div className="tags">
                    {photo.tags.sort().map(tag => <span className="saved" key={tag}>{tag}</span>)}
                    {this.state.newTags.map(tag => <span className="unsaved" key={tag}>{tag}</span>)}

                    <AddTag
                        onAdd={this.tagAdded.bind(this)} />
                </div>

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
