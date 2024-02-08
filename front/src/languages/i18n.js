import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: {
            "name": "Name",
            "password": "Password",
            "confirm password": "Confirm password",
            "Login" : "Enter",
            "Register": "Register",
            "Delete": "Delete"
        }
      },
      pt: {
        translation: {
            "name": "Nome",
            "password": "Senha",
            "confirm password": "Confirmar senha",
            "Login" : "Entrar",
            "Register": "Registrar",
            "Delete": "Deletar"
        }
      }
    },
    lng: 'pt', 
    fallbackLng: 'pt', 
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;