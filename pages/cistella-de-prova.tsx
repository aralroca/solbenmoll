import useTranslation from 'next-translate/useTranslation'
import Breadcrumb from '../components/Breadcrumb'
import PickUpPointsMap from '../components/PickUpPointsMap'
import InstaIcon from '../components/Icons/Insta'
import MailIcon from '../components/Icons/Mail'
import Link from 'next/link'

function CistellaDeProva() {
  const { t } = useTranslation('common')
  const title = 'Cistella de prova'
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

      <p>La nostra filosofia i model de negoci es basa en la subscripció de cistelles, ja que permet establir una rel·lació productor-client final que ens dona una estabilitat de demanda que ens permet planificar els cultius i disminuïr el malbaratament. Tot i així, oferim la possibilitat de demanar una cistella de prova per a que pogueu tastar la qualitat i manera de treballar.</p>

      <p>Les verdures de les nostres cistelles són de la nostra horta a Cabrera de Mar i de la coperativa de EcoMaresme que ens fa de proveïdors si ens manca algun producte.</p>
     
      <h2>Què inclou la cistella de prova?</h2>
      <p>Aquesta cistella està pensada per a oferir una mostra de les diferents modalitats de subscripció. Amb verdures, fruita i ous. En cas de subscriure's es podrà personalitzar la mida de la cistella i si es volen o no els extres d'ous i fruita:</p>

      <ul>
          
            <li> Cistella mitjana (5kg, 6 productes, 14.5€) </li>
            <li> Mitja dotzena d'ous (2.3€) </li>
            <li> Fruita de temporada (2kg, 3 productes, 5.5€)</li>
          
      </ul>

      <p> Preu total: <b>22.3€</b></p>

      <Link href="https://buy.stripe.com/test_5kAaIm8DnfHjfKM28d">
          <a style={{ textDecoration: 'none' }}>
            <div
              style={{
                color: 'white',
                margin: '30px auto',
                backgroundColor: '#99b67e',
                borderRadius: 30,
                textAlign: 'center',
                padding: 10,
                width: '100%',
                maxWidth: 250,
              }}
            >
              Demanar cistella de prova
            </div>
          </a>
        </Link>

    <h2>On i quan puc recollir la cistella?</h2>

    <p>La cistella la podràs recollir de manera gratuïta en els següents punts de recollida <b>el dimecres de la setmana següent a la comanda</b>. Entre dimecres tarda i dijous. A continuació oferim informació detallada per a cada punt de recollida.</p>

    <PickUpPointsMap />
          
    <h2>{t`contact-content.description`}</h2>
      <div style={containerStyles}>
        <MailIcon width={18} height={18} />
        <a
          style={{ marginLeft: 10 }}
          href="mailto:solbenmoll@gmail.com"
          target="_blank"
        >
          solbenmoll@gmail.com
        </a>
      </div>
      <div style={containerStyles}>
        <InstaIcon width={18} height={18} />
        <a
          style={{ marginLeft: 10 }}
          href="https://www.instagram.com/solbenmoll"
          target="_blank"
        >
          @solbenmoll
        </a>
      </div>
      

    </div>
  )
}

export default CistellaDeProva
