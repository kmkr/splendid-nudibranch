import React, {Component, PropTypes} from 'react';
import './search.scss';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            matching: []
        };
    }

    getTags() {
        return this.props.photos.map(p => p.tags)
            .reduce((a, b) => a.concat(b), [])
            .sort()
            .filter((el, i, a) => {
                if (i === a.indexOf(el)) {
                    return 1;
                } else {
                    return 0;
                }
            });
    }

    keyUp(e) {
        const value = e.target.value;
        let matching = [];

        if (value.length > 0) {
            matching = this.getTags().filter(t => t.match(value));
        }

        this.setState({
            searchInput: value,
            matching
        });
    }

    render() {
        return (
            <div id="search">
                {this.props.selectedTags.map(tagName => (
                    <span
                        key={tagName}
                        onClick={() => this.props.onDelete(tagName)}>{tagName}</span>
                ))}
                <input
                    type="search"
                    onKeyUp={this.keyUp.bind(this)}
                    placeholder="Search for year, species and places" />

                <div className="search-result-wrapper">
                    <ul className="search-result">
                        {this.state.matching.map(tagName => (
                            <li
                                style={{color: '#000'}}
                                onClick={() => this.props.onSelect(tagName)}
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
