import React, {PureComponent} from 'react';

import SmallCollage from '../collage/small-collage';

class CollageSection extends PureComponent {
    render() {
        return (
            <div id="collage-section">
                <SmallCollage />
            </div>
        );
    }
}

export default CollageSection;
