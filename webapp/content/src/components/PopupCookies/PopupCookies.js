import React from "react";
import Popup from "../Popup/Popup";
import './PopupCookies.css'
import {Container} from "react-bootstrap";

export default function PopupCookies(props) {

    const cookieContent =
        <div className="popup-contact">
            <Container className="cookies-container">
                <div>
                    <h2 className="color-red">CHARTE D'UTILISATION DES COOKIES</h2>
                    <h5 className="font-italic">Date de mise à jour : 12/10/2020</h5>
                    <br/>
                    Le site internet <b>www.mypetslife.co</b> (ci-après le "Site") collecte et traite des données à
                    caractère personnel au sens du Règlement général du Parlement européen et du Conseil relatif à la
                    protection des données personnelles n° 2016/679 du 27 avril 2016 (ci-après le
                    <span className="color-red link" href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees"> "RGPD"</span>)
                    et de la Loi Informatique & Libertés n° 78/17 du 6 janvier 1978 dans sa version en vigueur
                    (ci-après la <span className="color-red link" href="https://www.legifrance.gouv.fr/jo_pdf.do?id=JORFTEXT000037800506">
                    "Loi Informatique & Libertés"</span>) conformément à sa charte de confidentialité.<br/>
                    Dans ce cadre, le Site utilise des petits fichiers appelés "cookies" destinés à faciliter la navigation.
                    La présente charte d'utilisation des cookies a pour but d'informer les Utilisateurs du Site des modalités
                    d'utilisation des cookies sur le Site et de donner toutes les indications permettant aux Utilisateurs de
                    configurer leur logiciel de navigation afin, le cas échéant, de refuser l'utilisation de ces cookies.
                    Les Utilisateurs peuvent revenir sur cette configuration et la modifier à tout moment.<br/>
                    Cette charte d'utilisation complète la charte de confidentialité du Site. Les termes précédés d'une
                    majuscule et non définis au sein de la présente charte d'utilisation des cookies le sont dans le cadre
                    des conditions générales d'utilisation et/ou de la charte de confidentialité.<br/><br/>

                    Un "cookie" est un fichier informatique prenant la forme d'un fichier texte (au format .txt)
                    composé de divers caractères. Le cookie est envoyé par le serveur informatique du site que vous visitez
                    et est stocké sur le disque dur de Votre ordinateur, Votre tablette ou Votre smartphone, selon le type
                    de terminal informatique utilisé.<br/>
                    De manière générale, le cookie ne contient que certaines informations directement ou indirectement identifiantes,
                    telles que le nom du serveur de site qui l'a déposé, un identifiant de session, une date d'expiration,
                    voire des informations sur la navigation au sein du site que Vous visitez, comme les pages parcourues, par exemple.
                    Le but premier du cookie consiste à communiquer avec le logiciel navigateur que Vous utilisez sur
                    votre terminal. Le cookie envoie des informations à ce navigateur et permet de renvoyer des informations
                    au site ayant placé le cookie, principalement afin de permettre la navigation. Le cookie garde alors
                    en mémoire, par exemple, un identifiant de session, la langue utilisée, les pages du site visitées ou
                    encore la gestion de Votre compte, selon les cas et la manière dont le cookie a été conçu.<br/>
                    Les cookies peuvent être strictement techniques et nécessaires, notamment afin de Vous reconnaître
                    lorsque Vous revenez sur un site après l'avoir quitté, ou bien établir une connexion sécurisée au moment
                    d'une transaction en ligne. Le cookie peut également servir à établir des statistiques, des mesures
                    d’audience ou de performance, voire de ciblage publicitaire afin de Vous proposer des annonces adaptées
                    à vos goûts tels qu'ils résultent notamment de Votre navigation sur internet.<br/><br/>

                    La <span className="color-red link" href="https://www.legifrance.gouv.fr/jo_pdf.do?id=JORFTEXT000037800506">
                    Loi Informatique & Libertés</span> inclut certaines obligations à la charge des responsables de traitement
                    de données à caractère personnel qui utilisent des cookies sur leur site internet.<br/>
                    Schématiquement, les internautes doivent, par principe, être informés de l'utilisation des cookies et
                    consentir à cette même utilisation, à moins qu'il ne s'agisse de cookies purement techniques (comme ceux
                    servant par exemple à faire fonctionner le panier d'achat ou à conserver en mémoire la langue du site internet visité).
                    Dans ce cas, le consentement de l'internaute n'est pas exigé et seule son information est nécessaire.<br/>
                    Par ailleurs, la Commission Nationale de l'Informatique et des Libertés ("CNIL"), qui est l'autorité
                    indépendante en charge en France du respect de la
                    <span className="color-red link" href="https://www.legifrance.gouv.fr/jo_pdf.do?id=JORFTEXT000037800506">
                    Loi Informatique & Libertés</span>, a adopté une recommandation
                    selon laquelle le consentement des internautes peut être simplement présumé lorsque ces derniers poursuivent
                    leur navigation sur un site après avoir été dûment informés de l'utilisation des cookies.<br/>
                    C'est la raison pour laquelle le Site diffuse, lors de Votre première connexion, un bandeau sur la page
                    d'accueil destiné à Vous prévenir de l'utilisation de cookies et à Vous informer du fait que la poursuite de
                    la navigation sur le Site laissait présumer Votre consentement. À défaut de cliquer sur le bouton "J'accepte",
                    le bandeau reste affiché et les cookies ne sont pas activés.<br/><br/>

                    Conformément aux recommandations de la CNIL, la présente charte, qui complète la charte de confidentialité,
                    a pour objet de Vous apporter toutes les informations utiles sur les cookies utilisés par le Site.<br/>
                    En l'occurrence, nous n'utilisons pas de cookies pour Vous proposer des publicités ciblées selon les pages que
                    Vous visitez sur notre Site, ni des autres sites que Vous pouvez éventuellement fréquenter. Les cookies que nous
                    utilisons n'ont d'effet que sur le Site et, par exemple, n'analysent plus Votre navigation dès lors que Vous
                    quittez notre Site.<br/><br/>

                    Nous Vous informons que les cookies que nous utilisons sur le Site sont les suivants :<br/>
                    - Cookie de session : ce cookie a pour but de Vous identifier sur le Site et Vous permet de ne pas avoir à
                    Vous reconnecter lors d'une nouvelle visite. Il est possible de Vous déconnecter du Site en utilisant la
                    fonction adéquate dans les Réglages du Site. Le cookie enregistrera alors Votre choix et ne sera plus activé
                    lors de Votre prochaine visite, ce qui Vous contraindra à Vous réidentifier pour pouvoir accéder à Votre Compte ;<br/>
                    - Cookie Google Analytics :  nous utilisons la solution Google Analytics pour effectuer des relevés de statistiques
                    de l'utilisation du Site, en particulier le décompte des pages consultées par les Utilisateurs et diverses autres
                    mesures d'audience.<br/><br/>
                    Les cookies finissent par disparaître suivant leur durée de conservation, qui peut, selon le type de cookie,
                    être de plusieurs mois ou de quelques minutes. Certains cookies disparaissent lorsque Vous quittez le Site.<br/><br/>

                    Conformément aux dispositions de la <span className="color-red link" href="https://www.legifrance.gouv.fr/jo_pdf.do?id=JORFTEXT000037800506">
                    Loi Informatique & Libertés</span>, Vous disposez en effet à tout moment d'un droit d'accès, de rectification,
                    de modification et de suppression des données à caractère personnel Vous concernant si celles-ci sont inexactes,
                    incomplètes, équivoques ou périmées.<br/>
                    Vous disposez également du droit de Vous opposer, pour des motifs légitimes, à ce que des données à caractère
                    personnel Vous concernant fassent l'objet d'un traitement. Une telle opposition rendra toutefois impossible
                    l'exécution de la commande.<br/><br/>

                    Vous pouvez exercer ces droits en envoyant un courrier postal signé accompagné d'un justificatif d'identité
                    à l'adresse suivante : MyPetsLife, Protection des Données personnelles, 149 avenue du Maine, 75014 Paris <br/><br/>
                </div>
            </Container>
    </div>

    return (
        <Popup
            content={cookieContent}
            popupHeight={'90%'}
            popupWidth={'60%'}
            onClosed={props.onClosed}/>
    )
}

