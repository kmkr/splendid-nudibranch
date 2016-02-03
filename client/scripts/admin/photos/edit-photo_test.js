import React from 'react';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(chaiEnzyme());
chai.use(sinonChai);

import EditPhoto from './edit-photo';

describe('<EditPhoto />', () => {
    let props;

    function wrap() {
        return shallow(<EditPhoto {...props} />);
    }

    function btn(text, wrapper = wrap()) {
        return wrapper.findWhere(node => node.text() === text).first();
    }

    beforeEach(() => {
        props = {
            photo: {},
            onUpdateClick: sinon.spy(),
            onDeleteClick: sinon.spy()
        };
    });

    describe('update button', () => {
        it('should be disabled', () => {
            expect(btn('Update')).to.have.attr('disabled', 'disabled');
        });

        it('should delegate on click', () => {
            btn('Update').simulate('click');

            expect(props.onUpdateClick).to.have.been.calledWith(props.photo, {
                description: ''
            });
        });

        describe('with changed state', () => {
            let textarea, wrapper;

            beforeEach(() => {
                wrapper = wrap();
                textarea = wrapper.find('textarea');
                textarea.simulate('change', {target: {value: 'Content'}});
            });

            it('should not be disabled', () => {
                expect(btn('Update', wrapper)).not.to.have.attr('disabled');
            });
        });
    });

    describe('delete button', () => {

        it('should delegate on click', () => {
            btn('Delete').simulate('click');

            expect(props.onDeleteClick).to.have.been.calledWith(props.photo);
        });
    });

});
