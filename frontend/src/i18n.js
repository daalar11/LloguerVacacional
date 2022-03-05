import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

//Fitxers de les trduccions

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'ca',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
        ca: {
          translation: {
                login: {
                    title: "Iniciar sessió",
                    email: "Correu Electronic",
                    errorEmail: "Introdueix el correu corresponent amb el teu compte",
                    pass: "Contrasenya",
                    errorPass: "Introdueix la teva contrasenya",
                    preguntaRegister: "Encara no tens cap usuari?",
                    register: "Registret ja!"
                },
                header: {
                    cercarPropietats: "Cerca una casa",
                    contact: "Contacte",
                    misreservas: "Reserves",
                    login: "Iniciar Sessió",
                    loggout: "Tancar Sessió"
                },
                register: {
                    title: "Completa el registre i comença a llogar!",
                    nom: "Nom",
                    llinatge1: "Primer Llinatge",
                    llinatge2: "Segon Llinatge",
                    pass: "Contrasenya",
                    pass2: "Repeteix la contrasenya",
                    correu: "Correu Electronic",
                    registrar: "Registrar",
                    tensUser: "Ja tens un usuari?",
                    login: "Inicia Sessió!",
                    errorDni: "El dni introduit no es valid",
                    ombligatori: "Camp obligatori",

                },
                footer: {
                    title1: "Informació",
                    contact: "Contacte",
                    politica: "Politica de la companyia",
                    copyright: "Drets d'autor",
                    title2: "Xarxes Socials",
                }
          }
        },  
        en: {
        translation: {
            login: {
                title: "Log In",
                email: "Email",
                errorEmail: "Introduce the corresponding email to your account",
                pass: "Password",
                errorPass: "Introduce your password",
                preguntaRegister: "Are not registered yet?",
                register: "Register now!"
            },
            header: {
                cercarPropietats: "Search a House",
                contact: "Contact",
                misreservas: "My Bookings",
                login: "Log In",
                loggout: "Loggout"
            },
            register: {
                title: "Make the register and start booking",
                nom: "Name",
                llinatge1: "First Name",
                llinatge2: "Second Name",
                pass: "Password",
                pass2: "Repeat Password",
                correu: "Email",
                registrar: "Register",
                tensUser: "Already have an account?",
                login: "Log In!",
                errorDni: "Dni number dont correspond match dni pattern",
                ombligatori: "Mandatory field",
            },
            footer: {
                title1: "About Us",
                contact: "Contact",
                politica: "Company Policies",
                copyright: "Copyright",
                title2: "Social Networks",
            }
        }
        },
        es: {
        translation: {
            login: {
                title: "Iniciar Session",
                email: "Correo Electronico",
                errorEmail: "Introduce el correo correspondiente con tu cuenta",
                pass: "Contraseña",
                errorPass: "Introduce tu contraseña",
                preguntaRegister: "Aun no estas registrado?",
                register: "Registrate ya!"
            },
            header: {
                cercarPropietats: "Buscar una casa",
                contact: "Contacto",
                misreservas: "Mis Reservas",
                login: "Iniciar Sessión",
                loggout: "Cerrar Sessión"
            },
            register: {
                title: "Registrate y alquila ya!",
                nom: "Nombre",
                llinatge1: "Primer Apellido",
                llinatge2: "Segundo Apellido",
                pass: "Contraseña",
                pass2: "Repite la contraseña",
                correu: "Correo Electronico",
                registrar: "Registrarse",
                tensUser: "Ya tienes un usuario?",
                login: "Inicia Sesión!",
                errorDni: "El dni no cumple con el patrón indicado",
                ombligatori: "Campo obligatorio",
            },
            footer: {
                title1: "Sobre nosotros",
                contact: "Contacto",
                politica: "Politica de la compañia",
                copyright: "Derechos de autor",
                title2: "Redes Sociales",
            }
        }
        }
    }
  });

export default i18n;