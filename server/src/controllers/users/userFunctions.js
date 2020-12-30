// ----- /user functions ----- //
const ejs = require("ejs");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adoptionAskingFunction = require("../adoptionAsking/adoptionAskingFunctions");
const User = require("../../schema/userSchema.js");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
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
var request = require('superagent');

/**
 * GET request to check if the mail address already exist
 * @param req
 * @param res
 * @returns {promise}
 */
async function checkAddr(req, res) {
    const findUser = await User.findOne({email: req.query.email});
    if (!findUser) {
        return res.status(201).json({
            text: "User not found"
        });
    } else {
        return res.status(200).json({
            text: "User found"
        });
    }
}

/**
 * POST request to subscribe to mailchimp newsletter
 * @param req
 * @param res
 * @returns {promise}
 */
async function subscribeNewsletter(req, res) {
    let email;
    const decoded = jwt.verify(req.body.params.email, process.env.SECRET_TOKEN);
    if (decoded.data) {
        email = decoded.data;
    } else {
        email = req.body.params.email;
    }
    request
        .post('https://' + process.env.MAILCHIMP_INSTANCE + '.api.mailchimp.com/3.0/lists/' + process.env.MAILCHIMP_LIST_ID + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + process.env.MAILCHIMP_API_KEY).toString('base64'))
        .send({
            'email_address': email,
            'status': 'subscribed',
        })
        .end(function (err, response) {
            if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                return res.status(200).json({
                    text: "User subcribed"
                });
            } else {
                return res.status(201).json({
                    text: "User not subcribed"
                });
            }
        });
}

/**
 * GET request to check if the pseudo already exist
 * @param req
 * @param res
 * @returns {promise}
 */
async function checkPseudo(req, res) {
    const findUser = await User.findOne({pseudo: req.query.pseudo});
    if (!findUser) {
        return res.status(201).json({
            text: "User not found"
        });
    } else {
        return res.status(200).json({
            text: "User found"
        });
    }
}

/**
 * GET request to login an user
 * @param req
 * @param res
 * @returns {promise}
 */
async function loginUser(req, res) {

    const findUser = await User.findOne({email: req.query.email});

    if (!findUser) {
        return res.status(202).json({
            text: "User not found"
        });
    } else {
        const token = jwt.sign(
            {findUser},
            process.env.SECRET_TOKEN
        );
        return res.status(200).json({
            text: "Success",
            token: token
        });
    }
}

/**
 * POST request to confirm an email
 * @param req
 * @param res
 * @returns {promise}
 */
async function confirmEmail(req, res) {
    const findUserBefore = await User.findOne({confirmEmailToken: req.body.params.token});
    if (findUserBefore) {
        const email = findUserBefore.email;
        const user = await User.updateOne({
            confirmEmailToken: req.body.params.token,
        }, {
            confirmed: true,
            confirmEmailToken: ""
        });
        const findUser = await User.findOne({email: email});
        const userToken = jwt.sign(
            {findUser},
            process.env.SECRET_TOKEN
        );
        if (user.nModified === 1) {
            return res.status(200).json({
                text: "Email confirmed",
                token: userToken,
            });
        } else {
            return res.status(201).json({
                text: "Email not confirmed",
                token: userToken,
            });
        }
    } else {
        return res.status(202).json({
            text: "No user"
        });
    }
}

/**
 * POST request to change the email and send a confirm email
 * @param req
 * @param res
 * @returns {promise}
 */
async function changeEmailAndConfirm(req, res) {
    const user = await User.updateOne({
        email: req.body.params.oldEmail,
    }, {
        email: req.body.params.email,
    });
    if (user.nModified === 1) {
        sendConfirmEmail(req, res);
    } else {
        return res.status(201).json({
            text: "User not found"
        });
    }
}

/**
 * POST request to send a confirm email
 * @param req
 * @param res
 * @returns {promise}
 */
