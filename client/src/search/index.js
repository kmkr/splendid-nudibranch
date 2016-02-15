import React, {Component, PropTypes} from 'react';
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
        this.setState({
            searchOpen: !this.state.searchOpen
        });
    }

    onSelect(tagName) {
        this.setState({
            searchInput: '',
            matching: []
        });
        this.props.onSelect(tagName);
    }

    render() {
        return (
            <div id="search">
                {this.props.selectedTags.map(tagName => (
                    <span
                        key={tagName}
                        onClick={this.props.onDelete.bind(this, tagName)}>{tagName}</span>
                ))}

                <div style={{position: 'relative'}}>
                    <div className="icon"
                        onClick={this.toggleSearch.bind(this)}>Ikon</div>
                    <input
                        type="search"
                        className={this.state.searchOpen ? 'opened' : 'closed'}
                        onChange={this.onChange.bind(this)}
                        value={this.state.searchInput}
                        placeholder="Search for year, species and places" />
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
