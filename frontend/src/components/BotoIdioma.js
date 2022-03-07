//Css de ViewPropietat
import '../components/PropietatExpand.css';

import React from "react";

import { useTranslation } from 'react-i18next';

const lngs = {
  en: { nativeName: 'English' },
  es: { nativeName: 'Español' },
  ca: { nativeName: 'Català' }
};

function BotoIdioma() {

  const { i18n } = useTranslation();

  return (

    <div className='botolng'>
        {Object.keys(lngs).map((lng) => (
        <button key={lng} className="p-2 botoIdioma" style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
            {lngs[lng].nativeName}
        </button>
        ))}
    </div>

  );
}

export default BotoIdioma;