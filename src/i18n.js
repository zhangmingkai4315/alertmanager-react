import { addLocaleData } from 'react-intl';

import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';

import zh_CN from './locale/zh_CN.json';
import en_US from './locale/en_US.json';

addLocaleData([...zh,...en]);

let messages = {};
messages["en"] = en_US;
messages["zh-CN"] = zh_CN;

const languages = navigator.languages;
const currentLang = languages[0];

const i18nConfig = {
    locale:currentLang,
    messages
}

export default i18nConfig;
