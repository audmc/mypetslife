import React from "react";
import Popup from "../Popup/Popup";
import './PopupCgu.css'
import {Container} from "react-bootstrap";

export default function PopupCgu(props) {

    const cguContent =
        <>
        <div className="popup-contact">
            <Container className="cgu-container">
                <div >
                    <h2 className="color-red">CONDITIONS GÉNÉRALES DE VENTE</h2>
                    <h5 className="font-italic">Date de dernière mise à jour : 14/09/2020</h5>
                    <br/>
                    <h3 className="color-green">ARTICLE 1 – MENTION LEGALES</h3>
                    <div className="font-2">
                        Le présent site, accessible à l’URL <i><u>https://mypetslife.co</u></i> (le « Site »), est édité par : <br/><br/>
                        <b>MY PETS LIFE</b>  société au capital de <b>100</b> euros, inscrite au R.C.S. de <b>Paris</b> sous le numéro <b>497 933 408</b>, dont le siège social est situé au <b>149 avenue du Maine, 75014 Paris,</b> Le numéro individuel TVA de l’Exploitant est : <b>FR27884429903</b>,  représenté par <b>son président Thibaud Masson Chevaleraud</b> dûment habilité.<br/><br/>
                        (Ci-après désigné l’« <b>Exploitant</b> »).<br/><br/>
                        Le Site est hébergé par la société <b>Amazon Web Services</b>.<br/>
                        L’Exploitant peut être joint à l’adresse email suivante <i><u>contact@mypetslife.co</u></i><br/><br/>
                    </div>
                    <h3 className="color-green">ARTICLE 2 – DISPOSITIONS GÉNÉRALES RELATIVES AUX PRESENTES CONDITIONS GENERALES</h3>
                    <div className="font-2">
                        Les conditions générales de Vente (les « <b>Conditions Générales de Vente</b> », ou les « <b>CGV</b> »)
                        sont applicables exclusivement à la vente en ligne des services proposés par l’Exploitant sur le Site internet. <br/><br/>
                        Les CGV sont mises à la disposition des clients sur le Site où elles sont directement consultables et
                        peuvent également lui être communiquées sur simple demande par tout moyen. <br/><br/>
                        Les CGV sont opposables au client qui reconnaît, en cochant une case prévue à cet effet, en avoir eu
                        connaissance et les avoir acceptées avant de passer commande. La validation de la commande par sa confirmation
                        vaut adhésion par l'acheteur aux CGV en vigueur au jour de la commande dont la conservation et la reproduction
                        sont assurées par l’Exploitant.<br/><br/>
                        Les CGV sont également systématiquement envoyées avec toute confirmation de commande transmise au Client par
                        l’Exploitant. Tout Client est par conséquent réputé avoir pris connaissance et accepté sans réserve
                        l'intégralité des dispositions des CGV, qui s'appliqueront à toutes prestations accomplies par l'Exploitant.
                        Les CGV prévaudront sur toutes clauses et conditions contraires pouvant figurer sur les conditions générales
                        d'achat ou tout autre document émanant du Client. Toutes conditions contraires posées par le Client seront donc,
                        à défaut d'acceptation expresse par l'Exploitant, inopposables à ce dernier. L’Exploitant se réserve cependant le
                        droit de déroger à certaines clauses des CGV en fonction des négociations menées avec le Client, par l’établissement
                        de conditions de vente particulières (notamment par la conclusion d’un contrat de prestation de services)
                        qui seront approuvées par le Client.<br/><br/>
                    </div>
                    <h3 className="color-green">ARTICLE 3 – DESCRIPTION DES SERVICES</h3>
                    <div className="font-2">
                        Le Site est un site de services aux particuliers et entreprises / associations.<br/>
                        - Forum<br/>
                        - Blog<br/>
                        - Mise en relation entre des particuliers et des associations<br/>
                        - Carnet de santé numérique<br/>
                        - Système de Gestion de budget<br/>
                        - Système de sauvegarde de documents<br/>
                        - Cours d’apprentissage<br/>
                        - Espace Partenariats<br/><br/>

                        Cette liste est non Exhaustive et pourra évoluer en fonction du développement de la société.<br/><br/>
                        (ci-après le(s) « <b>Service(s)</b> ») ouvert à toute personne physique ou morale utilisant le Site (le « <b>Client</b> »).
                        Les Services présentés sur le Site font chacun l'objet d'un descriptif mentionnant leurs
                        caractéristiques essentielles. Les photographies illustrant les Services ne constituent
                        pas un document contractuel. Les Services sont conformes aux prescriptions du droit français
                        en vigueur.<br/><br/>
                        Le Client demeure responsable des modalités et des conséquences de son accès au Site notamment
                        par l’Internet. Cet accès peut impliquer le paiement de frais à des prestataires techniques tels
                        que notamment des fournisseurs d’accès à l’Internet, lesquels demeurent à sa charge. En outre, le
                        Client devra fournir et être entièrement responsable des équipements nécessaires afin de se connecter au Site.<br/><br/>
                        Le Client reconnaît avoir vérifié que la configuration informatique qu’il utilise est sécurisée
                        et en état de fonctionnement.<br/><br/>
                    </div>
                    <h3 className="color-green">ARTICLE 4 –  CRÉATION DE L’ESPACE CLIENT</h3>
                    <div className="font-2">
                        Pour avoir accès aux services du Site, le Client doit au préalable créer son espace client personnel.
                        Une fois créé, pour y accéder, le Client doit s’identifier en utilisant son adresse email et son
                        mot de passe secret, personnel, confidentiel et chiffré. Il appartient au Client de ne pas communiquer
                        son identifiant et son mot de passe conformément aux dispositions de l’article DONNEES PERSONNELLES
                        des présentes. Chaque Client s'engage à conserver une stricte confidentialité sur les données,
                        en particulier identifiant et mot de passe, lui permettant d'accéder à son espace client,
                        le Client reconnaissant être le seul responsable de l'accès au Service par le biais de son identifiant
                        et de son mot de passe, sauf fraude avérée. Chaque Client s'engage en outre à informer sans délai
                        l’Exploitant dans l'hypothèse d'une perte, d'un détournement ou de l'utilisation frauduleuse de son
                        identifiant et/ou mot de passe.<br/><br/>
                        Après la création de son espace client personnel, le Client recevra un email lui confirmant la création
                        de son espace client.<br/><br/>
                        Le Client s'engage lors de son inscription à :<br/><br/>
                        - Délivrer des informations réelles, exactes, à jour au moment de leur saisie dans le formulaire
                        d'inscription du service, et notamment à ne pas utiliser de faux noms ou adresses, ou encore des
                        noms ou adresses sans y être autorisé.<br/>
                        - Maintenir à jour les données d'inscriptions en vue de garantir en permanence leur caractère réel,
                        exact et à jour.<br/><br/>
                        Le Client s'engage en outre à ne pas rendre disponible ou distribuer des informations illicites
                        ou répréhensibles (telles que des informations diffamatoires ou constitutive d'usurpation d'identité)
                        ou encore nuisibles (telles que les virus). Dans le cas contraire, l’Exploitant sera en mesure de
                        suspendre ou de résilier l'accès du Client au Site à ses torts exclusifs.<br/><br/>
                    </div>
                    <h3 className="color-green">ARTICLE 5 – ABONNEMENT</h3>
                    <div className="font-2">
                        Votre abonnement à My Pets Life se poursuit jusqu'à sa résiliation. Pour utiliser les services
                        My Pets Life, vous devez avoir un accès à Internet et un appareil compatible avec My Pets Life,
                        et vous devez nous fournir un ou plusieurs Moyens de paiement. Un « Moyen de paiement » désigne
                        un moyen de paiement actuel, valide, accepté, pouvant être mis à jour de temps à autre et pouvant
                        inclure le paiement via votre compte avec un tiers. À moins que vous ne résiliez votre abonnement
                        avant votre date de facturation, vous nous autorisez à vous facturer les frais d'abonnement pour
                        le cycle de facturation suivant via votre Moyen de paiement (voir « Résiliation » ci-dessous).<br/><br/>
                        Nous pouvons proposer différents forfaits d'abonnement, y compris des forfaits promotionnels
                        spéciaux ou des abonnements proposés par des tiers dans le cadre de la prestation de leurs propres
                        produits et services. Certains forfaits d'abonnement peuvent comporter des conditions et restrictions
                        différentes, dont vous serez informé au moment de votre inscription ou dans d'autres communications
                        à votre disposition. Vous trouverez les détails spécifiques de votre abonnement My Pets Life en
                        consultant notre site Web et en cliquant sur le lien « Compte » disponible en haut des pages du
                        site Web My Pets Life.<br/><br/>
                        L’Exploitant se réserve le droit de ne pas valider la commande du Client pour tout motif légitime,
                        notamment dans l’hypothèse où :<br/><br/>
                        - Le Client ne respecterait pas les Conditions Générales en vigueur lors de sa commande ;<br/>
                        - L’historique de commandes du Client montre que des sommes restent dues au titre de précédentes commandes ;<br/>
                        - L’une des précédentes commandes du Client fait l’objet d’un litige en cours de traitement ;<br/>
                        - Le Client n’a pas répondu à une demande de confirmation de sa commande que l’Exploitant lui a fait parvenir.<br/><br/>
                        L’Exploitant archive les contrats de vente de Services conformément à la législation applicable.
                        En formulant une demande à l’adresse suivante contact@mypetslife.co , l’Exploitant remettra au
                        Client une copie du contrat objet de la demande.<br/><br/>
                        Toute modification de commande par le Client après confirmation de sa commande est soumise à
                        l'accord de l’Exploitant.<br/><br/>
                        Les informations communiquées par le Client lors de la passation de la commande engagent celui-ci.
                        Ainsi, la responsabilité de l’Exploitant ne saurait en aucune manière être recherchée dans
                        l'éventualité où une erreur lors de la passation de la commande empêcherait ou retarderait la
                        livraison/la délivrance.<br/><br/>
                        Le Client déclare avoir la pleine capacité juridique lui permettant de s'engager au titre des
                        présentes Conditions Générales.<br/><br/>
                        L'inscription est ouverte aux majeurs capables et aux mineurs à conditions que ceux-ci
                        interviennent sous la surveillance du parent ou tuteur détenant l'autorité parentale.
                        En aucun cas, l'inscription n'est autorisée pour le compte de tiers à moins d'être valablement
                        habilité à la représenter (personne morale par exemple). L'inscription est strictement personnelle
                        à chaque Client.<br/><br/>
                        En cas de manquement par le Client à l'une des dispositions des présentes, l’Exploitant se
                        réserve le droit de résilier sans préavis le compte dudit Client.<br/><br/>
                    </div>
                    <h3 className="color-green">ARTICLE 6 – MODALITÉS DE PAIEMENT ET SÉCURISATION</h3>
                    <div className="font-2">
                        Le Client reconnaît expressément que toute commande effectuée sur le Site est une commande avec
                        obligation de paiement, qui nécessite le paiement d’un prix contre la fourniture du Service
                        commandé.<br/><br/>
                        Le Client est informé que la mise à disposition du Service ne pourra être effectuée avant
                        le parfait encaissement par l’Exploitant des sommes dues par le Client.<br/><br/>
                        L’Exploitant utilise la solution de paiement en ligne <b>Stripe.</b><br/><br/>
                        Les commandes peuvent être payées en ayant recours à l’un des modes de paiement suivants :<br/><br/>
                        - <b>Paiement par carte bancaire.</b> Le paiement s'effectue directement sur les serveurs bancaires
                        sécurisés de la banque de l’Exploitant, les coordonnées bancaires du Client ne transitent pas
                        sur le Site. Les coordonnées bancaires communiquées lors du paiement sont protégées par un procédé
                        de cryptage SSL (Secure Socket Layer). De cette manière, ces coordonnées ne sont pas accessibles
                        à des tiers.<br/><br/>
                        La commande du Client est enregistrée et validée dès acceptation du paiement par la banque.<br/><br/>
                        Le compte du Client sera débité du montant correspondant uniquement lorsque (i) les données de la
                        carte bancaire utilisée auront été vérifiées et (ii) le débit aura été accepté par la banque ayant
                        émis la carte bancaire.<br/><br/>
                        L’impossibilité de débiter les sommes dues entraînera la nullité immédiate de la vente.<br/><br/>
                        La carte bancaire peut notamment être refusée si elle est arrivée à expiration, si elle a atteint
                        le montant maximal de dépense auquel le Client a droit ou si les données saisies sont incorrectes.<br/><br/>
                        Le cas échéant, la commande validée par le Client ne sera considérée comme effective que lorsque
                        le centre de paiement bancaire sécurisé aura donné son accord sur la transaction.<br/><br/>
                        Dans le cadre des procédures de contrôle, l’Exploitant pourra avoir à demander au Client toutes
                        les pièces nécessaires à la finalisation de sa commande. Ces pièces ne seront pas utilisées à
                        d’autres fins que celles-ci.<br/><br/>
                    </div>
                    <h3 className="color-green">ARTICLE 7 – PAIEMENT DU PRIX</h3>
                    <div className="font-2">
                        Le prix des Services en vigueur lors de la commande est indiqué en euros toutes taxes comprises
                        (TTC) sur le Site. En cas de promotion, l’Exploitant s'engage à appliquer le prix promotionnel à
                        toute commande passée durant la période de la publicité faite pour la promotion.<br/><br/>
                        Le prix est payable en euros (€) exclusivement.<br/><br/>
                        Le prix est exigible en totalité après confirmation de la commande. Les prix proposés comprennent
                        les rabais et ristournes que l’Exploitant serait amené à octroyer. <br/><br/>
                        Le montant total dû par le Client et son détail sont indiqués sur la page de confirmation de commande.<br/><br/>
                    </div>
                    <h3 className="color-green">ARTICLE 8 – DROIT DE RÉTRACTATION</h3>
                    <div className="font-2">
                        Le Client bénéficiera d’un délai de rétractation de quatorze (14) jours calendaires à compter de
                        la conclusion du contrat, conformément à l’article L. 221-19 du Code de la consommation.<br/><br/>
                        Si le Client souhaite que l'exécution d'une prestation de services commence avant la fin du
                        délai de rétractation, l’Exploitant recueille sa demande expresse par tout moyen.<br/><br/>
                        Le Client qui a exercé son droit de rétractation pour une prestation dont l'exécution a commencé,
                        à sa demande expresse, avant la fin du délai de rétractation, verse à l’Exploitant un montant
                        correspondant au service fourni jusqu'à la communication de sa décision de se rétracter ; ce montant
                        est proportionné au prix total de la prestation convenu dans le contrat (et sera donc égal au prix
                        total de la prestation si l’intégralité de la prestation a été effectuée).<br/><br/>
                        Aucune somme n'est due par le Client ayant exercé son droit de rétractation si sa demande expresse
                        n'a pas été recueillie ou si l’Exploitant n'a pas respecté l'obligation d'information prévue
                        au 4° de l'article L. 221-5 du Code de la consommation.<br/><br/>
                        Le cas échéant, le Client peut exercer son droit de rétractation en notifiant les informations suivantes
                        à l’Exploitant :<br/><br/>
                        -  Nom, adresse géographique, numéro de téléphone et adresse électronique ;<br/>
                        -  Décision de rétractation au moyen d'une déclaration dénuée d'ambiguïté (par exemple, lettre envoyée
                        par la poste, télécopie ou courrier électronique dès lors que ces coordonnées sont disponibles et
                        de ce fait apparaissent sur le formulaire type de rétractation). Le Client peut utiliser le modèle
                        de formulaire de rétractation mais ce n'est pas obligatoire.<br/><br/>
                        Les exceptions de l’article L.221-28 du Code de la Consommation s’appliquent et font obstacle à
                        l’exercice du droit de rétractation, notamment si la commande consiste en un contrat (notamment) :<br/>
                        <i>
                            1° De fourniture de services pleinement exécutés avant la fin du délai de rétractation et dont l'exécution
                            a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation ;
                            2° De fourniture de biens ou de services dont le prix dépend de fluctuations sur le marché financier
                            échappant au contrôle du professionnel et susceptibles de se produire pendant le délai de rétractation ;
                            8° De travaux d'entretien ou de réparation à réaliser en urgence au domicile du consommateur et
                            expressément sollicités par lui, dans la limite des pièces de rechange et travaux strictement nécessaires
                            pour répondre à l'urgence ;
                            11° Conclu lors d'une enchère publique ;
                            12° De prestation de services d'hébergement, autres que d'hébergement résidentiel, de services de
                            transport de biens, de locations de voitures, de restauration ou d'activités de loisirs qui doivent
                            être fournis à une date ou à une période déterminée ;
                            13° De fourniture d'un contenu numérique non fourni sur un support matériel dont l'exécution a commencé
                            après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.
                        </i><br/><br/>
                        L’Exploitant remboursera au Client les sommes dues dans un délai de quatorze (14) jours à compter de la
                        réception l’ensemble des éléments permettant de mettre en œuvre le remboursement du Client. Ce remboursement
                        pourra être effectué par le même moyen de paiement que celui employé pour le Client. A ce titre, le Client
                        ayant réglé sa commande sous forme d'avoirs / bons cadeau pourront être remboursés par avoirs / bons cadeau
                        selon la volonté de l’Exploitant.<br/><br/>
                        En acceptant les présentes Conditions Générales, le Client reconnaît expressément avoir été informé
                        des modalités de rétractation.<br/><br/>
                    </div>
                    <h3 className="color-green">ARTICLE 9 – SERVICE CLIENTS</h3>
                    <div className="font-2">
                        Le Client peut contacter l’Exploitant :<br/><br/>
                        - par email en s’adressant à <b><i>contact@mypetslife.co</i></b> en indiquant son nom, numéro de téléphone,
                        l’objet de sa demande et le numéro de la commande concernée.
                    </div>
                    <h3 className="color-green">ARTICLE 10 – PROPRIÉTÉ INTELLECTUELLE ET LICENCE D’UTILISATION</h3>
                    <div className="font-2">
                        L’Exploitant est seule titulaire des tous les éléments présent sur le Site, notamment et sans
                        limitation, tous textes, fichiers, images animées ou non, photographies, vidéos, logos, dessins,
                        modèles, logiciels, marques, identité visuelle, base de données, structure du Site et tous autres
                        éléments de propriété intellectuelle et autres données ou informations (ci-après, les « <b>Éléments</b> »)
                        qui sont protégés par les lois et règlements français et internationaux relatifs notamment à
                        la propriété intellectuelle.<br/><br/>
                        En conséquence, aucun des Éléments du Site ne pourra en tout ou partie être modifié, reproduit,
                        copié, dupliqué, vendu, revendu, transmis, publié, communiqué, distribué, diffusé, représenté,
                        stocké, utilisé, loué ou exploité de toute autre manière, à titre gratuit ou onéreux, par un Client
                        ou par un tiers, quel que soient les moyens et/ou les supports utilisés, qu’ils soient connus ou inconnus
                        à ce jour, sans l’autorisation préalable exprès et écrite de l’Exploitant au cas par cas, et le Client est
                        seul responsable de toute utilisation et/ou exploitation non autorisée.<br/><br/>
                        Par ailleurs, il est précisé que l’Exploitant n’est pas propriétaire du contenu mis en ligne par
                        les Clients, pour lequel ces derniers demeurent intégralement responsables et garantissent la Société
                        contre tout recours à ce titre. Les Clients accordent à la Société une licence non-exclusive transférable,
                        sous-licenciable, à titre gratuit et mondiale pour l’utilisation des contenus de propriété intellectuelle
                        qu’ils publient sur le Site, pour toute la durée de protection de ces contenus.<br/><br/>
                        L’Exploitant se réserve la possibilité de saisir toutes voies de droit à l’encontre des personnes
                        qui n’auraient pas respecté les interdictions contenues dans le présent article.<br/><br/>
                    </div>
                    <h3 className="color-green">ARTICLE 11 – RESPONSABILITÉ ET GARANTIE</h3>
                    <div className="font-2">
                        L'Exploitant déclare avoir souscrit une assurance garantissant sa responsabilité professionnelle
                        et contractuelle.<br/><br/>
                        L’Exploitant ne saurait être tenu pour responsable de l'inexécution du contrat du fait du Client
                        ou en raison d'un événement qualifié de force majeure par les tribunaux compétents ou encore du
                        fait imprévisible et insurmontable de tout tiers aux présentes.<br/><br/>
                        L’Exploitant ne peut être tenu pour responsable des informations importées, stockées et/ou
                        publiées sur le Site par les Clients. L’Exploitant ne peut être tenu pour responsable au titre
                        de toute information publiée par un Client sur le Site et des dommages directs ou indirects que
                        cette utilisation pourrait causer à un tiers, le Client à l'origine de la publication restant seul
                        responsable à ce titre.<br/><br/>
                        Le Client reconnaît que les caractéristiques et les contraintes d'Internet ne permettent pas de
                        garantir la sécurité, la disponibilité et l'intégrité des transmissions de données sur Internet.
                        Ainsi, l’Exploitant ne garantit pas que le Site et ses services fonctionneront sans interruption
                        ni erreur de fonctionnement. En particulier, leur exploitation pourra être momentanément interrompue
                        pour cause de maintenance, de mises à jour ou d'améliorations techniques, ou pour en faire évoluer
                        le contenu et/ou leur présentation.<br/><br/>
                        L’Exploitant ne peut être tenu pour responsable de l'utilisation qui serait faite du Site et de
                        ses services par les Clients en violation des présentes Conditions Générales et des dommages directs
                        ou indirects que cette utilisation pourrait causer à un Client ou à un tiers. En particulier,
                        l’Exploitant ne peut être tenu pour responsable des fausses déclarations faites par un Client et
                        de son comportement vis-à-vis des tiers. Dans le cas où la responsabilité de l’Exploitant serait
                        recherchée à raison d'un tel comportement d’un de ses Clients, ce dernier s'engage à garantir
                        l’Exploitant contre toute condamnation prononcée à son encontre ainsi qu’à rembourser l’Exploitant
                        de l’ensemble des frais, notamment les honoraires d’avocats, engagés pour sa défense.<br/><br/>
                        Le Client est seul responsable de l'intégralité des contenus qu'il met en ligne sur le Site,
                        dont il déclare expressément disposer de l'intégralité des droits, et garantit à ce titre l’Exploitant
                        qu'il ne met pas en ligne de contenus violant des droits tiers, notamment de propriété intellectuelle,
                        ou constituant une atteinte aux personnes (notamment diffamation, insultes, injures, etc.),
                        au respect de la vie privée, une atteinte à l'ordre public et aux bonnes mœurs (notamment, apologie
                        des crimes contre l'humanité, incitation à la haine raciale, pornographie enfantine, etc.).
                        En cas d'atteinte aux lois en vigueur, aux bonnes mœurs ou aux présentes Conditions Générales,
                        l’Exploitant peut exclure de plein droit les Clients qui se seront rendus coupables de telles
                        infractions et supprimer des informations et renvois à ces contenus litigieux. L’Exploitant est
                        qualifié d’hébergeur s’agissant du contenu mis en ligne par des tiers. A ce titre, il est rappelé
                        que L’Exploitant n’a aucune obligation générale de surveillance du contenu transmis ou stocké via
                        le Site. Dans le cas où la responsabilité de l’Exploitant serait recherchée à raison d'un contenu
                        mis en ligne par le Client, ce dernier s'engage à garantir l’Exploitant contre toute condamnation
                        prononcée à son encontre ainsi qu’à rembourser l’Exploitant de l’ensemble des frais, notamment les
                        honoraires d’avocats, engagés pour sa défense.<br/><br/>
                    </div>
                    <h3 className="color-green">ARTICLE 12 – DONNÉES PERSONNELLES</h3>
                    <div className="font-2">
                        Chaque Client est seul responsable de la préservation de la confidentialité de son identifiant
                        et de son mot de passe, et est seul responsable de tous les accès à son Compte Client,
                        qu’ils soient autorisés ou non.<br/><br/>
                        L’Exploitant ne saurait être tenu pour responsable de toute action ou fait dommageable réalisés
                        via l’espace personnel du Client par un tiers qui aurait eu accès à ses identifiants et mot de passe
                        suite à une faute ou une négligence étant imputable au Client. Le Client s’engage à informer
                        l’Exploitant immédiatement dès lors que le Client a connaissance ou suspecte un usage non
                        autorisé ou un accès non autorisé à son espace personnel.<br/><br/>
                        Pour davantage d’informations concernant l’utilisation de données à caractère personnel par l’Exploitant,
                        veuillez lire attentivement la Charte sur le respect de la vie privée (la « <b>Charte</b> »).
                        Vous pouvez à tout moment consulter cette Charte sur le Site.<br/><br/>
                    </div>
                    <h3 className="color-green">ARTICLE 13 – LIENS HYPERTEXTES</h3>
                    <div className="font-2">
                        Les liens hypertextes disponibles sur le Site peuvent renvoyer vers des sites tiers non édités
                        par l’Exploitant. Ils sont fournis uniquement pour la convenance du Client, afin de faciliter
                        l’utilisation des ressources disponibles sur l’Internet. Si le Client utilise ces liens, il quittera
                        le Site et acceptera alors d’utiliser les sites tiers à ses risques et périls ou le cas échéant
                        conformément aux conditions qui les régissent.<br/><br/>
                        Le Client reconnaît que l’Exploitant ne contrôle ni ne contribue en aucune manière à l’élaboration
                        des conditions d’utilisation et/ou du contenu s’appliquant à ou figurant sur ces sites tiers.<br/><br/>
                        En conséquence, l’Exploitant ne saurait être tenu responsable de quelque façon que ce soit du
                        fait de ces liens hypertextes.<br/><br/>
                        En outre, le Client reconnaît que l’Exploitant ne saurait cautionner, garantir ou reprendre à son
                        compte tout ou partie des conditions d’utilisation et/ou du contenu de ces sites tiers.<br/><br/>
                        Le Site peut également contenir des liens hypertextes promotionnels et/ou bandeaux publicitaires
                        renvoyant vers des sites tiers non édités par l’Exploitant.<br/><br/>
                        L’Exploitant invite le Client à lui signaler tout lien hypertexte présent sur le Site qui permettrait
                        d’accéder à un site tiers proposant du contenu contraire aux lois et/ou aux bonnes mœurs.<br/><br/>
                        Le Client ne pourra pas utiliser et/ou insérer de lien hypertexte pointant vers le site sans
                        l’accord écrit et préalable de l’Exploitant au cas par cas.<br/><br/>
                    </div>
                    <h3 className="color-green">ARTICLE 14 – RÉFÉRENCES</h3>
                    <div className="font-2">
                        Le Client autorise l’Exploitant à mentionner le nom du Client, son logo à titre de référence dans
                        ses supports de communication (plaquette, site internet, proposition commerciale, relation avec la presse,
                        communiqué de presse, dossier de presse, communication interne, etc.).<br/><br/>
                    </div>
                    <h3 className="color-green">ARTICLE 15 –  DISPOSITIONS GÉNÉRALES</h3>
                    <div className="font-2">
                        <h5>INTÉGRALITÉ DE L’ACCORD DES PARTIES</h5>
                        Les présentes Conditions Générales constituent un contrat régissant les relations entre le Client
                        et l’Exploitant. Elles constituent l'intégralité des droits et obligations de la Société et de
                        l’Exploitant relatifs à leur objet. Si une ou plusieurs stipulations des présentes Conditions Générales
                        étaient déclarées nulles en application d'une loi, d'un règlement ou à la suite d'une décision définitive
                        d'une juridiction compétente, les autres stipulations garderont toute leur force et leur portée. En outre,
                        le fait pour une des parties aux présentes Conditions Générales de ne pas se prévaloir d'un manquement
                        de l'autre partie à l'une quelconque des dispositions des présentes Conditions Générales ne saurait
                        s'interpréter comme une renonciation de sa part à se prévaloir dans l'avenir d'un tel manquement.<br/><br/>
                        <h5>MODIFICATIONS DES CONDITIONS</h5>
                        L’Exploitant se réserve le droit de modifier à tout moment et sans préavis le contenu du Site
                        ou des services qui y sont disponibles, et/ou de cesser de manière temporaire ou définitive
                        d’exploiter tout ou partie du Site.<br/><br/>
                        En outre, l’Exploitant se réserve le droit de modifier à tout moment et sans préavis la localisation
                        du Site sur l’Internet, ainsi que les présentes Conditions Générales. Le Client est donc tenu par
                        conséquent de se reporter aux présentes Conditions Générales avant toute utilisation du Site.
                        <b>EN CAS DE MODIFICATIONS MATÉRIELLES ET DANS L'HYPOTHÈSE DE PRESTATIONS DE SERVICES CONTINUES / EN COURS,
                        L’UTILISATEUR SERA INFORMÉ AU MOYEN D'UN EMAIL ET D’UN AVERTISSEMENT SUR LE SITE AVANT LA MISE
                            EN APPLICATION DE LA MODIFICATION.</b><br/><br/>
                        Le Client reconnaît que l’Exploitant ne saurait être tenu responsable de quelque manière que ce
                        soit envers lui ou tout tiers du fait de ces modifications, suspensions ou cessations.<br/><br/>
                        L’Exploitant conseille au Client de sauvegarder et/ou imprimer les présentes Conditions Générales
                        pour une conservation sûre et durable, et pouvoir ainsi les invoquer à tout moment pendant l'exécution
                        du contrat si besoin.<br/><br/>
                        <h5>RÉCLAMATION</h5>
                        En cas de litige, vous devez vous adresser en priorité au service client de l'entreprise
                        aux coordonnées suivantes : contact@mypetslife.co.<br/><br/>
                        <h5>DROIT APPLICABLE</h5>
                        Ces Conditions Générales sont régies, interprétées et appliquées conformément au droit français.<br/><br/>
                        <h5>ACCEPTATION DES CONDITIONS GÉNÉRALES PAR LE CLIENT</h5>
                        Le Client reconnaît avoir lu attentivement les présentes Conditions Générales.<br/><br/>
                        En s’inscrivant sur le Site, le Client confirme avoir pris connaissance des Conditions Générales
                        et les accepter, le rendant contractuellement lié par les termes des présentes Conditions Générales.<br/><br/>
                        Les Conditions Générales applicables au Client sont celles disponibles à la date de la commande
                        dont une copie datée à ce jour peut être remise à sa demande au Client, il est donc précisé que toute
                        modification des Conditions Générales qui serait effectuée par l’Exploitant ne s’appliquera pas à toute
                        commande intervenue antérieurement, sauf accord exprès du Client à l’origine d’une commande donnée.<br/><br/>
                    </div>
                </div>
            </Container>
        </div>
    </>

    return (
        <Popup
            content={cguContent}
            popupWidth={'60%'}
            popupHeight={'90%'}
            onClosed={props.onClosed}/>
    )
}

