"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false, //hide password
    },
    rol: {
        type: String,
        enum: ["admin", "auditor", "normal"],
        required: true,
        trim: true,
    },
    ci: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    birdDate: {
        type: String,
        required: true,
        trim: true,
        default: 'NA'
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        default: 'NA'
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.userModel = (0, mongoose_1.model)('User', userSchema);
