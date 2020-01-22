import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { HomePage } from '../components/HomePage';
import { configure } from 'enzyme';
import { Link } from 'react-router-dom';
import { MemoryRouter } from 'react-router'
import Adapter from 'enzyme-adapter-react-16';
import { PropTypes } from 'prop-types';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import {spy} from 'sinon';

const middlewares = []
const mockStore = configureStore(middlewares)
configure({ adapter: new Adapter() });
let mockedStore = mockStore({})


describe("Test HomePage component", () => {
  it('uses Router for logout functionality', () => {
    const wrapper = mount(<MemoryRouter><HomePage dispatch={spy()}/></MemoryRouter>, {
                            context: {store: mockedStore},
                            childContextTypes: {store: PropTypes.object.isRequired}});
    const children = wrapper.children();
    expect(children.find(Link)).to.have.length(1);
  });
});
