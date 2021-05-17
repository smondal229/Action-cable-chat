import { Box, ThemeProvider } from '@material-ui/core';
import Layout from './components/Layout';
import theme from './theme';
import store from './store';
import { Provider } from 'react-redux';
import { ActionCableProvider } from 'react-actioncable-provider';
import { WS_URL } from './socket';

function App() {
  return (
    <ActionCableProvider url={WS_URL}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Layout />
        </ThemeProvider>
      </Provider>
    </ActionCableProvider>
  );
}

export default App;
