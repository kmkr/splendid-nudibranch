import React, {PropTypes} from 'react';

import Anchor from '../anchor';

import '../sections/water-column.scss';

const MidWaterSection = ({photos}) => {

    const somePhotoLoading = photos
        .some(photo => !photo.loaded);

    return (
        <div>
            {!somePhotoLoading &&
                <Anchor
                    id="mid-water"
                    name=""
                    className="water-column">

                    <div className="link-wrapper">
                        <a href="#">EXPLORE MORE</a>
                    </div>
                </Anchor>
            }
        </div>
    );
};

MidWaterSection.propTypes = {
    photos: PropTypes.array.isRequired
};

export default MidWaterSection;
