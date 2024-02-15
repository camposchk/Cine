import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

let defaultLanguage = 'pt';

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
            "Delete": "Delete",
            "genre" : "Genre",
            "launchyear": "Launch Year",
            "description" : "Description",
            "rating": "Rating",
            "rating a movie": "Rating a movie",
            "rate" : "Rate",
            "cancel" : "Cancel"
            ,
            "imgPath": "Image path"
        }
      },
      pt: {
        translation: {
            "name": "Nome",
            "password": "Senha",
            "confirm password": "Confirmar senha",
            "Login" : "Entrar",
            "Register": "Registrar",
            "Delete": "Deletar",
            "genre" : "Gênero",
            "launchyear": "Ano de lançamento",
            "description" : "Descrição",
            "rating": "Avaliação",
            "rating a movie": "Avaliar Filme",
            "rate" : "Avaliar",
            "cancel" : "Cancelar",
            "imgPath": "Caminho da imagem"
        }
      }
    },
    lng: defaultLanguage, 
    fallbackLng: defaultLanguage, 
    interpolation: {
      escapeValue: false 
    }
  });

export function changeLanguage() {
  defaultLanguage = defaultLanguage === 'pt' ? 'en' : 'pt';
  i18n.changeLanguage(defaultLanguage);
}

export default i18n;
