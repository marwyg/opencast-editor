import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './redux/store'

import { init } from './config'
import { sleep } from './util/utilityFunctions'

import { GlobalHotKeys } from 'react-hotkeys';

import "@fontsource-variable/roboto-flex";

import './i18n/config';

import '@opencast/appkit/dist/colors.css'
import { ColorSchemeProvider } from '@opencast/appkit';

// Load config here
// Load the rest of the application and try to fetch the settings file from the
// server.
const initialize = Promise.race([
  init(),
  sleep(300),
]);

const render = (body: JSX.Element) => {
  ReactDOM.render(body, document.getElementById('root'));
};

initialize.then(

  () => {
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          {/* Workaround for getApplicationKeyMap based on https://github.com/greena13/react-hotkeys/issues/228 */}
          <GlobalHotKeys>
            <ColorSchemeProvider>
              <App />
            </ColorSchemeProvider>
          </GlobalHotKeys>
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
    );
  },

  // This error case is vey unlikely to occur.
  e => render(<p>
    {`Fatal error while loading app: ${e.message}`}
    <br />
    This might be caused by a incorrect configuration by the system administrator.
  </p>),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

