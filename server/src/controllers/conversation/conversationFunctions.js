const messages = require("../message/messageFunctions");

const conversationSchema = require("../../schema/conversationSchema");
const adoptionAskingSchema = require("../../schema/adoptionAskingSchema");
const jwt = require('jsonwebtoken');

async function findConversationAndSendMessage(user_id_one, user_id_two, message) {
    const conversation = await conversationSchema.find({
        "$or": [{
            "users_id" : [user_id_one,user_id_two]
        }, {
            "users_id" : [user_id_two,user_id_one]
        }]});
    console.log(conversation)
    if(conversation[0]){
        await messages.sendMessage(conversation[0]._id, user_id_one, user_id_two, message);
    }else{
        const new_conversation = new conversationSchema({
            users_id:[user_id_one,user_id_two],
            users_not_seen: [user_id_one,user_id_two],
        });
        new_conversation.save();
        await messages.sendMessage(new_conversation._id, user_id_one, user_id_two, message);
    }
}

/**
 * POST request to recover all
 * @param req
 * @param res
 * @returns {promise}
 */
async function updatePublishedAdoptionConversation(req, res) {
    const token = req.body.params.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decoded.data.association_id) {
        let findAdoption = await adoptionAskingSchema.find({adoption_id:decoded.data.id}).select('user_id');
        let archived = "archivée";
        let modify = "modifiée";
        let save = "mise en attente";

        if(decoded.data.tr === "en") {
            save = "put on hold";
            archived = "archived";
            modify = "modified";
        }
        if(decoded.data.tr === "de") {
            save = "auf Eis gelegt";
            modify = "geändert";
            archived = "archiviert";
        }
        if(decoded.data.tr === "it") {
            save = "messo in attesa";
            archived = "archiviato";
            modify = "modificata";
        }
        if(decoded.data.tr === "pt") {
            save = "colocada em espera";
            modify = "modificado";
            archived = "arquivado";
        }
        if(decoded.data.tr === "es") {
            save = "poner en espera";
            archived = "archivado";
            modify = "modificado";
        }
        let status = archived;
        if(decoded.data.status === "modify") {
            status = modify;
        }
        if(decoded.data.status === "waiting"){
                status = save;
        }
        let content =
            "Bonjour, nous vous informons que l'adoption concernant " + decoded.data.name +
            " vient d'être " + status;
        if(decoded.data.tr === "en") {
            content =
                "Hello, we inform you that the adoption concerning " + decoded.data.name +
                " just been " + status;
        }
        if(decoded.data.tr === "de") {
            content =
                "Hallo, wir informieren Sie, dass die Annahme bezüglich " + decoded.data.name +
                " gerade gewesen " + status;
        }
        if(decoded.data.tr === "it") {
            content =
                "Buongiorno, vi informiamo che l'adozione riguardante " + decoded.data.name +
                " appena stato " + status;
        }
        if(decoded.data.tr === "pt") {
            content =
                "Olá, informamos que a adoção relativa a " + decoded.data.name +
                " acabou de " + status;
        }
        if(decoded.data.tr === "es") {
            content =
                "Hola, te informamos que la adopción relativa a " + decoded.data.name +
                " acaba de ser " + status;
        }
        findAdoption.map((value) =>(
            findConversationAndSendMessage(value.user_id, decoded.data.association_id, content)
        ))
    }
}

exports.updatePublishedAdoptionConversation = updatePublishedAdoptionConversation;
exports.findConversationAndSendMessage = findConversationAndSendMessage;
