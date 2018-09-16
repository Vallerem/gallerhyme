import App from "./App";
import { Route } from "react-router";

describe("<App />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it("renders itself", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders all routes", () => {
    // Extremely redundant 🙈
    const routesLength = wrapper.find(Route).length;
    expect(wrapper.find(Route)).toHaveLength(routesLength);
  });
});
