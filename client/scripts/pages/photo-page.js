import React, {Component} from 'react';
import {connect} from 'react-redux';

import Search from '../search';
import PhotoScroller from '../photos/photo-scroller';
import {selectTag, unselectTag} from '../selected-tags/selected-tags-actions';

class PhotoPage extends Component {

    onSelectTag(tagName) {
        this.props.dispatch(selectTag(tagName));
    }

    onUnselectTag(tagName) {
        this.props.dispatch(unselectTag(tagName));
    }

    render() {
        return (
            <div>
                <div id="logo">Splendid Nudibranch</div>
                <Search
                    selectedTags={this.props.selectedTags}
                    photos={this.props.photos.data}
                    onDelete={this.onUnselectTag.bind(this)}
                    onSelect={this.onSelectTag.bind(this)} />
                <div className="col-sm-offset-2">
                    <PhotoScroller photos={this.props.photos.data} />
                </div>
            </div>
        );
    }
}

function select(state) {
    return {
        photos: state.photos,
        selectedTags: state.selectedTags
    };
}


export default connect(select)(PhotoPage);
