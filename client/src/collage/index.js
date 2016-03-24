import React, {PropTypes} from 'react';

function delegate(e, delegatee, ...rest) {
    e.preventDefault();
    delegatee(...rest);
}

const Collage = ({itemClicked, photoLinkClicked}) => (
    <div>
        <div>
            <a href="#" onClick={e => delegate(e, itemClicked, 'ea89-63b3')}>
                <img src="/static/images/collage/1/DSC01725.jpg" />
            </a>
        </div>
        <a href="#" onClick={e => delegate(e, photoLinkClicked)}>All photos</a>
    </div>
);

Collage.propTypes = {
    itemClicked: PropTypes.func.isRequired,
    photoLinkClicked: PropTypes.func.isRequired
};

export default Collage;