async function sendConfirmEmail(req, res) {
    const token = crypto.randomBytes(20).toString('hex');
    const user = await User.updateOne({
        email: req.body.params.email,
    }, {
        confirmed: false,
        confirmEmailToken: token
    });
    const findUser = await User.findOne({email: req.body.params.email});
    const userToken = jwt.sign(
        {findUser},
        process.env.SECRET_TOKEN
    );
    if (user.nModified === 1) {
        const confirmUrl = `${process.env.DOMAIN}/confirm_email/${token}`;
        ejs.renderFile(__dirname + "/../../emails/confirmEmail.ejs", {
            confirmUrl: confirmUrl,
            tr: req.body.params.tr,
            pseudo: findUser.pseudo
        }, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let object = "MyPetsLife - Confirmation de votre adresse mail";
                let content = "Pour confirmer votre adresse mail et profiter de toutes les fonctionnalités de MyPetsLife, cliquez sur le lien ci-dessous :";
                if (req.body.params.tr === "en") {
                    object = "MyPetsLife - Confirmation of your email address";
                    content = "To confirm your email address and take advantage of all the features of MyPetsLife, click on the link below:";
                } else if (req.body.params.tr === "pt") {
                    object = "MyPetsLife - Confirmação do seu endereço de email";
                    content = "Para confirmar seu endereço de e-mail e aproveitar todos os recursos do MyPetsLife, clique no link abaixo:";
                } else if (req.body.params.tr === "es") {
                    object = "MyPetsLife - Confirmación de su dirección de correo electrónico";
                    content = "Para confirmar su dirección de correo electrónico y aprovechar todas las funciones de MyPetsLife, haga clic en el enlace siguiente:";
                } else if (req.body.params.tr === "de") {
                    object = "MyPetsLife - Bestätigung Ihrer E-Mail-Adresse";
                    content = "Um Ihre E-Mail-Adresse zu bestätigen und alle Funktionen von MyPetsLife zu nutzen, klicken Sie auf den folgenden Link:";
                } else if (req.body.params.tr === "it") {
                    object = "MyPetsLife - Conferma del tuo indirizzo email";
                    content = "Per confermare il tuo indirizzo email e usufruire di tutte le funzionalità di MyPetsLife, fai clic sul link sottostante:";
                }
                const mailOptions = {
                    from: process.env.MAIL_NOREPLY,
                    to: req.body.params.email,
                    subject: `${object}`,
                    text:
                        `${content}\n`
                        + `${confirmUrl}\n\n`,
                    html: data,
                };
                transporter.sendMail(mailOptions, (err, response) => {
                    if (err) {
                        console.error('there was an error: ', err);
                        return res.status(201).json({
                            text: "Error email",
                            token: userToken,
                        });
                    } else {
                        console.log('here is the res: ', response);
                        return res.status(200).json({
                            text: "Success email",
                            token: userToken,
                        });
                    }
                });
            }
        });
    } else {
        return res.status(202).json({
            text: "No user",
            token: userToken,
        });
    }
}

/**
 * POST request to send a confirm new email address email
 * @param req
 * @param res
 * @returns {promise}
 */
