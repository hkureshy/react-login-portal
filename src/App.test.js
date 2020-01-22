import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { App } from './App';
import { configure } from 'enzyme';
import { Link } from 'react-router-dom';
import { MemoryRouter } from 'react-router'
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme';
import { PropTypes } from 'prop-types';
import renderer from 'react-test-renderer';
import {spy} from 'sinon';
import { Provider } from 'react-redux';
import { store } from './helpers';
import configureStore from 'redux-mock-store'
import { Router, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute.js';

configure({ adapter: new Adapter() });
const middlewares = []
const mockStore = configureStore(middlewares)
let mockedStore = mockStore({})

export const CustomProvider = ({ children }) => {
  return (
    <MemoryRouter>
      <App dispatch={spy()}/>
    </MemoryRouter>
  );
};

describe("Test AppComponent", () => {
  it('check route, dispatch and store setup for component', () => {
    // test will not compile if component is not correctly setup
    const wrapper = mount(<CustomProvider />, {
      context: {store},
      childContextTypes: {store: PropTypes.object.isRequired}});
    expect(true).toBeTruthy();
  });

  it('check for redirections', () => {
    const wrapper = mount(<CustomProvider />, {
      context: {store},
      childContextTypes: {store: PropTypes.object.isRequired}});
    let a = wrapper.find(PrivateRoute);
    let b = wrapper.find(Route);
    expect(a.length).toEqual(1);
    expect(b.length).toEqual(3);
  });
});
