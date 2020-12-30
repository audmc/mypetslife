// ----- /adoptions functions ----- //
const conversation = require("../conversation/conversationFunctions");
const adoptionAskingSchema = require("../../schema/adoptionAskingSchema");
const adoptionSchema = require("../../schema/adoptionSchema");
const userSchema = require("../../schema/userSchema");
const jwt = require('jsonwebtoken');
const ejs = require("ejs");
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PWD,
    },
    tls: {
        rejectUnauthorized: false
    }
});

/**
 * GET request to recover all
 * @param req
 * @param res
 * @returns {promise}
 */
async function getAdoptionsAskingLabels(req, res) {
    const token = req.query.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decoded.data._id) {
        let findAdoption = await adoptionAskingSchema.find({adoption_id:decoded.data._id}).select('user_name');
        const adoption = jwt.sign(
            { findAdoption },
            process.env.SECRET_TOKEN
        );
        return res.status(200).json({
            text: "Success",
            findAdoption: adoption
        });
    }
}

/**
 * GET request to recover all
 * @param req
 * @param res
 * @returns {promise}
 */
async function getOneAdoptionsAsking(req, res) {
    const token = req.query.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decoded.data._id) {
        let findAdoption = await adoptionAskingSchema.find({_id:decoded.data._id});
        let user = await userSchema.find({ _id: findAdoption[0].user_id }).select('firstName phoneNumber address email');
        findAdoption = JSON.parse(JSON.stringify(findAdoption[0]));
        findAdoption.email = user[0].email;
        findAdoption.address = user[0].address;
        findAdoption.phoneNumber = user[0].phoneNumber;
        findAdoption.firstName = user[0].firstName;
        const adoption = jwt.sign(
            { findAdoption },
            process.env.SECRET_TOKEN
        );
        return res.status(200).json({
            text: "Success",
            findAdoption: adoption
        });
    }
}

/**
 * GET request to recover all
 * @param req
 * @param res
 * @returns {promise}
 */
async function getAllAdoptionsAskingLabels(req, res) {
    const token = req.query.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decoded.data.association_id) {
        let findAdoptions = await adoptionSchema.find({association_id: decoded.data.association_id}).select('name');
        let findFolders = [];
        let fold;
        for( adoption of findAdoptions){
            let request = {
                adoption_id: adoption._id,
            };
            if(decoded.data.category !== "all"){
                request = {
                    adoption_id: adoption._id,
                    status: decoded.data.category
                };
            }
                fold = await adoptionAskingSchema.find(request).select('user_name');
                fold = JSON.parse(JSON.stringify(fold));
                for (let i = 0; i < fold.length; i++) {
                    fold[i].pet_name = adoption.name;
                }
                if( fold[0] )
                    findFolders.push(fold);
            }
        findFolders = findFolders[0];
        const folders = jwt.sign(
            { findFolders },
            process.env.SECRET_TOKEN
        );
        return res.status(200).json({
            text: "Success",
            findFolders: folders
        });
    }
}

/**
 * POST delete adoption askings with adoption id
 * @param req
 * @param res
 * @returns {promise}
 */
async function deleteAdoptionsAskingWithAdoptionId(req, res) {
    const token = req.body.params.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decoded.data._id) {
        await adoptionAskingSchema.deleteMany({adoption_id:decoded.data._id});
        return res.status(200).json({
            text: "Success",
        });
    }
}

/**
 * POST update adoption asking with new user name
 * @param req
 * @param res
 * @returns {promise}
 */
async function updateAdoptionsAskingUserName(req, res) {
    const token = req.body.params.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decoded.data._id) {
        await adoptionAskingSchema.updateMany(
            {user_id: decoded.data._id},
            {user_name: decoded.data.lastName});
    }
}

/**
 * POST put a folder waiting
 * @param req
 * @param res
 * @returns {promise}
 */
