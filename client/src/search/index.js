import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import './search.scss';

import {getMatchingTags, getUniqueTags} from './search-service';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            searchOpen: false,
            matching: []
        };
    }

    onChange(e) {
        const value = e.target.value;

        const matching = getMatchingTags({
            tags: getUniqueTags(this.props.photos),
            exclude: this.props.selectedTags,
            matchWith: value
        });

        this.setState({
            searchInput: value,
            matching
        });
    }

    onKeyUp(e) {
        const backspace = 8;
        if (e.keyCode === backspace && this.state.searchInput === '') {
            console.log('todo: remove tag');
        }
    }

    toggleSearch(val) {
        if (typeof val === 'undefined') {
            val = !this.state.searchOpen;
        }
        const wasOff = !this.state.searchOpen;
        this.setState({
            searchOpen: val
        });

        if (wasOff) {
            this.focusInput();
        }
    }

    focusInput() {
        ReactDOM.findDOMNode(this.refs.searchInput).focus();
    }

    onSelect(tagName) {
        this.setState({
            searchInput: '',
            matching: []
        });
        this.props.onSelect(tagName);
        this.focusInput();
    }

    onBlur() {
        setTimeout(() => {
            if (this.props.selectedTags.length === 0) {
                this.toggleSearch(false);
            }
        }, 300);
    }

    render() {
        return (
            <div id="search">
                <div>
                    <div className={`expandable ${this.state.searchOpen ? 'opened' : 'closed'}`}>

                        {this.props.selectedTags.map(tagName => (
                            <span
                                key={tagName}
                                className="tag"
                                onClick={this.props.onDelete.bind(this, tagName)}>{tagName}</span>
                        ))}

                        <input
                            type="search"
                            ref="searchInput"
                            onChange={this.onChange.bind(this)}
                            onKeyUp={this.onKeyUp.bind(this)}
                            onBlur={this.onBlur.bind(this)}
                            value={this.state.searchInput}
                            placeholder="Search for year, species and places" />
                    </div>

                    <div className="icon"
                        onClick={this.toggleSearch.bind(this)}>Ikon</div>
                </div>

                <div className="search-result-wrapper">
                    <ul className="search-result">
                        {this.state.matching.map(tagName => (
                            <li
                                onClick={this.onSelect.bind(this, tagName)}
                                key={tagName}>{tagName}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    onSelect: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    selectedTags: PropTypes.array.isRequired,
    photos: PropTypes.array.isRequired
};

export default Search;
