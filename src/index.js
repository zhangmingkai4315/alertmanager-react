import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter }  from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import { IntlProvider } from 'react-intl'
import store from './store';
import i18n from './i18n';
import 'react-widgets/dist/css/react-widgets.css';

const {locale,messages} = i18n
const App = () => {
    return (
        <Provider store={store}>
            <IntlProvider 
                locale={locale} 
                messages={messages[locale]}>
                <BrowserRouter>
                    <Routes/>
                </BrowserRouter>
            </IntlProvider>
        </Provider>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));