async function waitAdoptionsAsking(req, res) {
    const token = req.body.params.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decoded.data._id) {
        let adoptionFolder = await adoptionAskingSchema.findOne({_id: decoded.data._id}).select('user_id adoption_id');
        let user = await userSchema.findOne({ _id: adoptionFolder.user_id }).select('email');
        let adoption = await adoptionSchema.findOne({ _id: adoptionFolder.adoption_id }).select('name');
        if (!user.email) {
            return res.status(202).json({
                text: "User not found"
            });
        } else {
            ejs.renderFile(__dirname + "/../../emails/waitAdoptionAskingFolder.ejs", {tr: req.body.params.tr, petName:adoption.name}, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    let object = "MyPetsLife - Étude de votre dossier";
                    let content = "Bonjour !\n" +
                        " Votre dossier d'adoption concernant "+ adoption.name +" vient d'être mis en attente. Vous serez contacté dès que l'association aura terminé d'étudier votre dossier.\n" +
                        "En attendant, rendez vous disponible et n'oubliez pas de consulter régulièrement vos mails et votre messagerie MyPetsLife.\n" +
                        "https://mypetslife.co/conversations";
                    if (req.body.params.tr === "en") {
                        object = "MyPetsLife - Study of your file";
                        content = "Hello!\n" +
                            "Your adoption file for "+ adoption.name +" has just been put on hold. You will be contacted as soon as the association has finished studying your file.\n" +
                            "In the meantime, make yourself available and don't forget to check your emails and MyPetsLife messaging regularly.\n" +
                            "https://mypetslife.co/conversations";
                    } else if (req.body.params.tr === "pt") {
                        object = "MyPetsLife - Estudo do seu arquivo";
                        content = "Olá !\n" +
                            "Seu arquivo de adoção para "+ adoption.name +" acaba de ser colocado em espera. Você será contatado assim que a associação terminar de estudar seu arquivo.\n" +
                            "Enquanto isso, fique à disposição e não se esqueça de verificar seus e-mails e mensagens do MyPetsLife regularmente.\n" +
                            "https://mypetslife.co/conversations";
                    } else if (req.body.params.tr === "es") {
                        object = "MyPetsLife - Estudio de su expediente";
                        content = "¡Hola!\n" +
                            "Su archivo de adopción para " + adoption.name + " acaba de quedar en espera. Serás contactado tan pronto como la asociación haya terminado de estudiar tu expediente.\n" +
                            "Mientras tanto, esté disponible y no olvide revisar sus correos electrónicos y mensajes de MyPetsLife con regularidad.\n" +
                            "https://mypetslife.co/conversations";
                    } else if (req.body.params.tr === "de") {
                        object = "MyPetsLife - Studium Ihrer Akte";
                        content = "Hallo! \n" +
                            "Ihre Adoptionsdatei für " + adoption.name + " wurde gerade zurückgestellt. Sie werden kontaktiert, sobald der Verein Ihre Akte studiert hat.\n" +
                            "Stellen Sie sich in der Zwischenzeit zur Verfügung und vergessen Sie nicht, Ihre E-Mails und MyPetsLife-Nachrichten regelmäßig zu überprüfen.\n" +
                            "https://mypetslife.co/conversations";
                    } else if (req.body.params.tr === "it") {
                        object = "MyPetsLife - Studio del tuo file";
                        content = "Ciao!\n" +
                            "Il tuo file di adozione per " + adoption.name + " è stato appena messo in attesa. Sarai contattato non appena l'associazione avrà terminato lo studio della tua pratica.\n" +
                            "Nel frattempo, renditi disponibile e non dimenticare di controllare regolarmente le tue e-mail e i messaggi di MyPetsLife.\n" +
                            "https://mypetslife.co/conversations";
                    }
                    const externMailOptions = {
                        from: process.env.MAIL_NOREPLY,
                        to: user.email,
                        subject: `${object}`,
                        text:
                            `${content}\n`,
                        html: data,
                    };
                    transporter.sendMail(externMailOptions, async (err, response) => {
                        if (err) {
                            console.error('there was an error: ', err);
                            return res.status(201).json({
                                text: "Error email",
                            });
                        } else {
                            await adoptionAskingSchema.updateOne(
                                {_id: decoded.data._id},
                                {status: "waiting"});
                            console.log('here is the res: ', response);
                            return res.status(200).json({
                                text: "Success email",
                            });
                        }
                    });
                }
            });
        }
    }
}

/**
 * POST put a folder refuse
 * @param req
 * @param res
 * @returns {promise}
 */
