"use strict";
/*
 * Copyright (c) 2016-present Invertase Limited
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateThumbnailClippingRect = void 0;
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const resolveAssetSource_1 = __importDefault(require("react-native/Libraries/Image/resolveAssetSource"));
const utils_1 = require("../utils");
function validateIOSAttachment(attachment) {
    if (!utils_1.isObject(attachment)) {
        throw new Error("'attachment' expected an object value.");
    }
    if ((!utils_1.isString(attachment.url) && !utils_1.isNumber(attachment.url) && !utils_1.isObject(attachment.url)) ||
        (utils_1.isString(attachment.url) && !attachment.url.length)) {
        throw new Error("'attachment.url' expected a React Native ImageResource value or a valid string URL.");
    }
    const out = {
        url: attachment.url,
        thumbnailHidden: false,
    };
    if (utils_1.isNumber(attachment.url) || utils_1.isObject(attachment.url)) {
        const image = resolveAssetSource_1.default(attachment.url);
        out.url = image.uri;
    }
    if (utils_1.objectHasProperty(attachment, 'id') && !utils_1.isUndefined(attachment.id)) {
        if (!utils_1.isString(attachment.id)) {
            throw new Error("'attachment.id' expected a string value.");
        }
        out.id = attachment.id;
    }
    else {
        out.id = utils_1.generateId();
    }
    if (utils_1.objectHasProperty(attachment, 'typeHint') && !utils_1.isUndefined(attachment.typeHint)) {
        if (!utils_1.isString(attachment.typeHint)) {
            throw new Error("'attachment.typeHint' expected a string value.");
        }
        out.typeHint = attachment.typeHint;
    }
    if (utils_1.objectHasProperty(attachment, 'thumbnailClippingRect') &&
        !utils_1.isUndefined(attachment.thumbnailClippingRect)) {
        try {
            out.thumbnailClippingRect = validateThumbnailClippingRect(attachment.thumbnailClippingRect);
        }
        catch (e) {
            throw new Error(`'attachment.thumbnailClippingRect' is invalid. ${e.message}`);
        }
    }
    if (utils_1.objectHasProperty(attachment, 'thumbnailHidden') &&
        !utils_1.isUndefined(attachment.thumbnailHidden)) {
        if (!utils_1.isBoolean(attachment.thumbnailHidden)) {
            throw new Error("'attachment.thumbnailHidden' must be a boolean value if specified.");
        }
        out.thumbnailHidden = attachment.thumbnailHidden;
    }
    if (utils_1.objectHasProperty(attachment, 'thumbnailTime') && !utils_1.isUndefined(attachment.thumbnailTime)) {
        if (!utils_1.isNumber(attachment.thumbnailTime)) {
            throw new Error("'attachment.thumbnailTime' must be a number value if specified.");
        }
        else {
            out.thumbnailTime = attachment.thumbnailTime;
        }
    }
    return out;
}
exports.default = validateIOSAttachment;
/**
 * Validates a ThumbnailClippingRect
 */
function validateThumbnailClippingRect(thumbnailClippingRect) {
    if (utils_1.objectHasProperty(thumbnailClippingRect, 'x')) {
        if (!utils_1.isNumber(thumbnailClippingRect.x)) {
            throw new Error("'thumbnailClippingRect.x' expected a number value.");
        }
    }
    if (utils_1.objectHasProperty(thumbnailClippingRect, 'y')) {
        if (!utils_1.isNumber(thumbnailClippingRect.y)) {
            throw new Error("'thumbnailClippingRect.y' expected a number value.");
        }
    }
    if (utils_1.objectHasProperty(thumbnailClippingRect, 'width')) {
        if (!utils_1.isNumber(thumbnailClippingRect.width)) {
            throw new Error("'thumbnailClippingRect.width' expected a number value.");
        }
    }
    if (utils_1.objectHasProperty(thumbnailClippingRect, 'height')) {
        if (!utils_1.isNumber(thumbnailClippingRect.height)) {
            throw new Error("'thumbnailClippingRect.height' expected a number value.");
        }
    }
    // Defaults
    return {
        x: thumbnailClippingRect.x,
        y: thumbnailClippingRect.y,
        height: thumbnailClippingRect.height,
        width: thumbnailClippingRect.width,
    };
}
exports.validateThumbnailClippingRect = validateThumbnailClippingRect;
//# sourceMappingURL=validateIOSAttachment.js.map