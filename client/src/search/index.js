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
            matching: [],
            focusMatchingTag: -1
        };
    }

    onChange(e) {
        const value = e.target.value;
        this.updateMatching(value);
    }

    updateMatching(value) {
        const matching = getMatchingTags({
            tags: getUniqueTags(this.props.photos),
            exclude: this.props.selectedTags,
            matchWith: value
        });

        this.setState({
            searchInput: value,
            matching,
            focusMatchingTag: -1
        });
    }

    onKeyUp(e) {
        const backspace = 8;
        const arrowDown = 40;
        const arrowUp = 38;
        const enter = 13;
        const esc = 27;

        switch (e.keyCode) {
        case backspace:
            if (this.props.selectedTags.length && !this.state.searchInput) {
                this.props.onDelete(this.props.selectedTags[this.props.selectedTags.length - 1]);
            }
            break;
        case arrowDown:
            if (this.state.matching.length) {
                this.setState({
                    focusMatchingTag: Math.min(this.state.matching.length - 1, this.state.focusMatchingTag + 1)
                });
            }
            break;
        case arrowUp:
            if (this.state.matching.length) {
                this.setState({
                    focusMatchingTag: Math.max(-1, this.state.focusMatchingTag - 1)
                });
            }
            break;
        case enter:
            if (this.state.focusMatchingTag > -1) {
                this.props.onSelect(this.state.matching[this.state.focusMatchingTag]);
                this.updateMatching();
            }
            break;
        case esc:
            if (this.props.selectedTags.length === 0) {
                this.toggleSearch(false);
            }
            break;
        default:

        }
    }

    getInputDom() {
        return ReactDOM.findDOMNode(this.refs.searchInput);
    }

    toggleSearch(val) {
        this.setState({
            searchOpen: val
        });

        this.updateMatching();

        if (val) {
            this.getInputDom().focus();
        } else {
            this.getInputDom().blur();
        }
    }

    onSelect(tagName) {
        this.setState({
            searchInput: '',
            matching: []
        });
        this.props.onSelect(tagName);
        this.getInputDom().focus();
    }

    onBlur() {
        setTimeout(() => {
            if (this.props.selectedTags.length === 0) {
                this.toggleSearch(false);
            }
        }, 400);
    }

    render() {
        return (
            <div id="search">
                <div className="search">
                    <div className={`expandable ${this.state.searchOpen ? 'opened' : 'closed'}`}>

                        <div className="tags">
                            {this.props.selectedTags.map(tagName => (
                                <span
                                    key={tagName}
                                    className="tag"
                                    onClick={this.props.onDelete.bind(this, tagName)}>{tagName}</span>
                            ))}
                        </div>

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
                        onClick={this.toggleSearch.bind(this, !this.state.searchOpen)}>Ikon</div>
                </div>

                <div className="search-result-wrapper">
                    <ul className="search-result">
                        {this.state.matching.map((tagName, index) => (
                            <li
                                onClick={this.onSelect.bind(this, tagName)}
                                className={this.state.focusMatchingTag === index ? 'selected' : ''}
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
