import React, {PropTypes} from 'react';

import '../sections/water-column.scss';

const MidWaterSection = ({photos}) => {

    const somePhotoLoading = photos
        .some(photo => !photo.loaded);

    return (
        <div>
            {!somePhotoLoading &&
                <div id="mid-water" className="water-column">
                    <div className="link-wrapper">
                        <a href="#">EXPLORE MORE</a>
                    </div>
                </div>
            }
        </div>
    );
};

MidWaterSection.propTypes = {
    photos: PropTypes.array.isRequired
};

export default MidWaterSection;
