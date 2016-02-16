import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchPhotos} from '../photos/photo-actions';
import PhotoScroller from '../photos/photo-scroller';
import {selectTag, unselectTag} from '../selected-tags/selected-tags-actions';
import Search from '../search';
import './photo-section.scss';

class PhotoPage extends Component {

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

    render() {
        return (
            <div id="photo-section">
                <div
                    id="search-wrapper"
                    className={this.state.fixed ? 'fixed' : ''}
                    style={{
                        top: this.state.fixed ? 0 : `${this.props.scroll.innerHeight}px`
                    }}>
                    <Search
                        selectedTags={this.props.selectedTags}
                        photos={this.props.photos.data}
                        onDelete={this.onUnselectTag.bind(this)}
                        onSelect={this.onSelectTag.bind(this)} />
                </div>
                <div className="col-sm-offset-2">
                    <PhotoScroller
                        photos={this.props.photos.data}
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


export default connect(select)(PhotoPage);
