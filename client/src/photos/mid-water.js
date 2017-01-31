import React, {PureComponent, PropTypes} from 'react';

import Anchor from '../anchor';
import Arrow from '../arrow';
import smoothScroll from 'smooth-scroll';

import './mid-water.scss';

class MidWaterSection extends PureComponent {

    constructor() {
        super();
        this.scrollToNextPhoto = this.scrollToNextPhoto.bind(this);
    }

    scrollToNextPhoto(e) {
        e.preventDefault();
        smoothScroll.animateScroll('#post-mid-water', null, {
            updateURL: false
        });
    }

    render() {
        const {photos} = this.props;

        const somePhotoLoading = photos
            .some(photo => !photo.loaded);

        return (
            <div>
                {!somePhotoLoading &&
                    <Anchor
                        id="mid-water"
                        name=""
                        className="water-column">

                        <div className="jellyfishes">
                            <img className="jellyfish-1" src="/static/images/jellyfish-white.svg" />
                            <img className="jellyfish-2" src="/static/images/jellyfish-white.svg" />
                            <img className="jellyfish-3" src="/static/images/jellyfish-white.svg" />
                        </div>

                        <div className="wrapper" onClick={this.scrollToNextPhoto}>
                            <div className="link">
                                <p>NO MORE IMAGES FOR YOUR CHOSEN FILTER</p>
                                <a href="#" onClick={this.scrollToNextPhoto}>EXPLORE MORE</a>
                            </div>
                        </div>
                        <Arrow />
                    </Anchor>
                }
            </div>
        );
    }
}

MidWaterSection.propTypes = {
    photos: PropTypes.array.isRequired
};

export default MidWaterSection;
