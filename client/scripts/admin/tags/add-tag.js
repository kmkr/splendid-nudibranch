import React, {Component, PropTypes} from 'react';

class AddTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagInput: ''
        };
    }

    save(tagName) {
        this.props.onAdd(tagName);
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
            <input
                value={this.state.tagInput}
                onBlur={this.onBlur.bind(this)}
                onChange={this.onChange.bind(this)} />
        );
    }
}

AddTag.propTypes = {
    onAdd: PropTypes.func.isRequired
};

export default AddTag;
