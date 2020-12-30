// ------ Modules ------ //
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

// ------ Database ------ //
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@cluster0.d6qcz.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error(err);
        }
    );

// ------ CORS configuration ------ //
app.use(cors());

// ------ Body Parser ------ //
//application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
//application/json parser
app.use(bodyParser.json({ limit: '10mb' }));

// ------ Routers ------ //
const router = express.Router();
app.use("/users", router);
require(__dirname + "/controllers/users/userController")(router);
app.use("/asso", router);
require(__dirname + "/controllers/asso/assoController")(router);
app.use("/outcome", router);
require(__dirname + "/controllers/outcome/outcomeControllers")(router);
app.use("/pets", router);
require(__dirname + "/controllers/pets/petController")(router);
const routerAdoption = express.Router();
app.use("/adoption", routerAdoption);
require(__dirname + "/controllers/adoptions/adoptionController")(routerAdoption);
app.use("/adoptionAsking", routerAdoption);
require(__dirname + "/controllers/adoptionAsking/adoptionAskingController")(routerAdoption);
app.use("/conversation", router);
require(__dirname + "/controllers/conversation/conversationController")(router);
app.use("/message", router);
require(__dirname + "/controllers/message/messageController")(router);

// ------ Listening Port ------ //
const port = 8080;
app.listen(port);
console.log("Listening on port", port);