async function refuseAdoptionsAsking(req, res) {
    const token = req.body.params.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decoded.data._id) {
        let adoptionFolder = await adoptionAskingSchema.findOne({_id: decoded.data._id}).select('user_id adoption_id');
        let user = await userSchema.findOne({ _id: adoptionFolder.user_id }).select('email');
        let adoption = await adoptionSchema.findOne({ _id: adoptionFolder.adoption_id }).select('name');
        if (!user.email) {
            return res.status(202).json({
                text: "User not found"
            });
        } else {
            ejs.renderFile(__dirname + "/../../emails/refuseAdoptionAskingFolder.ejs", {tr: req.body.params.tr, petName:adoption.name}, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    let object = "MyPetsLife - Étude de votre dossier";
                    let content = "Bonjour !\n" +
                        "Votre dossier de demande d'adoption concernant "+ adoption.name + " vient d'être étudié. Malheureusement, cette association n'a pas souhaité donner suite à votre demande.\n" +
                        "Nous continuons de vous accompagner dans votre recherche, cliquez pour voir les autres animaux à adopter !\n" +
                        "https://mypetslife.co/adoption";
                    if (req.body.params.tr === "en") {
                        object = "MyPetsLife - Study of your file";
                        content = "Hello!\n" +
                            "Your adoption application file concerning " + adoption.name + " has just been studied. Unfortunately, this association did not wish to respond to your request.\n" +
                            "We continue to support you in your search, click to see other animals to adopt!\n" +
                            "https://mypetslife.co/adoption";
                    } else if (req.body.params.tr === "pt") {
                        object = "MyPetsLife - Estudo do seu arquivo";
                        content = "Olá !\n" +
                            "Seu arquivo de solicitação de adoção relativo a <%= petName%> acaba de ser estudado. Infelizmente, esta associação não quis responder à sua solicitação.\n" +
                            "Continuamos apoiando você em sua busca, clique para ver outros animais para adotar!\n" +
                            "https://mypetslife.co/adoption";
                    } else if (req.body.params.tr === "es") {
                        object = "MyPetsLife - Estudio de su expediente";
                        content = "¡Hola!\n" +
                            "Su archivo de solicitud de adopción relativo a " + adoption.name + " acaba de ser estudiado. Desafortunadamente, esta asociación no quiso responder a su solicitud.\n" +
                            "Seguimos apoyándote en tu búsqueda, ¡haz clic para ver otros animales para adoptar!\n" +
                            "https://mypetslife.co/adoption";
                    } else if (req.body.params.tr === "de") {
                        object = "MyPetsLife - Studium Ihrer Akte";
                        content = "Hallo! \n" +
                            "Ihre Adoptionsantragsdatei zu "+ adoption.name + " wurde gerade untersucht. Leider wollte dieser Verein nicht auf Ihre Anfrage antworten.\n" +
                            "Wir unterstützen Sie weiterhin bei Ihrer Suche. Klicken Sie hier, um andere Tiere zur Adoption zu sehen!\n" +
                            "https://mypetslife.co/adoption";
                    } else if (req.body.params.tr === "it") {
                        object = "MyPetsLife - Studio del tuo file";
                        content = "Ciao!\n" +
                            "Il tuo file di domanda di adozione relativo a "+ adoption.name +" è stato appena esaminato. Purtroppo questa associazione non ha voluto rispondere alla tua richiesta.\n" +
                            "Continuiamo a supportarti nella tua ricerca, clicca per vedere altri animali da adottare!\n" +
                            "https://mypetslife.co/adoption";
                    }
                    const externMailOptions = {
                        from: process.env.MAIL_NOREPLY,
                        to: user.email,
                        subject: `${object}`,
                        text:
                            `${content}\n`,
                        html: data,
                    };
                    transporter.sendMail(externMailOptions, async (err, response) => {
                        if (err) {
                            console.error('there was an error: ', err);
                            return res.status(201).json({
                                text: "Error email",
                            });
                        } else {
                            await conversation.findConversationAndSendMessage(adoptionFolder.association_id, user._id, content);
                            await adoptionAskingSchema.updateOne(
                                {_id: decoded.data._id},
                                {status: "refused"});
                            console.log('here is the res: ', response);
                            return res.status(200).json({
                                text: "Success email",
                            });
                        }
                    });
                }
            });
        }
    }
}

