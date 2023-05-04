const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// categories => field => ['type', 'color']
// const categories_model = new Schema({
//     type: { type: String, default: 'Investment'},
//     color: { type: String, default: '#FCBE44' }
// })

// transactions => field => ['name', 'type', 'amount', 'date']
// const transaction_model = new Schema({
//     name: { type: String, default: 'Anonymous'},
//     type: { type: String, default: 'Investment'},
//     amount: { type: Number },
//     date: { type: Date, default: Date.now}
// })

// user => fields => ['user_id', 'username', 'email', 'contactNo', 'password']
const user_model = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            trim: true,
            required: true,
        },
    },
    { timestamps: true }
);

// otp => field => ['email', 'otp', 'expireAt']
const otp_model = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
            required: true,
        },
        expireAt: {
            type: Date,
            default: Date.now,
            index: { expires: "300s" },
        },
    },
    { timestamps: true }
);

// Handyman => fields => ['handyman_id', 'name', 'email', 'contactNo', 'password']
const handyman_model = new mongoose.Schema(
    {
        handyman_id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        aadharNumber: {
            type: String,
            trim: true,
        },
        aadharFront: {
            type: String,
            default:
                "https://eventplanning24x7.files.wordpress.com/2018/04/events.png",
        },
        aadharBack: {
            type: String,
            default:
                "https://eventplanning24x7.files.wordpress.com/2018/04/events.png",
        },
        lat: {
            type: String,
            required: true,
        },
        long: {
            type: String,
            required: true,
        },
        services: {
            type: String,
        },
        ratings: [
            {
                type: Number,
                min: 0,
                max: 5,
            },
        ],
    },
    { timestamps: true }
);

const notification_model = new mongoose.Schema(
    {
        user_id: {
            type: String,
            ref: "User",
            required: true,
        },
        handyman_id: {
            type: String,
            ref: "Handyman",
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
        },
        expireAt: {
            type: Date,
            default: Date.now,
            index: { expires: "120s" },
        },
    },
    { timestamps: true }
);

// const Categories = mongoose.model('categories', categories_model);
// const Transaction = mongoose.model('transaction', transaction_model);
const User = mongoose.model("user", user_model);
const Otp = mongoose.model("otp", otp_model);
const Handyman = mongoose.model("handyman", handyman_model);
const Notification = mongoose.model("notification", notification_model);

module.exports = {
    User,
    Otp,
    Handyman,
    Notification,
};
