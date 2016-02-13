import React, {Component, PropTypes} from 'react';

class EditTags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagInput: ''
        };
    }

    // todo: tar ikke hensyn til parent state. flytt denne opp
    exists(tagName) {
        return this.props.tags.some(tag => tag === tagName);
    }

    save(tagName) {
        if (!this.exists(tagName) && tagName.length > 2) {
            this.props.onAdd(tagName);
        }
        this.setState({
            tagInput: ''
        });
    }

    onBlur(e) {
        this.save(e.target.value);
    }

    onChange(e) {
        const input = e.target.value;
        const leadingSpace = /\s$/;
        if (input.match(leadingSpace)) {
            this.save(input.trim());
        } else {
            this.setState({
                tagInput: input
            });
        }
    }

    render() {
        return (
            <div>
                <input
                    value={this.state.tagInput}
                    onBlur={this.onBlur.bind(this)}
                    onChange={this.onChange.bind(this)} />
            </div>
        );
    }
}

EditTags.propTypes = {
    onAdd: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired
};

export default EditTags;
