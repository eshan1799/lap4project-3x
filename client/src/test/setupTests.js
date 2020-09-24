import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";

configure({ adapter: new Adapter() });

global.React = React;
global.shallow = shallow;
global.sinon = sinon;