/**
 * POST put a folder refuse
 * @param req
 * @param res
 * @returns {promise}
 */
async function refuseLocalAdoptionsAsking(id, tr) {
    let adoptionFolder = await adoptionAskingSchema.findOne({_id: id}).select('user_id adoption_id');
    let user = await userSchema.findOne({ _id: adoptionFolder.user_id }).select('email');
    let adoption = await adoptionSchema.findOne({ _id: adoptionFolder.adoption_id }).select('name');
    if (!user.email) {
        return false;
    } else {
        ejs.renderFile(__dirname + "/../../emails/refuseAdoptionAskingFolder.ejs", {tr: tr, petName:adoption.name}, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let object = "MyPetsLife - Étude de votre dossier";
                let content = "Bonjour !\n" +
                    "Votre dossier de demande d'adoption concernant "+ adoption.name + " vient d'être étudié. Malheureusement, cette association n'a pas souhaité donner suite à votre demande.\n" +
                    "Nous continuons de vous accompagner dans votre recherche, cliquez pour voir les autres animaux à adopter !\n" +
                    "https://mypetslife.co/adoption";
                if (tr === "en") {
                    object = "MyPetsLife - Study of your file";
                    content = "Hello!\n" +
                        "Your adoption application file concerning " + adoption.name + " has just been studied. Unfortunately, this association did not wish to respond to your request.\n" +
                        "We continue to support you in your search, click to see other animals to adopt!\n" +
                        "https://mypetslife.co/adoption";
                } else if (tr === "pt") {
                    object = "MyPetsLife - Estudo do seu arquivo";
                    content = "Olá !\n" +
                        "Seu arquivo de solicitação de adoção relativo a <%= petName%> acaba de ser estudado. Infelizmente, esta associação não quis responder à sua solicitação.\n" +
                        "Continuamos apoiando você em sua busca, clique para ver outros animais para adotar!\n" +
                        "https://mypetslife.co/adoption";
                } else if (tr === "es") {
                    object = "MyPetsLife - Estudio de su expediente";
                    content = "¡Hola!\n" +
                        "Su archivo de solicitud de adopción relativo a " + adoption.name + " acaba de ser estudiado. Desafortunadamente, esta asociación no quiso responder a su solicitud.\n" +
                        "Seguimos apoyándote en tu búsqueda, ¡haz clic para ver otros animales para adoptar!\n" +
                        "https://mypetslife.co/adoption";
                } else if (tr === "de") {
                    object = "MyPetsLife - Studium Ihrer Akte";
                    content = "Hallo! \n" +
                        "Ihre Adoptionsantragsdatei zu "+ adoption.name + " wurde gerade untersucht. Leider wollte dieser Verein nicht auf Ihre Anfrage antworten.\n" +
                        "Wir unterstützen Sie weiterhin bei Ihrer Suche. Klicken Sie hier, um andere Tiere zur Adoption zu sehen!\n" +
                        "https://mypetslife.co/adoption";
                } else if (tr === "it") {
                    object = "MyPetsLife - Studio del tuo file";
                    content = "Ciao!\n" +
                        "Il tuo file di domanda di adozione relativo a "+ adoption.name +" è stato appena esaminato. Purtroppo questa associazione non ha voluto rispondere alla tua richiesta.\n" +
                        "Continuiamo a supportarti nella tua ricerca, clicca per vedere altri animali da adottare!\n" +
                        "https://mypetslife.co/adoption";
                }
                const externMailOptions = {
                    from: process.env.MAIL_NOREPLY,
                    to: user.email,
                    subject: `${object}`,
                    text:
                        `${content}\n`,
                    html: data,
                };
                transporter.sendMail(externMailOptions, async (err, response) => {
                    if (err) {
                        console.error('there was an error: ', err);
                    } else {
                        await conversation.findConversationAndSendMessage(adoptionFolder.association_id, user._id, content);
                        await adoptionAskingSchema.updateOne(
                            {_id: id},
                            {status: "refused"});
                        console.log('here is the res: ', response);
                    }
                });
            }
        });
    }
}

/**
 * POST update adoption asking with new user name
 * @param req
 * @param res
 * @returns {promise}
 */
