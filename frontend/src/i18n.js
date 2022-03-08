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
                breadcrumb: {
                    home: "Pàgina Principal",
                    cercar: "Cercar Cases",
                    vistacasa: "Vista de la casa",
                    reservar: "Reservar"
                },
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
                    dev: "Desenvolupadors",
                    institucio: "Institució"
                },
                viewpropietat: {
                    titolDates: "Estableix les dates de la teva estada",
                    arribada: "Arribada",
                    sortida: "Sortida",
                    preu: "Preu",
                    llogarboto: "Llogar Propietat",
                    selecc: "Selecciona els dies que desitjaries llogar la propietat per coneixer el preu de l'estada.",
                    clica: "Clica llogar per anar a la pantalla de la teva reserva",
                    p1: "Selecciona els dies que desitjaries llogar la propietat per coneixer el preu de l'estada",
                    p2: "Recorda que has d'",
                    p3: "sessio amb el teu compte per poder reservar una propietat!", 
                    direccio: "Direcció:",
                    plases: "Nº de Places:",
                    banys: "Nº de Banys:",
                    localitat: "Localitat:",
                    habitacions: "Nº d'Habitacions:",
                    preudia: "Preu/Dia:",
                    descomptem: "Descompte Més:",
                    descomptes: "Descompte Setmana:",
                    caract: "Caracteristiques:",
                    normes: "Normes de la casa:",
                    hab: "Habitacions",
                    errorCar: "El propietari no ha definit cap caracteristica",
                    titlecom: "Comentaris",
                    noComent: "Aquesta propietat encara no te cap comentari...",
                    valoracio: "Valoració General",
                    comentariError: "Per deixar la teva opinio de la propietat es necessari iniciar sessió amb el teu compte",
                    hasestat: "Has estat a la propietat? Deixa la teva review per tal d'ajudar als futurs inquilins!",
                    valor: "Valora de 1 a 10",
                    escriu: "Escriu el teu comentari",
                    ubi: "Ubicació",
                    notaNovalida: "Nota no valida",
                    estada: "Estada",
                    neteja: "Neteja",
                    comentar: "Comentar",
                    habitacio: "Habitació:",
                    llitsd: "Nº de Llits Dobles:",
                    llitss: "Nº de Llits Individuals:",
                    bany: "Bany",
                },
                home: {
                    copdull: "Pega un copdull a les nostres cases disponibles per llogar",
                    millors: "Son les millors",
                    botollogar: "Comença a llogar",
                    deixarclaus: "Vols posar alguna de les teves propietats a la nostra disposició?",
                    deixans: "Dona-t d'alta com a propietari i deixans la resta a nosaltres",
                    botopropietari: "Fes-te Propietari"
                },
                cercarcases: {
                    botofiltres: "Filtratges",
                    caract: "Caracteristiques de la casa",
                    perupernit: "Preu per nit: ",
                    plaçes: "Plaçes: ",
                    paginaactual: "Pagina: ",
                    boto: "LLogar"
                }
          }
        },  
        en: {
        translation: {
            breadcrumb: {
                home: "Home Page",
                cercar: "Search",
                vistacasa: "View",
                reservar: "Booking"
            },
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
                dev: "Developers",
                institucio: "Educ. Center"
            },
            
        }
        },
        es: {
        translation: {
            breadcrumb: {
                home: "Pagina Principal",
                cercar: "Buscar Casas",
                vistacasa: "Vista",
                reservar: "Reservar"
            },
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
                dev: "Desarrolladores",
                institucio: "Centro Educ."
            }
        }
        }
    }
  });

export default i18n;