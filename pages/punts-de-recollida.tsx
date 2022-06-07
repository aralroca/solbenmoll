import useTranslation from 'next-translate/useTranslation'
import Breadcrumb from '../components/Breadcrumb'
import InstaIcon from '../components/Icons/Insta'
import MailIcon from '../components/Icons/Mail'
import PickUpPointsMap from '../components/PickUpPointsMap'


function PuntsDeRecollida() {
  const { t } = useTranslation('common')
  const title = t`punts-de-recollida-content.title`
  const containerStyles = { display: 'flex', alignItems: 'center', margin: 5 }

  return (
    <div className="content">
      <Breadcrumb
        currentPageName={title}
        links={[
          {
            href: '/',
            name: 'home',
          },
        ]}
      />
      <h1>{title}</h1>
      
      <p>A dia d'avui, tenim punts de recollida a Barcelona ciutat, Mataró Cerdanyola del Vallès i Premià de Dalt. I ens agradaria obrir-ne més, ens ajudes?</p>
      
      <PickUpPointsMap />
      
      <h2>Vols obrir un punt de recollida?</h2>
      <p> Si tens un local o un grup de consum i t'agradaria incloure't com a punt de recollida, contacta'ns a solbenmoll@gmail.com. Només necessites tenir més de 3 cistellaires per a poder obrir un nou punt de recollida. </p> 
      
      <h3>Té algun cost obrir un punt de recollida?</h3>
      <p>No, només compromís de poder rebre les cistelles els dimecres durant el dia i permetre als cistellaires recollir-les entre dimecres i dijous.</p> 
      
      <h3>Com a punt de recollida he de fer alguna gestió?</h3>
      <p>No, nosaltres ens encarreguem de la gestió de les subscripcions i els cobraments a final de mes.</p> 
    
      <h3>Quins beneficis tinc com a punt de recollida?</h3>
      <p>Oferir un servei complementari als vostres socis o clients ademés de col·laborar amb un projecte respectuos amb el medi ambient!</p> 
      
      

    </div>
  )
}

export default PuntsDeRecollida