async function commentAdoptionsAsking(req, res) {
    const token = req.body.params.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decoded.data._id) {
        const adoption = await adoptionAskingSchema.updateMany(
            {_id: decoded.data._id},
            {comment: decoded.data.comment});
        if(adoption.n !== 0) {
            return res.status(200).json({
                text: "Success email",
            });
        }
    }
}

/**
 * POST put a folder accepted
 * @param req
 * @param res
 * @returns {promise}
 */
async function acceptAdoptionsAsking(req, res) {
    const token = req.body.params.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decoded.data._id) {
        let adoptionFolder = await adoptionAskingSchema.findOne({_id: decoded.data._id}).select('user_id adoption_id');
        let user = await userSchema.findOne({ _id: adoptionFolder.user_id }).select('email');
        let adoption = await adoptionSchema.findOne({ _id: adoptionFolder.adoption_id }).select('name folderStatus');
        if(adoption.folderStatus === "accepted") {
            return res.status(205).json({
                text: "Already accepted"
            });
        }else if(adoption.folderStatus === "finished"){
            return res.status(206).json({
                text: "Already adopted"
            });
        }else {
            if (!user.email) {
                return res.status(202).json({
                    text: "User not found"
                });
            } else {
                ejs.renderFile(__dirname + "/../../emails/acceptAdoptionAskingFolder.ejs", {
                    tr: req.body.params.tr,
                    petName: adoption.name
                }, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        let object = "MyPetsLife - Étude de votre dossier";
                        let content = "Bonjour !\n" +
                            "Votre dossier d'adoption concernant " + adoption.name + " vient d'être accepté !\n" +
                            "Vous pouvez dès maintenant échanger avec l'association via votre messagerie MyPetsLife pour poursuivre le processus d'adoption.\n" +
                            "En attendant, n'hésitez pas à consulter notre blog pour préparer l'arrivé de votre petit protégé.\n"+
                            "https://mypetslife.co/conversations";
                        if (req.body.params.tr === "en") {
                            object = "MyPetsLife - Study of your file";
                            content = "Hello!\n" +
                                "Your adoption file for " + adoption.name + " has just been accepted!\n" +
                                "You can now communicate with the association via your MyPetsLife messaging to continue the adoption process.\n" +
                                "In the meantime, do not hesitate to consult our blog to prepare the arrival of your little protégé."+
                                "https://mypetslife.co/conversations";
                        } else if (req.body.params.tr === "pt") {
                            object = "MyPetsLife - Estudo do seu arquivo";
                            content = "Olá !\n" +
                                "Seu arquivo de adoção para " + adoption.name + " acaba de ser aceito!\n" +
                                "Agora você pode falar com a associação através do seu sistema de mensagens MyPetsLife para continuar o processo de adoção.\n" +
                                "Entretanto, não hesite em consultar o nosso blogue para preparar a chegada do seu pequeno protegido."+
                                "https://mypetslife.co/conversations";
                        } else if (req.body.params.tr === "es") {
                            object = "MyPetsLife - Estudio de su expediente";
                            content = "¡Hola!\n" +
                                "¡Su archivo de adopción para " + adoption.name + " acaba de ser aceptado!\n" +
                                "Ahora puede comunicarse con la asociación a través de su mensaje de MyPetsLife para continuar con el proceso de adopción.\n" +
                                "Mientras tanto, no dudes en consultar nuestro blog para preparar la llegada de tu pequeño protegido.\n"+
                                "https://mypetslife.co/conversations";
                        } else if (req.body.params.tr === "de") {
                            object = "MyPetsLife - Studium Ihrer Akte";
                            content = "Hallo! \n" +
                                "Ihre Adoptionsdatei für " + adoption.name + " wurde gerade akzeptiert!\n" +
                                "Sie können jetzt über Ihre MyPetsLife-Nachrichten mit der Zuordnung kommunizieren, um den Adoptionsprozess fortzusetzen.\n" +
                                "Zögern Sie in der Zwischenzeit nicht, unseren Blog zu konsultieren, um die Ankunft Ihres kleinen Schützlings vorzubereiten.\n"+
                                "https://mypetslife.co/conversations";
                        } else if (req.body.params.tr === "it") {
                            object = "MyPetsLife - Studio del tuo file";
                            content = "Ciao!\n" +
                                "Il tuo file di adozione per " + adoption.name + " è stato appena accettato!\n" +
                                "Ora puoi parlare con l'associazione tramite il tuo sistema di messaggistica MyPetsLife per continuare il processo di adozione.\n" +
                                "Nel frattempo, non esitate a consultare il nostro blog per preparare l'arrivo del vostro piccolo protetto.\n"+
                                "https://mypetslife.co/conversations";
                        }
                        const externMailOptions = {
                            from: process.env.MAIL_NOREPLY,
                            to: user.email,
                            subject: `${object}`,
                            text:
                                `${content}\n`,
                            html: data,
                        };
                        transporter.sendMail(externMailOptions, async (err, response) => {
                            if (err) {
                                console.error('there was an error: ', err);
                                return res.status(201).json({
                                    text: "Error email",
                                });
                            } else {
                                await conversation.findConversationAndSendMessage(adoptionFolder.association_id, user._id, content);
                                await adoptionAskingSchema.updateOne(
                                    {_id: decoded.data._id},
                                    {status: "accepted"});
                                await adoptionSchema.updateOne(
                                    {_id: adoptionFolder.adoption_id},
                                    {folderStatus: "accepted"});
                                console.log('here is the res: ', response);
                                return res.status(200).json({
                                    text: "Success email",
                                });
                            }
                        });
                    }
                });
            }
        }
    }
}

