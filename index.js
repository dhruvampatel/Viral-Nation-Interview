import { AppRegistry } from 'react-native';
import App from './App';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('com.viralnation.interview', () => RNRedux);
