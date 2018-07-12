import { addLocaleData } from 'react-intl';
// import momentLocale from 'moment/locale/zh-cn';

import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';

import zh_CN from './locale/zh_CN.json';
import en_US from './locale/en_US.json';

addLocaleData([...zh,...en]);

let messages = {};
messages["en"] = en_US;
messages["zh-CN"] = zh_CN;

const languages = navigator.languages;

let currentLang = languages[0];

if(currentLang === 'zh'){
    currentLang = 'zh-CN'
}else if(!messages[currentLang]){
    currentLang = 'en'
}

const i18nConfig = {
    locale:currentLang,
    messages
}

export default i18nConfig;
