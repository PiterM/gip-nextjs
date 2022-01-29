import * as React from 'react';
import { Provider } from 'react-redux';
import store from './Store';

export default ({ children }: any) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  );
};