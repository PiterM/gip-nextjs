import * as React from "react";
import { Provider } from "react-redux";
import store from "./Store";

const Wrapper = ({ children }: any) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Wrapper;
