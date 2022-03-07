import React from "react";
import { useTranslation } from 'react-i18next';

//Idiomes de la web
const lngs = {
  ca: { nativeName: 'Català' },
  es: { nativeName: 'Español' },
  en: { nativeName: 'English' }
};

function BotoIdioma() {

  const { i18n } = useTranslation();

  return (

    <div className='botolng text-end'>
        {Object.keys(lngs).map((lng) => (
        <button key={lng} className="p-2 botoIdioma" style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
            {lngs[lng].nativeName}
        </button>
        ))}
    </div>

  );
}

export default BotoIdioma;