import React from 'react';
import chai, {expect} from 'chai';
import {shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(chaiEnzyme());
chai.use(sinonChai);

import PhotoUploader from './photo-uploader';

describe('<PhotoUploader />', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            onAddPhoto: sinon.spy()
        };
        wrapper = shallow(<PhotoUploader {...props} />);
    });

    it('should have file input', () => {
        expect(wrapper.find('input')).to.be.present();
    });

    it('should delegate on change', () => {
        wrapper.simulate('change', {
            target: {
                files: [{}]
            }
        });

        expect(props.onAddPhoto).to.have.been.called;
    });

});
