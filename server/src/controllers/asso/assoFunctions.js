// ----- /user functions ----- //
const ejs = require("ejs");
const adoptionFunctions = require("../adoptions/adoptionsFunctions");
const jwt = require('jsonwebtoken');
const Asso = require("../../schema/associationSchema.js");
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

/**
 * GET request to check if the mail address already exist
 * @param req
 * @param res
 * @returns {promise}
 */
async function checkAddr(req, res) {
    const findAsso = await Asso.findOne({ email: req.query.email });
    if (!findAsso) {
        return res.status(201).json({
            text: "Asso not found"
        });
    } else {
        return res.status(200).json({
            text: "Asso found"
        });
    }
}

/**
 * GET request to login an user
 * @param req
 * @param res
 * @returns {promise}
 */
async function loginAsso(req, res) {

    const findAsso = await Asso.findOne({ pseudo: req.query.pseudo });

    if (!findAsso) {
        return res.status(202).json({
            text: "Asso not found"
        });
    } else {
        const token = jwt.sign(
            { findAsso },
            process.env.SECRET_TOKEN
        );
        return res.status(200).json({
            text: "Success",
            token: token
        });
    }
}

/**
 * POST send a mail to add a new password
 * @param req
 * @param res
 * @returns {promise}
 */
async function forgotPasswordAsso(req, res) {
    const token = crypto.randomBytes(20).toString('hex');
    const user = await Asso.updateOne({
        pseudo: req.body.params.pseudo,
    }, {
        tokenResetPassword: token,
    });
    const asso = await Asso.findOne({
        pseudo: req.body.params.pseudo,
    });
    const resetUrl = `${process.env.ASSO_DOMAIN}/forgot_password/${token}`;
    if (user.nModified !== 1) {
        return res.status(202).json({
            text: "Asso not found"
        });
    } else {
        ejs.renderFile(__dirname + "/../../emails/forgotPassword.ejs", { tr: req.body.params.tr, resetUrl: resetUrl}, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let object = "MyPetsLife - Réinitialisation du mot de passe";
                let content = "Bonjour ! Vous avez oublié votre mot de passe ? Pas de panique ! Vous n'avez qu'à cliquer sur le lien ci-dessous pour définir votre nouveau mot de passe.\n" +
                    resetUrl +
                    "\n Si vous n'êtes pas à l'origine de ce mail, pas de problème : il vous suffit de l'ignorer.";
                if(req.body.params.tr === "en"){
                    object = "MyPetsLife - Reset password";
                    content = "Hello! Forgot your password? Don't panic! Just click on the link below to set your new password. \n" +
                        resetUrl +
                        "\n If you are not the source of this email, no problem: just ignore it.";
                    }else if(req.body.params.tr === "pt"){
                    object = "MyPetsLife - Redefinir senha";
                    content = "Olá! Esqueceu sua senha? Não entre em pânico! Basta clicar no link abaixo para definir sua nova senha. \n" +
                        resetUrl +
                        "\n Se você não é a fonte deste e-mail, não há problema: apenas ignore.";
                    }else if(req.body.params.tr === "es"){
                    object = "MyPetsLife - Restablecer contraseña";
                    content = "¡Hola! ¿Olvidaste tu contraseña? ¡Que no cunda el pánico! Simplemente haz clic en el enlace de abajo para establecer tu nueva contraseña. \n" +
                        resetUrl +
                        "\n Si usted no es la fuente de este correo electrónico, no hay problema: simplemente ignórelo.";
                }else if(req.body.params.tr === "de") {
                    object = "MyPetsLife - Passwort zurücksetzen";
                    content = "Hallo! Passwort vergessen? Keine Panik! Klicken Sie einfach auf den unten stehenden Link, um Ihr neues Passwort festzulegen. \n" +
                        resetUrl +
                        "\n Wenn Sie nicht die Quelle dieser E-Mail sind, kein Problem: ignorieren Sie sie einfach.";
                }else if(req.body.params.tr === "it") {
                    object = "MyPetsLife - Reimposta password";
                    content = "Ciao! Hai dimenticato la password? Niente panico! Fai clic sul link sottostante per impostare la tua nuova password. \n" +
                        resetUrl +
                        "\n Se non sei l'autore di questa email, nessun problema: ignorala e basta.";
                }
                const externMailOptions = {
                    from: process.env.MAIL_NOREPLY,
                    to: asso.email,
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
                            email: asso.email,
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
async function resetPasswordAsso(req, res) {
    const findAsso = await Asso.findOne({tokenResetPassword: req.body.params.token});
    const asso = await Asso.updateOne({
        tokenResetPassword: req.body.params.token
    },{
        tokenResetPassword: "",
        password: req.body.params.password
    });
    if (asso.nModified !== 1) {
        return res.status(202).json({
            text: "User not found"
        });
    } else {
        ejs.renderFile(__dirname + "/../../emails/resetPassword.ejs", { tr: req.body.params.tr}, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let object = "MyPetsLife - Réinitialisation du mot de passe";
                let content = "Bonjour ! Votre mot de passe vient d'être modifié. " +
                    " Vous pouvez désormais profitez de toutes les fonctionnalités proposées par" +
                    " MyPetsLife en vous connectant via le bouton ci-dessous avec vous nouveaux" +
                    " identifiants.\n" +
                    "https://mypetslife.co/login";
                if(req.body.params.tr === "en"){
                    object = "MyPetsLife - Reset password";
                    content = "Hello! Your password has just been changed." +
                        " You can now take advantage of all the features offered by" +
                        " MyPetsLife by logging in via the button below with you new" +
                        " identifiers. \n" +
                        "https://mypetslife.co/login";
                }else if(req.body.params.tr === "pt"){
                    object = "MyPetsLife - Redefinir senha";
                    content = "Olá! Sua senha acaba de ser alterada." +
                        " Agora você pode aproveitar todos os recursos oferecidos por" +
                        " MyPetsLife fazendo login através do botão abaixo com seu novo" +
                        " identificadores. \n" +
                        "https://mypetslife.co/login";
                }else if(req.body.params.tr === "es"){
                    object = "MyPetsLife - Restablecer contraseña";
                    content = "¡Hola! Tu contraseña acaba de ser cambiada." +
                        " Ahora puede aprovechar todas las funciones que ofrece" +
                        " MyPetsLife iniciando sesión a través del botón de abajo con usted nuevo" +
                        " identificadores. \n" +
                        "https://mypetslife.co/login";
                }else if(req.body.params.tr === "de") {
                    object = "MyPetsLife - Passwort zurücksetzen";
                    content = "Hallo! Dein Passwort wurde gerade geändert." +
                        " Sie können jetzt alle Funktionen von nutzen" +
                        " MyPetsLife durch Anmelden über die Schaltfläche unten mit Ihnen neu" +
                        " Bezeichner. \n" +
                        "https://mypetslife.co/login";
                }else if(req.body.params.tr === "it") {
                    object = "MyPetsLife - Reimposta password";
                    content = "Ciao! La tua password è stata appena cambiata." +
                        "Ora puoi sfruttare tutte le funzionalità offerte da" +
                        "MyPetsLife accedendo tramite il pulsante in basso con te nuovo" +
                        "identificatori. \ n" +
                        "https://mypetslife.co/login";
                }
                const externMailOptions = {
                    from: process.env.MAIL_NOREPLY,
                    to: findAsso.email,
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
 * POST first password
 * @param req
 * @param res
 * @returns {promise}
 */
async function firstPassword(req, res) {
    const asso = await Asso.updateOne({
        _id: req.body.params.id
    },{
        confirmed: true,
        password: req.body.params.password
    });
    const findAsso = await Asso.findOne({ _id: req.body.params.id });
    const assoToken = jwt.sign(
        { findAsso },
        process.env.SECRET_TOKEN
    );
    if (asso.nModified !== 1) {
        return res.status(202).json({
            text: "Asso not found"
        });
    } else {
        ejs.renderFile(__dirname + "/../../emails/resetPassword.ejs", { tr: req.body.params.tr}, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let object = "MyPetsLife - Réinitialisation du mot de passe";
                let content = "Bonjour ! Votre mot de passe vient d'être modifié. " +
                    " Vous pouvez désormais profitez de toutes les fonctionnalités proposées par" +
                    " MyPetsLife en vous connectant via le bouton ci-dessous avec vous nouveaux" +
                    " identifiants.\n" +
                    "https://mypetslife.co/login";
                if(req.body.params.tr === "en"){
                    object = "MyPetsLife - Reset password";
                    content = "Hello! Your password has just been changed." +
                        " You can now take advantage of all the features offered by" +
                        " MyPetsLife by logging in via the button below with you new" +
                        " identifiers. \n" +
                        "https://mypetslife.co/login";
                }else if(req.body.params.tr === "pt"){
                    object = "MyPetsLife - Redefinir senha";
                    content = "Olá! Sua senha acaba de ser alterada." +
                        " Agora você pode aproveitar todos os recursos oferecidos por" +
                        " MyPetsLife fazendo login através do botão abaixo com seu novo" +
                        " identificadores. \n" +
                        "https://mypetslife.co/login";
                }else if(req.body.params.tr === "es"){
                    object = "MyPetsLife - Restablecer contraseña";
                    content = "¡Hola! Tu contraseña acaba de ser cambiada." +
                        " Ahora puede aprovechar todas las funciones que ofrece" +
                        " MyPetsLife iniciando sesión a través del botón de abajo con usted nuevo" +
                        " identificadores. \n" +
                        "https://mypetslife.co/login";
                }else if(req.body.params.tr === "de") {
                    object = "MyPetsLife - Passwort zurücksetzen";
                    content = "Hallo! Dein Passwort wurde gerade geändert." +
                        " Sie können jetzt alle Funktionen von nutzen" +
                        " MyPetsLife durch Anmelden über die Schaltfläche unten mit Ihnen neu" +
                        " Bezeichner. \n" +
                        "https://mypetslife.co/login";
                }else if(req.body.params.tr === "it") {
                    object = "MyPetsLife - Reimposta password";
                    content = "Ciao! La tua password è stata appena cambiata." +
                        "Ora puoi sfruttare tutte le funzionalità offerte da" +
                        "MyPetsLife accedendo tramite il pulsante in basso con te nuovo" +
                        "identificatori. \ n" +
                        "https://mypetslife.co/login";
                }
                const externMailOptions = {
                    from: process.env.MAIL_NOREPLY,
                    to: findAsso.email,
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
                            text: "Password changed",
                            token: assoToken
                        });
                    }
                });
            }
        });
    }
}

/**
 * POST request to update user information
 * @param req
 * @param res
 * @returns {promise}
 */
async function updateAsso(req, res) {
    const token = req.body.params.token;
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        if (decoded.data._id) {
            const findAddress = await Asso.findOne({ email: decoded.data.email });
            const firstUser = await Asso.findOne({ _id: decoded.data._id });
            if (!findAddress || findAddress._id.toString() === decoded.data._id) {
                await Asso.updateOne({
                    _id: decoded.data._id
                }, decoded.data);
                if (firstUser.email !== decoded.data.email) {
                    sendConfirmNewEmailAsso(req, res);
                }
                await adoptionFunctions.updateAdoptionsAssociationName(req,res);
                const findAsso = await Asso.findOne({_id: decoded.data._id});
                if (!findAsso) {
                    return res.status(201).json({
                        text: "Asso not found"
                    });
                } else {
                    const token = jwt.sign(
                        {findAsso},
                        process.env.SECRET_TOKEN
                    );
                    return res.status(200).json({
                        text: "Success",
                        token: token
                    });
                }
            }
        }
    } catch (err) {
        return res.status(203).json({
            text: "Failed"
        });
    }
}

/**
 * POST request to send a confirm new email address email
 * @param req
 * @param res
 * @returns {promise}
 */
async function sendConfirmNewEmailAsso(req, res) {
    const token = crypto.randomBytes(20).toString('hex');
    const user = await Asso.updateOne({
        email: req.body.params.email,
    }, {
        confirmed: false,
        confirmEmailToken: token
    });
    if (user.nModified === 1) {
        const confirmUrl = `${process.env.DOMAIN}/confirm_email/${token}`;
        ejs.renderFile(__dirname + "/../../emails/confirmNewEmail.ejs", { confirmUrl:confirmUrl, tr: req.body.params.tr }, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let object = "MyPetsLife - Confirmation de votre nouvelle adresse mail";
                let content = "Pour confirmer votre adresse mail et profiter de toutes les fonctionnalités de MyPetsLife, cliquez sur le lien ci-dessous :";
                if(req.body.params.tr === "en"){
                    object = "MyPetsLife - Confirmation of your new email address";
                    content= "You have just changed your email address via your My Pets Life profile.We therefore need you to confirm this new email address to verify that it is indeed you!"+
                        "By clicking on the button below, you will be able to take advantage of all our features again.";
                }else if(req.body.params.tr === "pt"){
                    object = "MyPetsLife - Confirmação do seu novo endereço de email";
                    content = "Você acabou de alterar o seu endereço de e-mail através do perfil do My Pets Life. Portanto, precisamos que você confirme este novo endereço de e-mail para verificar se é você mesmo!" +
                        "Ao clicar no botão abaixo, você poderá aproveitar novamente todos os nossos recursos.";
                }else if(req.body.params.tr === "es"){
                    object = "MyPetsLife - Confirmación de su nueva dirección de correo electrónico";
                    content = "Acaba de cambiar su dirección de correo electrónico a través de su perfil de My Pets Life.Por lo tanto, necesitamos que confirme esta nueva dirección de correo electrónico para verificar que efectivamente es usted." +
                        "Al hacer clic en el botón de abajo, podrá volver a aprovechar todas nuestras funciones.";
                }else if(req.body.params.tr === "de"){
                    object = "MyPetsLife - Bestätigung Ihrer neue E-Mail-Adresse";
                    content = "Sie haben gerade Ihre E-Mail-Adresse über Ihr My Pets Life-Profil geändert. Sie müssen daher diese neue E-Mail-Adresse bestätigen, um zu überprüfen, ob Sie es tatsächlich sind!" +
                        "Wenn Sie auf die Schaltfläche unten klicken, können Sie alle unsere Funktionen wieder nutzen.";
                }else if(req.body.params.tr === "it") {
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
            text: "No asso"
        });
    }
}

exports.updateAsso = updateAsso;
exports.checkAddr = checkAddr;
exports.loginAsso = loginAsso;
exports.forgotPasswordAsso = forgotPasswordAsso;
exports.resetPasswordAsso = resetPasswordAsso;
exports.firstPassword = firstPassword;
