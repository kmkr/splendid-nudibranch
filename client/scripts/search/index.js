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
                <input
                    type="search"
                    onKeyUp={this.keyUp.bind(this)}
                    placeholder="Search for year, species and places" />

                <div className="search-result-wrapper">
                    <ul className="search-result">
                        {this.state.matching.map(m => <li style={{color: '#000'}} key={m}>{m}</li>)}
                    </ul>
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    photos: PropTypes.array.isRequired
};

export default Search;
