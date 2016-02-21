import React from 'react';
import {connect} from 'react-redux';
import './mid-water-section.scss';

const MidWaterSection = ({selectedTags}) => (
    selectedTags.length ?
        <div id="mid-water-section">
            <p>You're at the end of the current active filter, but there are more photos below.</p>
        </div> : <span />
);

function select(state) {
    return {
        selectedTags: state.selectedTags
    };
}

export default connect(select)(MidWaterSection);