async function sendConfirmNewEmail(req, res) {
    const token = crypto.randomBytes(20).toString('hex');
    const user = await User.updateOne({
        email: req.body.params.email,
    }, {
        confirmed: false,
        confirmEmailToken: token
    });
    if (user.nModified === 1) {
        const confirmUrl = `${process.env.DOMAIN}/confirm_email/${token}`;
        ejs.renderFile(__dirname + "/../../emails/confirmNewEmail.ejs", {
            confirmUrl: confirmUrl,
            tr: req.body.params.tr
        }, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let object = "MyPetsLife - Confirmation de votre nouvelle adresse mail";
                let content = "Pour confirmer votre adresse mail et profiter de toutes les fonctionnalités de MyPetsLife, cliquez sur le lien ci-dessous :";
                if (req.body.params.tr === "en") {
                    object = "MyPetsLife - Confirmation of your new email address";
                    content = "You have just changed your email address via your My Pets Life profile.We therefore need you to confirm this new email address to verify that it is indeed you!" +
                        "By clicking on the button below, you will be able to take advantage of all our features again.";
                } else if (req.body.params.tr === "pt") {
                    object = "MyPetsLife - Confirmação do seu novo endereço de email";
                    content = "Você acabou de alterar o seu endereço de e-mail através do perfil do My Pets Life. Portanto, precisamos que você confirme este novo endereço de e-mail para verificar se é você mesmo!" +
                        "Ao clicar no botão abaixo, você poderá aproveitar novamente todos os nossos recursos.";
                } else if (req.body.params.tr === "es") {
                    object = "MyPetsLife - Confirmación de su nueva dirección de correo electrónico";
                    content = "Acaba de cambiar su dirección de correo electrónico a través de su perfil de My Pets Life.Por lo tanto, necesitamos que confirme esta nueva dirección de correo electrónico para verificar que efectivamente es usted." +
                        "Al hacer clic en el botón de abajo, podrá volver a aprovechar todas nuestras funciones.";
                } else if (req.body.params.tr === "de") {
                    object = "MyPetsLife - Bestätigung Ihrer neue E-Mail-Adresse";
                    content = "Sie haben gerade Ihre E-Mail-Adresse über Ihr My Pets Life-Profil geändert. Sie müssen daher diese neue E-Mail-Adresse bestätigen, um zu überprüfen, ob Sie es tatsächlich sind!" +
                        "Wenn Sie auf die Schaltfläche unten klicken, können Sie alle unsere Funktionen wieder nutzen.";
                } else if (req.body.params.tr === "it") {
                    object = "MyPetsLife - Conferma del tuo nuovo indirizzo email";
                    content = "Hai appena cambiato il tuo indirizzo e-mail tramite il tuo profilo My Pets Life.Abbiamo quindi bisogno che tu confermi questo nuovo indirizzo email per verificare che sei davvero tu!" +
                        "Cliccando sul pulsante qui sotto potrai usufruire di nuovo di tutte le nostre funzionalità.";
                }
                const mailOptions = {
                    from: process.env.MAIL_NOREPLY,
                    to: req.body.params.email,
                    subject: `${object}`,
                    text:
                        `${content}\n`
                        + `${confirmUrl}\n\n`,
                    html: data,
                };
                transporter.sendMail(mailOptions, (err, response) => {
                    if (err) {
                        console.error('there was an error: ', err);
                        return res.status(201).json({
                            text: "Error email"
                        });
                    } else {
                        console.log('here is the res: ', response);
                        return res.status(200).json({
                            text: "Success email"
                        });
                    }
                });
            }
        });
    } else {
        return res.status(202).json({
            text: "No user"
        });
    }
}

/**
 * POST request to send a confirm subscribe newsletter email
 * @param req
 * @param res
 * @returns {promise}
 */
async function sendConfirmNewsletterEmail(req, res) {
    ejs.renderFile(__dirname + "/../../emails/newsletterValidation.ejs", {tr: req.body.params.tr}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let object = "MyPetsLife - Newsletter subscription";
            let content = "Your subscription to the MyPetsLife newsletter has been taken into account, we are delighted to welcome you among us." +
                "You will receive your first newsletter very soon. Thank you for your trust";
            if (req.body.params.tr === "fr") {
                object = "MyPetsLife - Abonnement newsletter";
                content = "Votre abonnement à la newsletter de MyPetsLife a bien été pris en compte, nous sommes ravis de vous accueillir parmis nous. " +
                    "Vous recevrez très bientôt votre première newsletter. Merci de votre confiance";
            } else if (req.body.params.tr === "pt") {
                object = "MyPetsLife - assinatura do boletim informativo";
                content = "Sua assinatura do boletim informativo MyPetsLife foi levada em consideração, temos o prazer de recebê-lo entre nós." +
                    "Em breve receberá a sua primeira newsletter. Obrigado pela sua confiança";
            } else if (req.body.params.tr === "es") {
                bject = "MyPetsLife - Suscripción al boletín";
                content = "Se ha tenido en cuenta su suscripción al boletín MyPetsLife, estamos encantados de darle la bienvenida entre nosotros." +
                    "Recibirás tu primer boletín muy pronto. Gracias por tu confianza";
            } else if (req.body.params.tr === "de") {
                object = "MyPetsLife - Newsletter-Abonnement";
                content = "Ihr Abonnement für den MyPetsLife-Newsletter wurde berücksichtigt. Wir freuen uns, Sie bei uns begrüßen zu dürfen." +
                    "Sie erhalten sehr bald Ihren ersten Newsletter. Vielen Dank für Ihr Vertrauen";
            } else if (req.body.params.tr === "it") {
                object = "MyPetsLife - Abbonamento alla newsletter";
                content = "La tua iscrizione alla newsletter di MyPetsLife è stata presa in considerazione, siamo lieti di darti il ​​benvenuto tra noi." +
                    "Riceverai presto la tua prima newsletter. Grazie per la tua fiducia";
            }
            const mailOptions = {
                from: process.env.MAIL_NOREPLY,
                to: req.body.params.email,
                subject: `${object}`,
                text:
                    `${content}\n`,
                html: data,
            };
            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    console.error('there was an error: ', err);
                    return res.status(201).json({
                        text: "Error email",
                    });
                } else {
                    console.log('here is the res: ', response);
                    return res.status(200).json({
                        text: "Success email",
                    });
                }
            });
        }
    });
}

