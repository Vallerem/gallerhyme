import ConnectedUserList, { UsersList } from "./UsersList";

import { Provider } from "react-redux";
import configureStore from "../../redux/store";

const store = configureStore();

describe("<UserList/>", () => {
  describe("renders itsel", () => {
    it("without Redux", () => {
      const wrapper = shallow(<UsersList />);
      expect(wrapper).toMatchSnapshot();
    });
    it("with Redux", () => {
      const wrapper = shallow(<ConnectedUserList store={store} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("triggers", () => {
    it("componentDidMount method", () => {
      const spy = jest.spyOn(ConnectedUserList.prototype, "componentDidMount");
      const wrapper = shallow(<ConnectedUserList store={store} />).dive();
      expect(spy).toHaveBeenCalled();
    });
  });
});
