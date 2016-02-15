import React from 'react';
import chai, {expect} from 'chai';
import {shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());

import ListPhotos from './list-photos';

describe('<ListPhotos />', () => {
    let photos, wrapper;

    beforeEach(() => {
        photos = [{
            key: 'key',
            small: '/small',
            description: 'Photo description'
        }];
        wrapper = shallow(<ListPhotos photos={photos} />);
    });

    it('should contain image', () => {
        expect(wrapper).to.contain(<img src="/small" />);
    });

    it('should contain description', () => {
        expect(wrapper).to.contain(<p>Photo description</p>);
    });
});
