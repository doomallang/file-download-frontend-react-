import i18n from "i18next";
import backend from 'i18next-http-backend';
import { SERVER, LANGUAGE } from 'constant/url'
import { initReactI18next } from "react-i18next";

i18n
  .use(backend)
  .use(initReactI18next)
  .init({
    react: {
        useSuspense: false
    },
    fallbackLng: "ko-kr",
    debug: false,
    backend: {
        loadPath: `${SERVER.IP}:${SERVER.PORT}${LANGUAGE.I18N_PROPERTIES}?propertiesName=message_ko`
    }
});

export default i18n;