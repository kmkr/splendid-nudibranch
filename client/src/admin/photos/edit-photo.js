import React, {Component, PropTypes} from 'react';
import AddTag from '../tags/add-tag';
import './edit-photo.scss';

class EditPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTags: [],
            title: props.photo.title || '',
            description: props.photo.description || '',
            latin: props.photo.latin || '',
            location: props.photo.location || ''
        };
    }

    attrUpdated(field, e) {
        this.setState({
            [field]: e.target.value
        });
    }

    tagAdded(newTags) {
        if (newTags.constructor !== Array) {
            newTags = [newTags];
        }


        this.setState({
            newTags: [
                ...this.state.newTags,
                ...newTags.filter(t => (
                    !this.props.photo.tags.includes(t) &&
                    !this.state.newTags.includes(t) &&
                    t.length > 2
                ))
            ].sort()
        });
    }

    isClean() {
        const {photo} = this.props;
        const descriptionClean = this.state.description === photo.description || !this.state.description;
        const titleClean = this.state.title === photo.title || !this.state.title;
        const latinClean = this.state.latin === photo.latin || !this.state.latin;
        const locationClean = this.state.location === photo.location || !this.state.location;
        const tagsClean = this.state.newTags.length === 0;

        return descriptionClean && titleClean && tagsClean && latinClean && locationClean;
    }

    update() {
        const {title, description, latin, location} = this.state;
        this.props.onUpdateClick(this.props.photo, {
            title,
            description,
            latin,
            location
        }, this.state.newTags);
        this.setState({
            newTags: []
        });
    }

    render() {
        const {photo, onDeleteClick} = this.props;

        return (
            <div className="edit-photo row">
                <div className="col-sm-10">
                    <input
                        placeholder="Title"
                        value={this.state.title}
                        onChange={this.attrUpdated.bind(this, 'title')} />
                    <input
                        placeholder="Location"
                        value={this.state.location}
                        onChange={this.attrUpdated.bind(this, 'location')} />
                    <input
                        placeholder="Latin"
                        value={this.state.latin}
                        onChange={this.attrUpdated.bind(this, 'latin')} />
                    <textarea
                        placeholder="Photo description"
                        value={this.state.description}
                        onChange={this.attrUpdated.bind(this, 'description')}></textarea>

                    <div className="tags">
                        <AddTag
                            onAdd={this.tagAdded.bind(this)} />

                        {photo.tags.sort().map(tag => <span className="saved" key={tag}>{tag}</span>)}
                        {this.state.newTags.map(tag => <span className="unsaved" key={tag}>{tag}</span>)}
                    </div>
                </div>

                <div className="col-sm-4">
                    <button
                        disabled={photo.deleting || photo.updating || this.isClean()}
                        className={photo.updating ? 'active' : ''}
                        onClick={this.update.bind(this)}>
                        Update
                    </button>

                    <button
                        className={`danger ${photo.deleting ? 'active' : ''}`}
                        disabled={photo.deleting || photo.updating}
                        onClick={onDeleteClick.bind(this, photo)}>
                        Delete
                    </button>

                    {photo.error && <p style={{color: 'red'}}>Something bad happened!</p>}
                </div>
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
