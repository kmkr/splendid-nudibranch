import React, {Component} from 'react';
import {connect} from 'react-redux';

import {photoLoaded, fetchPhotos} from '../photos/photo-actions';
import PhotoScroller from '../photos/photo-scroller';
import {selectTag, unselectTag} from '../selected-tags/selected-tags-actions';
import Search from '../search';
import './photo-section.scss';

const margin = 100;

class PhotoSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fixed: false
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchPhotos());
    }

    componentWillReceiveProps({scroll}) {
        if (scroll.pageYOffset > (scroll.innerHeight + margin)) {
            this.setState({
                fixed: true
            });
        } else {
            this.setState({
                fixed: false
            });
        }
    }

    onSelectTag(tagName) {
        this.props.dispatch(selectTag(tagName));
    }

    onUnselectTag(tagName) {
        this.props.dispatch(unselectTag(tagName));
    }

    onPhotoLoad({key}) {
        this.props.dispatch(photoLoaded(key));
    }

    photosBySelectedTags() {
        const {photos, selectedTags} = this.props;
        if (selectedTags.length === 0) {
            return photos.data;
        }

        return photos.data.filter(photo => (
            photo.tags.some(tag => selectedTags.indexOf(tag) > -1)
        ));
    }

    render() {
        const {scroll, selectedTags, photos} = this.props;
        return (
            <div
                id="photo-section"
                style={{marginTop: `${margin}px`}}>
                {false && <div
                    id="search-wrapper"
                    className={this.state.fixed ? 'fixed' : ''}
                    style={{
                        top: this.state.fixed ? 0 : `${scroll.innerHeight + margin}px`
                    }}>
                    <Search
                        selectedTags={selectedTags}
                        photos={photos.data}
                        onDelete={this.onUnselectTag.bind(this)}
                        onSelect={this.onSelectTag.bind(this)} />
                </div>
                }
                <div>
                    <PhotoScroller
                        onPhotoLoad={this.onPhotoLoad.bind(this)}
                        photos={this.photosBySelectedTags()}
                        scroll={scroll} />
                </div>
            </div>
        );
    }
}

function select(state) {
    return {
        photos: state.photos,
        selectedTags: state.selectedTags,
        scroll: state.scroll
    };
}


export default connect(select)(PhotoSection);