/**
 * POST request to signup as particular
 * @param req
 * @param res
 * @returns {promise}
 */
async function signupParticulier(req, res) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.params.password, salt);
    const token = crypto.randomBytes(20).toString('hex');
    const user = require("../../schema/userSchema");
    const new_user = new user({
        completed: false,
        email: req.body.params.email,
        password: hash,
        professional: false,
        confirmed: false,
        confirmEmailToken: token,
        tokenResetPassword: "",

        // Inscription Checkbox
        acceptation: {
            cgu: req.body.params.cgu,
            preference: req.body.params.preference,
            newsletter: req.body.params.newsletter
        },
    });
    new_user.save();
    // Envoi du mail de confirmation
    const mailOptions = {
        from: 'noreply@mypetslife.fr',
        to: `${req.body.params.email}`,
        subject: 'Confirmation de votre adresse email',
        text:
            'Pour confirmer votre adresse email et découvrir les fonctionnalités, cliquez sur le lien ci-dessous :\n'
            + `http://localhost:3000/signin/${token}\n\n`,
    };
    console.log('sending mail');
    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            console.error('there was an error: ', err);
        } else {
            console.log('here is the res: ', response);
            return res.status(200).json({
                text: "Success email"
            });
            return res.ok();
        }
    });
}

/**
 * POST request to send a contact email
 * @param req
 * @param res
 * @returns {promise}
 */
async function sendContactMail(req, res) {
    const infos = {
        firstName: req.body.params.firstName,
        lastName: req.body.params.lastName,
        email: req.body.params.email,
        phone: req.body.params.phone,
        object: req.body.params.object,
        subObject: req.body.params.subObject,
        content: req.body.params.message,
    }

    var mailObject;
    if (infos.object === 'sponsorship') {
        mailObject = 'Partenariat'
    } else if (infos.object === 'info') {
        mailObject = 'Demande d\'informations'
    } else if (infos.object === 'asso') {
        mailObject = 'Association'
    } else if (infos.object === 'subscription') {
        mailObject = 'Abonnement'
    } else if (infos.object === 'bug') {
        mailObject = 'Bug sur le site'
    } else if (infos.object === 'media') {
        mailObject = 'Media'
    } else {
        mailObject = 'Divers'
    }
    const text = `Nom: ${infos.lastName}\n`
        + `Prénom: ${infos.firstName}\n`
        + `Mail: ${infos.email}\n`
        + `Tel: ${infos.phone ? infos.phone : `Non communiqué.`}\n\n`
        + `${infos.content}`
    const internMailOptions = {
        from: infos.email,
        to: process.env.MAIL_CONTACT,
        subject: `FORMULAIRE DE CONTACT : ${mailObject} -  ${infos.subObject}`,
        text: `${text}`,
    };
    transporter.sendMail(internMailOptions, (err, response) => {
        if (err) {
            return res.status(201).json({
                text: "Mail non envoyé"
            });
        } else {
            ejs.renderFile(__dirname + "/../../emails/contactFormUserSend.ejs", {
                tr: req.body.params.tr,
                lastname: infos.lastName,
                firstname: infos.firstName,
                phone: infos.phone,
                content: infos.content,
                object: mailObject,
                subObject: infos.subObject
            }, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    let object = "MyPetsLife - Demande de contact";
                    let content = "Votre demande de contact MyPetsLife a bien été prise en compte. Nous vous remercions pour votre message." +
                        "Notre équipe reviendra vers vous dans les plus brefs délais ! Nous avons bien reçu la demande de contact ci-dessous : \n";
                    if (req.body.params.tr === "en") {
                        object = "MyPetsLife - Contact request";
                        content = "Your MyPetsLife contact request has been taken into account. Thank you for your message." +
                            "Our team will get back to you as soon as possible! We have received the contact request below: \ n";
                    } else if (req.body.params.tr === "pt") {
                        object = "MyPetsLife - solicitação de contato";
                        content = "Sua solicitação de contato MyPetsLife foi levada em consideração. Obrigado por sua mensagem." +
                            "Nossa equipe entrará em contato com você o mais breve possível! Recebemos a solicitação de contato abaixo: \ n";
                    } else if (req.body.params.tr === "es") {
                        object = "MyPetsLife - Solicitud de contacto";
                        content = "Se ha tenido en cuenta su solicitud de contacto de MyPetsLife. Gracias por su mensaje." +
                            "¡Nuestro equipo se pondrá en contacto contigo lo antes posible! Hemos recibido la solicitud de contacto a continuación: \ n";
                    } else if (req.body.params.tr === "de") {
                        object = "MyPetsLife - Kontaktanfrage";
                        content = "Ihre MyPetsLife-Kontaktanfrage wurde berücksichtigt. Vielen Dank für Ihre Nachricht." +
                            "Unser Team wird sich so schnell wie möglich bei Ihnen melden! Wir haben die folgende Kontaktanfrage erhalten: \ n";
                    } else if (req.body.params.tr === "it") {
                        object = "MyPetsLife - Richiesta di contatto";
                        content = "La tua richiesta di contatto di MyPetsLife è stata presa in considerazione. Grazie per il tuo messaggio." +
                            "Il nostro team ti risponderà il prima possibile! Abbiamo ricevuto la richiesta di contatto di seguito: \ n";
                    }
                    content = content + text;
                    const externMailOptions = {
                        from: process.env.MAIL_NOREPLY,
                        to: req.body.params.email,
                        subject: `${object}`,
                        text:
                            `${content}\n`,
                        html: data,
                    };
                    transporter.sendMail(externMailOptions, (err, response) => {
                        if (err) {
                            console.error('there was an error: ', err);
                            return res.status(201).json({
                                text: "Error email",
                            });
                        } else {
                            console.log('here is the res: ', response);
                            return res.status(200).json({
                                text: "Success email",
                            });
                        }
                    });
                }
            });
        }
    });
}

