const mongoose = require('mongoose');

let ScamSchema = new mongoose.Schema({
    Collection: String,
    CaseUID: String,
    ScammerName: String,
    ScammerID: String,
    ServerDetails: String,
    ScamReason: String,
    Attachment: String,
    Reporter: String
});

module.exports = new mongoose.model("Scam", ScamSchema);
