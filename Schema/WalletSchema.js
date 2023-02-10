const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        default: 0
    }, 
});

const Wallet = mongoose.model("wallet", walletSchema);

module.exports = Wallet;