import Image from 'next/image'
import Link from 'next/link'
import Anchor from '../components/Anchor'

export default function Home() {
  return (
    <>
      <Image
        alt="Solbenmoll banner"
        src="/assets/banner.jpg"
        layout="responsive"
        loading="lazy"
        placeholder="blur"
        className="banner"
        height={385}
        width={771}
      />
      <div className="content">
        <Anchor id="que-fem" />
        <h1>Qui som, i a què ens dediquem? Del camp a la taula!</h1>
        <p>
          Sòl Ben Moll és un projecte agroecològic que es dedica a la producció
          i distribució d'hortalisses i verdures de temporada. Amb l’hort situat
          a Cabrera de Mar, Maresme, servim cistelles de verdures setmanals a
          Barcelona i rodalies, reivindicant una alimentació ecològica, sana, i
          de proximitat.
        </p>
        <h2>La nostre filosofia</h2>
        <p>
          A Sòl Ben Moll hem escollit aquesta profesió perquè ens apasiona, i
          ens aporta, al nostre punt de vista, una gran qualitat de vida, que
          ens permet disfrutar d’una feina en la qual exercitem cós, ment i
          ànima en contacte amb la natura. No ens enganyarem dient que tot es
          ideal, també comporta a vegades fer jornades de feina extenuants, o
          acceptar contratemps com les aparicions dels senglars, les glaçades i
          altres imprevistos... és una feina dura! Tot i així no ho cambiariem
          per una altre cosa.
        </p>
        <p>
          Per altre banda, també hem escollit aquest ofici, amb un model de
          negoci concret, com a acte polític i reivindicatiu, ja que creiem que
          el model agroalimentari predominant actual no és adequat per a la vida
          en el nostre planeta. Per aixó apostem per una relació més directe
          entre productor i consumidor, basada en la confiança i el compromís.
          En aquest escenari el consumidor, o cistellaire, passa a ser
          co-responsable del funcionament del projecte, permetent que aquest
          sigui estable al llarg del temps. Ens considerem «pagès de capçalera».
        </p>
        <h2>Quins productes servim?</h2>
        <p>
          Els productes que servim són cistelles de verdures tancades, on cada
          setmana portaran entre 5 i 7 productes diferents, avisant a principi
          de cada més què portaran les cistelles cada setmana. Les modalitats
          que tenim són:
        </p>
        <ul>
          <li>Cistella petita (3kg, 5 productes, 10€)</li>
          <li>Cistella mitjana (5kg, 6 productes, 14.5€)</li>
          <li>Cistella gran (7kg, 7 productes, 20€)</li>
        </ul>
        <p>A més, es pot afegir a la cistella un dels tres extres següents:</p>
        <ul>
          <li>Ous (2,3€ la mitja dotzena)</li>
          <li>Fruita (2kg, 3 productes, 5,5€)</li>
          <li>Extra 2kg Patata + 1kg Ceba seca (4,5€)</li>
        </ul>
        <p>
          Tots els productes que servim són ecològics amb el certificat CCPAE.
        </p>
        <Link href="/les-meves-cistelles">
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
              Organitzar cistelles
            </div>
          </a>
        </Link>
        <h2>Quan i on repartim?</h2>
        <p>
          El dia que fem el repartiment es cada dimecres, i repartim a diferents
          punts de recollida de Barcelona i rodalies. Us podeu adjuntar a algun
          d’aquests punts, o, si no en teniu cap de proper, es pot crear un nou
          punt a partir d’una comanda setmanal de 8 cistellaires.
        </p>
      </div>
    </>
  )
}
