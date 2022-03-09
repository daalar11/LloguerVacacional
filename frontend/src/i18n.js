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
                    reservar: "Reserves"
                },
                login: {
                    title: "Iniciar sessió",
                    email: "Correu Electrònic",
                    errorEmail: "Introdueix el correu corresponent amb el teu compte",
                    pass: "Contrasenya",
                    errorPass: "Introdueix la teva contrasenya",
                    preguntaRegister: "Encara no tens cap usuari?",
                    register: "Registra't ja!"
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
                    correu: "Correu Electrònic",
                    registrar: "Registrar-se",
                    tensUser: "Ja tens un usuari?",
                    login: "Inicia Sessió!",
                    errorDni: "El dni introduït no es vàlid",
                    ombligatori: "Camp obligatori",

                },
                footer: {
                    title1: "Informació",
                    contact: "Contacte",
                    politica: "Política de la companyia",
                    copyright: "Drets d'autor",
                    title2: "Xarxes Socials",
                    dev: "Desenvolupadors",
                    institucio: "Institució"
                },
                viewpropietat: {
                    titolDates: "Tria les dates de la teva estada",
                    arribada: "Arribada",
                    sortida: "Sortida",
                    preu: "Preu",
                    llogarboto: "Llogar Propietat",
                    selecc: "Selecciona els dies que desitjaries llogar la propietat per conèixer el preu de l'estada.",
                    clica: "Clica llogar per anar a la pantalla de la teva reserva",
                    p1: "Selecciona els dies que desitjaries llogar la propietat per conèixer el preu de l'estada",
                    p2: "Recorda que has d'",
                    p3: "sessió amb el teu compte per poder reservar una propietat!", 
                    direccio: "Adreça:",
                    plases: "Nº de Places:",
                    banys: "Nº de Banys:",
                    localitat: "Localitat:",
                    habitacions: "Nº d'Habitacions:",
                    preudia: "Preu/Dia:",
                    descomptem: "Descompte Mes:",
                    descomptes: "Descompte Setmana:",
                    caract: "Característiques:",
                    normes: "Normes de la casa:",
                    hab: "Habitacions",
                    errorCar: "El propietari no ha definit cap característica",
                    titlecom: "Comentaris",
                    noComent: "Aquesta propietat encara no té cap comentari...",
                    valoracio: "Valoració General",
                    comentariError: "Per deixar la teva opinió de la propietat és necessari iniciar sessió amb el teu compte",
                    hasestat: "Has estat a la propietat? Deixa la teva opinió i puntua-la per tal d'ajudar els futurs inquilins!",
                    valor: "Valora d'1 a 10",
                    escriu: "Escriu el teu comentari",
                    ubi: "Ubicació",
                    notaNovalida: "Nota no vàlida",
                    estada: "Estada",
                    neteja: "Neteja",
                    comentar: "Comentar",
                    habitacio: "Habitació:",
                    llitsd: "Nº de Llits Dobles:",
                    llitss: "Nº de Llits Individuals:",
                    bany: "Bany",
                },
                home: {
                    copdull: "Pega un cop d'ull a les nostres cases disponibles per llogar",
                    millors: "Són les millors",
                    botollogar: "Comença a llogar",
                    deixarclaus: "Vols posar alguna de les teves propietats a la nostra disposició?",
                    deixans: "Dona't d'alta com a propietari i deixa'ns la resta a nosaltres",
                    botopropietari: "Fes-te Propietari"
                },
                cercarcases: {
                    botofiltres: "Filtres",
                    caract: "Característiques de la casa",
                    perupernit: "Preu per nit: ",
                    plaçes: "Places: ",
                    paginaactual: "Pàgina: ",
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
                reservar: "My Bookings"
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
            viewpropietat: {
                titolDates: "Choose the dates of your stay",
                arribada: "In",
                sortida: "Out",
                preu: "Price",
                llogarboto: "Rent a Villa",
                selecc: "Select the days you would like to rent the property to find out the price of your stay.",
                clica: "Click rent to go to your booking screen",
                p1: "Select the days you would like to rent the property to find out the price of your stay",
                p2: "Remember that you have to '",
                p3: "login with your account to be able to book a property!", 
                direccio: "Address: ",
                plases: "Nº of Places:",
                banys: "Nº of Toilets:",
                localitat: "Locality:",
                habitacions: "Nº of Rooms:",
                preudia: "Price/Day:",
                descomptem: "Discount for Month:",
                descomptes: "Discount for Week:",
                caract: "Features:",
                normes: "House Rules:",
                hab: "Rooms",
                errorCar: "The owner didn`t define any features yet",
                titlecom: "Comments",
                noComent: "This hause didn't have any comment yet...",
                valoracio: "General Rate",
                comentariError: "To leave your opinion of the property you need to sign in with your account",
                hasestat: "Have you been to the property? Leave your opinion and rate it to help future tenants!",
                valor: "Rate from 1 to 10",
                escriu: "Leave your comment",
                ubi: "Location",
                notaNovalida: "Not Valid",
                estada: "Stay",
                neteja: "Cleaning",
                comentar: "Comment",
                habitacio: "Room:",
                llitsd: "Nº of Double Beds:",
                llitss: "Nº of Single Beds:",
                bany: "Toilet",
            },
            home: {
                copdull: "Take a look at our available homes for rent",
                millors: "They are the best!",
                botollogar: "Start rent",
                deixarclaus: "Do you want to make any of your properties available to us?",
                deixans: "Sign up as an owner and leave the rest to us",
                botopropietari: "Become an Owner"
            },
            cercarcases: {
                botofiltres: "Filters",
                caract: "Home Features",
                perupernit: "Price for night: ",
                plaçes: "Places: ",
                paginaactual: "Page: ",
                boto: "Rent"
            }
            
        }
        },
        es: {
        translation: {
            breadcrumb: {
                home: "Página Principal",
                cercar: "Buscar Casas",
                vistacasa: "Vista",
                reservar: "Mis Reservas"
            },
            login: {
                title: "Iniciar Sesión",
                email: "Correo Electrónico",
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
                login: "Iniciar Sesión",
                loggout: "Cerrar Sesión"
            },
            register: {
                title: "Registrate y alquila ya!",
                nom: "Nombre",
                llinatge1: "Primer Apellido",
                llinatge2: "Segundo Apellido",
                pass: "Contraseña",
                pass2: "Repite la contraseña",
                correu: "Correo Electrónico",
                registrar: "Registrarse",
                tensUser: "Ya tienes un usuario?",
                login: "Inicia Sesión!",
                errorDni: "El dni no cumple con el patrón indicado",
                ombligatori: "Campo obligatorio",
            },
            footer: {
                title1: "Sobre nosotros",
                contact: "Contacto",
                politica: "Política de la compañia",
                copyright: "Derechos de autor",
                title2: "Redes Sociales",
                dev: "Desarrolladores",
                institucio: "Centro Educ."
            },
            viewpropietat: {
                titolDates: "Seleciona las fechas de tu estancia",
                arribada: "Llegada",
                sortida: "Salida",
                preu: "Precio",
                llogarboto: "Alquilar Propiedad",
                selecc: "Selecciona los dias que desearías alquilar la propiedad para conocer el precio de la estancia",
                clica: "Clica alquilar para ir a la pantalla de reserva",
                p1: "Selecciona los días que desearías alquilar la propiedad para conocer el precio de la estancia",
                p2: "Recuerda que tienes que '",
                p3: "sesión con tu cuenta para poder reservar una propiedad!", 
                direccio: "Direción:",
                plases: "Nº de Plazas:",
                banys: "Nº de Baños:",
                localitat: "Localidad:",
                habitacions: "Nº de Habitaciones:",
                preudia: "Precio/Día:",
                descomptem: "Descuento Mes:",
                descomptes: "Descuento Semana:",
                caract: "Características:",
                normes: "Normas de la casa:",
                hab: "Habitaciones",
                errorCar: "El propietario no ha definido ninguna característica",
                titlecom: "Comentarios",
                noComent: "Esta propiedad aun no tiene comentarios...",
                valoracio: "Valoración General",
                comentariError: "Para dejar tu opinión de la propiedad es necesario iniciar sesión con tu cuenta",
                hasestat: "Has estado en la propiedad? Deja tu opinion i puntúala para ayudar los futuros inquilinos!",
                valor: "Valora de 1 a 10",
                escriu: "Escribe tu comentario",
                ubi: "Ubicación",
                notaNovalida: "Nota no válida",
                estada: "Estancia",
                neteja: "Limpieza",
                comentar: "Comentar",
                habitacio: "Habitación:",
                llitsd: "Nº de Camas Dobles:",
                llitss: "Nº de Camas Individuales:",
                bany: "Baño",
            },
            home: {
                copdull: "Echa una ojeada a nuestras casas disponibles para alquilar",
                millors: "Son las mejores",
                botollogar: "Empieza a alquilar",
                deixarclaus: "¿Quieres poner alguna de tus propiedades a nuestra disposición?",
                deixans: "Date de alta como propietario i dejanos lo demás a nosotros",
                botopropietari: "Hazte Propietario"
            },
            cercarcases: {
                botofiltres: "Filtros",
                caract: "Características de la casa",
                perupernit: "Precio por noche: ",
                plaçes: "Plazas: ",
                paginaactual: "Página: ",
                boto: "Alquilar",
            }
        }
        }
    }
  });

export default i18n;