/**
 * POST send a mail to add a new password
 * @param req
 * @param res
 * @returns {promise}
 */
async function forgotPassword(req, res) {
    const token = crypto.randomBytes(20).toString('hex');
    const user = await User.updateOne({
        email: req.body.params.email,
    }, {
        tokenResetPassword: token,
    });
    const resetUrl = `${process.env.DOMAIN}/forgot_password/${token}`;
    if (user.nModified !== 1) {
        return res.status(202).json({
            text: "User not found"
        });
    } else {
        ejs.renderFile(__dirname + "/../../emails/forgotPassword.ejs", {
            tr: req.body.params.tr,
            resetUrl: resetUrl
        }, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let object = "MyPetsLife - Réinitialisation du mot de passe";
                let content = "Bonjour ! Vous avez oublié votre mot de passe ? Pas de panique ! Vous n'avez qu'à cliquer sur le lien ci-dessous pour définir votre nouveau mot de passe.\n" +
                    resetUrl +
                    "\n Si vous n'êtes pas à l'origine de ce mail, pas de problème : il vous suffit de l'ignorer.";
                if (req.body.params.tr === "en") {
                    object = "MyPetsLife - Reset password";
                    content = "Hello! Forgot your password? Don't panic! Just click on the link below to set your new password. \n" +
                        resetUrl +
                        "\n If you are not the source of this email, no problem: just ignore it.";
                } else if (req.body.params.tr === "pt") {
                    object = "MyPetsLife - Redefinir senha";
                    content = "Olá! Esqueceu sua senha? Não entre em pânico! Basta clicar no link abaixo para definir sua nova senha. \n" +
                        resetUrl +
                        "\n Se você não é a fonte deste e-mail, não há problema: apenas ignore.";
                } else if (req.body.params.tr === "es") {
                    object = "MyPetsLife - Restablecer contraseña";
                    content = "¡Hola! ¿Olvidaste tu contraseña? ¡Que no cunda el pánico! Simplemente haz clic en el enlace de abajo para establecer tu nueva contraseña. \n" +
                        resetUrl +
                        "\n Si usted no es la fuente de este correo electrónico, no hay problema: simplemente ignórelo.";
                } else if (req.body.params.tr === "de") {
                    object = "MyPetsLife - Passwort zurücksetzen";
                    content = "Hallo! Passwort vergessen? Keine Panik! Klicken Sie einfach auf den unten stehenden Link, um Ihr neues Passwort festzulegen. \n" +
                        resetUrl +
                        "\n Wenn Sie nicht die Quelle dieser E-Mail sind, kein Problem: ignorieren Sie sie einfach.";
                } else if (req.body.params.tr === "it") {
                    object = "MyPetsLife - Reimposta password";
                    content = "Ciao! Hai dimenticato la password? Niente panico! Fai clic sul link sottostante per impostare la tua nuova password. \n" +
                        resetUrl +
                        "\n Se non sei l'autore di questa email, nessun problema: ignorala e basta.";
                }
                const externMailOptions = {
                    from: process.env.MAIL_NOREPLY,
                    to: req.body.params.email,
                    subject: `${object}`,
                    text:
                        `${content}\n`,
                    html: data,
                };
                transporter.sendMail(externMailOptions, (err, response) => {
                    if (err) {
                        console.error('there was an error: ', err);
                        return res.status(201).json({
                            text: "Error email",
                        });
                    } else {
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

/**
 * POST reset password
 * @param req
 * @param res
 * @returns {promise}
 */
async function resetPassword(req, res) {
    const findUser = await User.findOne({tokenResetPassword: req.body.params.token});
    const user = await User.updateOne({
        tokenResetPassword: req.body.params.token
    }, {
        tokenResetPassword: "",
        password: req.body.params.password
    });
    if (user.nModified !== 1) {
        return res.status(202).json({
            text: "User not found"
        });
    } else {
        ejs.renderFile(__dirname + "/../../emails/resetPassword.ejs", {tr: req.body.params.tr}, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let object = "MyPetsLife - Réinitialisation du mot de passe";
                let content = "Bonjour ! Votre mot de passe vient d'être modifié. " +
                    " Vous pouvez désormais profitez de toutes les fonctionnalités proposées par" +
                    " MyPetsLife en vous connectant via le bouton ci-dessous avec vous nouveaux" +
                    " identifiants.\n" +
                    "https://mypetslife.co/login";
                if (req.body.params.tr === "en") {
                    object = "MyPetsLife - Reset password";
                    content = "Hello! Your password has just been changed." +
                        " You can now take advantage of all the features offered by" +
                        " MyPetsLife by logging in via the button below with you new" +
                        " identifiers. \n" +
                        "https://mypetslife.co/login";
                } else if (req.body.params.tr === "pt") {
                    object = "MyPetsLife - Redefinir senha";
                    content = "Olá! Sua senha acaba de ser alterada." +
                        " Agora você pode aproveitar todos os recursos oferecidos por" +
                        " MyPetsLife fazendo login através do botão abaixo com seu novo" +
                        " identificadores. \n" +
                        "https://mypetslife.co/login";
                } else if (req.body.params.tr === "es") {
                    object = "MyPetsLife - Restablecer contraseña";
                    content = "¡Hola! Tu contraseña acaba de ser cambiada." +
                        " Ahora puede aprovechar todas las funciones que ofrece" +
                        " MyPetsLife iniciando sesión a través del botón de abajo con usted nuevo" +
                        " identificadores. \n" +
                        "https://mypetslife.co/login";
                } else if (req.body.params.tr === "de") {
                    object = "MyPetsLife - Passwort zurücksetzen";
                    content = "Hallo! Dein Passwort wurde gerade geändert." +
                        " Sie können jetzt alle Funktionen von nutzen" +
                        " MyPetsLife durch Anmelden über die Schaltfläche unten mit Ihnen neu" +
                        " Bezeichner. \n" +
                        "https://mypetslife.co/login";
                } else if (req.body.params.tr === "it") {
                    object = "MyPetsLife - Reimposta password";
                    content = "Ciao! La tua password è stata appena cambiata." +
                        "Ora puoi sfruttare tutte le funzionalità offerte da" +
                        "MyPetsLife accedendo tramite il pulsante in basso con te nuovo" +
                        "identificatori. \ n" +
                        "https://mypetslife.co/login";
                }
                const externMailOptions = {
                    from: process.env.MAIL_NOREPLY,
                    to: findUser.email,
                    subject: `${object}`,
                    text:
                        `${content}\n`,
                    html: data,
                };
                transporter.sendMail(externMailOptions, (err, response) => {
                    if (err) {
                        console.error('there was an error: ', err);
                        return res.status(201).json({
                            text: "Error email",
                        });
                    } else {
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

/**
 * GET request to test if a user is connected
 * @param req
 * @param res
 * @returns {promise}
 */
async function checkToken(req, res) {
    const token = req.query.token;

    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decoded._id) {
        const findUser = await User.findOne({_id: decoded._id});

        if (!findUser) {
            return res.status(403).json({
                text: "User not found"
            });
        } else {
            return res.status(200).json({
                text: "Success",
                user: findUser,
            });
        }
    }
}

/**
 * PUT request to update user information
 * @param req
 * @param res
 * @returns {promise}
 */
async function updateUser(req, res) {
    const token = req.body.token;
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        if (decoded._id) {
            await User.findByIdAndUpdate(
                token._id,
                JSON.parse(req.body.update),
                {useFindAndModify: false},
                function (err) {
                    if (err) {
                        throw err;
                    }
                });
            return res.status(200).json({
                text: "Success"
            });
        }
    } catch (err) {
        return res.status(400).json({
            text: "Failed"
        });
    }
}

/**
 * POST request to update user home information
 * @param req
 * @param res
 * @returns {promise}
 */
async function updateUserHomeInfos(req, res) {
    const token = req.body.params.token;
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        if (decoded.data._id) {
            const updateUser = await User.updateOne({
                _id: decoded.data._id
            }, {
                house: decoded.data.house,
                is_house_owner: decoded.data.is_house_owner,
                have_house_owner_accord: decoded.data.have_house_owner_accord,
                garden: decoded.data.garden,
                garden_surface: decoded.data.garden_surface,
                garden_unity: decoded.data.garden_unity,
                garden_fence: decoded.data.garden_fence
            });
            if (updateUser.n === 0) {
                return res.status(201).json({
                    text: "User not found"
                });
            } else {
                const findUser = await User.findOne({_id: decoded.data._id});
                const userToken = jwt.sign(
                    {findUser},
                    process.env.SECRET_TOKEN
                );
                return res.status(200).json({
                    text: "Success",
                    token: userToken
                });
            }
        }
    } catch (err) {
        return res.status(202).json({
            text: "Failed"
        });
    }
}

/**
 * POST request to update user environment information
 * @param req
 * @param res
 * @returns {promise}
 */
async function updateUserEnvironmentInfos(req, res) {
    const token = req.body.params.token;
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        if (decoded.data._id) {
            const updateUser = await User.updateOne({
                _id: decoded.data._id
            }, {
                child_number: decoded.data.child_number,
                adult_number: decoded.data.adult_number,
                allergy: decoded.data.allergy,
                other_pets: decoded.data.other_pets,
                other_pets_description: decoded.data.other_pets_description,
            });
            if (updateUser.n === 0) {
                return res.status(201).json({
                    text: "User not found"
                });
            } else {
                const findUser = await User.findOne({_id: decoded.data._id});
                const userToken = jwt.sign(
                    {findUser},
                    process.env.SECRET_TOKEN
                );
                return res.status(200).json({
                    text: "Success",
                    token: userToken
                });
            }
        }
    } catch (err) {
        return res.status(202).json({
            text: "Failed"
        });
    }
}

/**
 * POST request to update user daily information
 * @param req
 * @param res
 * @returns {promise}
 */
async function updateUserDailyInfos(req, res) {
    const token = req.body.params.token;
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        if (decoded.data._id) {
            const updateUser = await User.updateOne({
                _id: decoded.data._id
            }, {
                have_adopted_yet: decoded.data.have_adopted_yet,
                pet_adopted_description: decoded.data.pet_adopted_description,
                adoption_day_night: decoded.data.adoption_day_night,
                hour_absent: decoded.data.hour_absent,
                adoption_activities: decoded.data.adoption_activities,
                walk_number: decoded.data.walk_number
            });
            if (updateUser.n === 0) {
                return res.status(201).json({
                    text: "User not found"
                });
            } else {
                const findUser = await User.findOne({_id: decoded.data._id});
                const userToken = jwt.sign(
                    {findUser},
                    process.env.SECRET_TOKEN
                );
                return res.status(200).json({
                    text: "Success",
                    token: userToken
                });
            }
        }
    } catch (err) {
        return res.status(202).json({
            text: "Failed"
        });
    }
}

/**
 * POST request to update user motivation information
 * @param req
 * @param res
 * @returns {promise}
 */
async function updateUserMotivationInfos(req, res) {
    const token = req.body.params.token;
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        if (decoded.data._id) {
            const updateUser = await User.updateOne({
                _id: decoded.data._id
            }, {
                adoption_why: decoded.data.adoption_why,
                adoption_when: decoded.data.adoption_when,
                adoption_research: decoded.data.adoption_research
            });
            if (updateUser.n === 0) {
                return res.status(201).json({
                    text: "User not found"
                });
            } else {
                const findUser = await User.findOne({_id: decoded.data._id});
                const userToken = jwt.sign(
                    {findUser},
                    process.env.SECRET_TOKEN
                );
                return res.status(200).json({
                    text: "Success",
                    token: userToken
                });
            }
        }
    } catch (err) {
        return res.status(202).json({
            text: "Failed"
        });
    }
}

/**
 * POST request to update user global information
 * @param req
 * @param res
 * @returns {promise}
 */
async function updateUserGlobalInfos(req, res) {
    const token = req.body.params.token;
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        if (decoded.data._id) {
            const findAddress = await User.findOne({email: decoded.data.email});
            const firstUser = await User.findOne({_id: decoded.data._id});
            if (!findAddress || findAddress._id.toString() === decoded.data._id) {
                const findPseudo = await User.findOne({pseudo: decoded.data.pseudo});
                if (!findPseudo || findPseudo._id.toString() === decoded.data._id) {
                    await User.updateOne({
                        _id: decoded.data._id
                    }, {
                        firstName: decoded.data.firstName,
                        lastName: decoded.data.lastName,
                        email: decoded.data.email,
                        password: decoded.data.password,
                        pseudo: decoded.data.pseudo,
                        address: decoded.data.address,
                        phoneNumber: decoded.data.phoneNumber,
                        birthDate: decoded.data.birthDate
                    });
                    if(decoded.data.lastName !== decoded.data.oldName){
                        await adoptionAskingFunction.updateAdoptionsAskingUserName(req,res);
                    }
                    const findUser = await User.findOne({_id: decoded.data._id});
                    if (firstUser.email !== decoded.data.email) {
                        sendConfirmEmail(req, res); //CHANGER LE MAIL
                    }
                    const userToken = jwt.sign(
                        {findUser},
                        process.env.SECRET_TOKEN
                    );
                    return res.status(200).json({
                        text: "Success",
                        token: userToken
                    });
                } else {
                    return res.status(201).json({
                        text: "Pseudo already used"
                    });
                }
            } else {
                return res.status(202).json({
                    text: "Email address already used"
                });
            }
        }
    } catch (err) {
        return res.status(203).json({
            text: "Failed"
        });
    }
}

/**
 * POST request to update user avatar
 * @param req
 * @param res
 * @returns {promise}
 */
async function updateUserAvatar(req, res) {
    const token = req.body.params.token;
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        if (decoded.data._id) {
            const updateUser = await User.updateOne({
                _id: decoded.data._id
            }, {
                avatar: decoded.data.avatar,
                avatarIsValidated: false
            });
            if (updateUser.n === 0) {
                return res.status(201).json({
                    text: "User not found"
                });
            } else {
                const findUser = await User.findOne({_id: decoded.data._id});

                const userToken = jwt.sign(
                    {findUser},
                    process.env.SECRET_TOKEN
                );
                return res.status(200).json({
                    text: "Success",
                    token: userToken
                });
            }
        }
    } catch (err) {
        return res.status(202).json({
            text: "Failed"
        });
    }
}

exports.updateUser = updateUser;
exports.updateUserGlobalInfos = updateUserGlobalInfos;
exports.updateUserHomeInfos = updateUserHomeInfos;
exports.updateUserEnvironmentInfos = updateUserEnvironmentInfos;
exports.updateUserDailyInfos = updateUserDailyInfos;
exports.updateUserMotivationInfos = updateUserMotivationInfos;
exports.updateUserAvatar = updateUserAvatar;
exports.checkAddr = checkAddr;
exports.checkPseudo = checkPseudo;
exports.loginUser = loginUser;
exports.signupParticulier = signupParticulier;
exports.forgotPassword = forgotPassword;
exports.sendContactMail = sendContactMail;
exports.resetPassword = resetPassword;
exports.checkToken = checkToken;
exports.confirmEmail = confirmEmail;
exports.sendConfirmEmail = sendConfirmEmail;
exports.changeEmailAndConfirm = changeEmailAndConfirm;
exports.sendConfirmNewsletterEmail = sendConfirmNewsletterEmail;
exports.subscribeNewsletter = subscribeNewsletter;