/**
 * POST put a folder accepted finally
 * @param req
 * @param res
 * @returns {promise}
 */
async function acceptUserAdoptionsAsking(req, res) {
    const token = req.body.params.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decoded.data._id) {
        let adoptionFolder = await adoptionAskingSchema.findOne({_id: decoded.data._id}).select('user_id adoption_id');
        console.log(adoptionFolder);
        let adoption = await adoptionSchema.findOne({ _id: adoptionFolder.adoption_id }).select('name folderStatus');
        const updated = await adoptionSchema.updateOne(
            {_id: adoptionFolder.adoption_id},
            {folderStatus: "finished",
            status:"archived"});
            if(updated.n !== 0 ){
                let adoptionFolders = await adoptionAskingSchema.find({adoption_id: adoptionFolder.adoption_id}).select('user_id');
                for (folder of adoptionFolders){
                    if(folder._id !== decoded.data._id)
                        refuseLocalAdoptionsAsking(folder._id, req.body.params.tr);
                }
                return res.status(200).json({
                    text: "Successfully accepted",
                });
            }
    }
}

/**
 * POST put a folder refuse finally
 * @param req
 * @param res
 * @returns {promise}
 */
async function refuseUserAdoptionsAsking(req, res) {
    const token = req.body.params.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decoded.data._id) {
        let adoptionFolder = await adoptionAskingSchema.findOne({_id: decoded.data._id}).select('user_id adoption_id');
        let adoption = await adoptionSchema.findOne({ _id: adoptionFolder.adoption_id }).select('name folderStatus');
        const updatedAdoption = await adoptionSchema.updateOne(
            {_id: adoptionFolder.adoption_id},
            {folderStatus: ""});
        const updatedFolder = await adoptionAskingSchema.updateOne(
            {_id: decoded.data._id},
            {status: "refused"});
        if(updatedAdoption.n !== 0 && updatedFolder.n !== 0){
            return res.status(200).json({
                text: "Success refused",
            });
        }
    }
}

exports.getAdoptionsAskingLabels = getAdoptionsAskingLabels;
exports.getOneAdoptionsAsking = getOneAdoptionsAsking;
exports.getAllAdoptionsAskingLabels = getAllAdoptionsAskingLabels;
exports.deleteAdoptionsAskingWithAdoptionId = deleteAdoptionsAskingWithAdoptionId;
exports.updateAdoptionsAskingUserName = updateAdoptionsAskingUserName;
exports.waitAdoptionsAsking = waitAdoptionsAsking;
exports.refuseAdoptionsAsking = refuseAdoptionsAsking;
exports.commentAdoptionsAsking = commentAdoptionsAsking;
exports.acceptAdoptionsAsking = acceptAdoptionsAsking;
exports.acceptUserAdoptionsAsking = acceptUserAdoptionsAsking;
exports.refuseUserAdoptionsAsking = refuseUserAdoptionsAsking;
