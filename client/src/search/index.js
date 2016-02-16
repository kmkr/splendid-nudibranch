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

    toggleSearch() {
        const wasOff = !this.state.searchOpen;
        this.setState({
            searchOpen: !this.state.searchOpen
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
        /*
            Goal: hide search when the user is finished searching.

            Since a part of the search is to select search results, blur fires too fast. Therefore,
            as a workaround, onSelect sets focus back to the field and this method waits a bit to
            see whether the searchInput still has focus.
        */
        setTimeout(() => {
            if (ReactDOM.findDOMNode(this.refs.searchInput) !== document.activeElement) {
                this.toggleSearch();
            }
        }, 300);
    }

    render() {
        return (
            <div id="search">
                {this.props.selectedTags.map(tagName => (
                    <span
                        key={tagName}
                        onClick={this.props.onDelete.bind(this, tagName)}>{tagName}</span>
                ))}

                <div className="icon"
                    onClick={this.toggleSearch.bind(this)}>Ikon</div>
                <input
                    type="search"
                    ref="searchInput"
                    className={this.state.searchOpen ? 'opened' : 'closed'}
                    onChange={this.onChange.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    value={this.state.searchInput}
                    placeholder="Search for year, species and places" />

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
