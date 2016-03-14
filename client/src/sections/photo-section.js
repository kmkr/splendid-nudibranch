import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchPhotos} from '../photos/photo-actions';
import PhotoScroller from '../photos/photo-scroller';
import {selectTag, unselectTag} from '../selected-tags/selected-tags-actions';
import Search from '../search';
import Navbar from '../navbar';
import './photo-section.scss';

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
        if (scroll.pageYOffset > scroll.innerHeight) {
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
        return (
            <div id="photo-section">
                <div
                    id="navbar-wrapper"
                    className={this.state.fixed ? 'fixed' : ''}
                    style={{
                        top: this.state.fixed ? 0 : `${this.props.scroll.innerHeight}px`
                    }}>
                    <Navbar>
                        <Search
                            selectedTags={this.props.selectedTags}
                            photos={this.props.photos.data}
                            onDelete={this.onUnselectTag.bind(this)}
                            onSelect={this.onSelectTag.bind(this)} />
                    </Navbar>
                </div>
                <div>
                    <PhotoScroller
                        photos={this.photosBySelectedTags()}
                        scroll={this.props.scroll} />
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
