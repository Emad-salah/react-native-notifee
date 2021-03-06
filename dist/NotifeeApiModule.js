"use strict";
/*
 * Copyright (c) 2016-present Invertase Limited
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const NotifeeNativeModule_1 = __importDefault(require("./NotifeeNativeModule"));
const utils_1 = require("./utils");
const validateNotification_1 = __importDefault(require("./validators/validateNotification"));
const validateAndroidChannel_1 = __importDefault(require("./validators/validateAndroidChannel"));
const validateAndroidChannelGroup_1 = __importDefault(require("./validators/validateAndroidChannelGroup"));
const validateIOSCategory_1 = __importDefault(require("./validators/validateIOSCategory"));
const validateIOSPermissions_1 = __importDefault(require("./validators/validateIOSPermissions"));
let onNotificationBackgroundEventListenerRegistered = false;
let isRunningForegroundServiceTask = false;
let registeredForegroundServiceTask;
if (utils_1.isAndroid) {
    react_native_1.AppRegistry.registerHeadlessTask(utils_1.kReactNativeNotifeeForegroundServiceHeadlessTask, () => {
        if (!registeredForegroundServiceTask) {
            console.warn('[notifee] no registered foreground service has been set for displaying a foreground notification.');
            return () => Promise.resolve();
        }
        isRunningForegroundServiceTask = true;
        return ({ notification }) => registeredForegroundServiceTask(notification);
    });
}
class NotifeeApiModule extends NotifeeNativeModule_1.default {
    cancelAllNotifications() {
        return this.native.cancelAllNotifications();
    }
    cancelNotification(notificationId) {
        if (!utils_1.isString(notificationId)) {
            throw new Error("notifee.cancelNotification(*) 'notificationId' expected a string value.");
        }
        return this.native.cancelNotification(notificationId);
    }
    createChannel(channel) {
        let options;
        try {
            options = validateAndroidChannel_1.default(channel);
        }
        catch (e) {
            throw new Error(`notifee.createChannel(*) ${e.message}`);
        }
        if (utils_1.isIOS) {
            return Promise.resolve('');
        }
        if (this.native.ANDROID_API_LEVEL < 26) {
            return Promise.resolve(options.id);
        }
        return this.native.createChannel(options).then(() => {
            return options.id;
        });
    }
    createChannels(channels) {
        if (!utils_1.isArray(channels)) {
            throw new Error("notifee.createChannels(*) 'channels' expected an array of AndroidChannel.");
        }
        const options = [];
        try {
            for (let i = 0; i < channels.length; i++) {
                options[i] = validateAndroidChannel_1.default(channels[i]);
            }
        }
        catch (e) {
            throw new Error(`notifee.createChannels(*) 'channels' a channel is invalid: ${e.message}`);
        }
        if (utils_1.isIOS || this.native.ANDROID_API_LEVEL < 26) {
            return Promise.resolve();
        }
        return this.native.createChannels(options);
    }
    createChannelGroup(channelGroup) {
        let options;
        try {
            options = validateAndroidChannelGroup_1.default(channelGroup);
        }
        catch (e) {
            throw new Error(`notifee.createChannelGroup(*) ${e.message}`);
        }
        if (this.native.ANDROID_API_LEVEL < 26) {
            return Promise.resolve(options.id);
        }
        if (utils_1.isIOS) {
            return Promise.resolve('');
        }
        return this.native.createChannelGroup(options).then(() => {
            return options.id;
        });
    }
    createChannelGroups(channelGroups) {
        if (!utils_1.isArray(channelGroups)) {
            throw new Error("notifee.createChannelGroups(*) 'channelGroups' expected an array of AndroidChannelGroup.");
        }
        const options = [];
        try {
            for (let i = 0; i < channelGroups.length; i++) {
                options[i] = validateAndroidChannelGroup_1.default(channelGroups[i]);
            }
        }
        catch (e) {
            throw new Error(`notifee.createChannelGroups(*) 'channelGroups' a channel group is invalid: ${e.message}`);
        }
        if (utils_1.isIOS || this.native.ANDROID_API_LEVEL < 26) {
            return Promise.resolve();
        }
        return this.native.createChannelGroups(options);
    }
    deleteChannel(channelId) {
        if (!utils_1.isString(channelId)) {
            throw new Error("notifee.deleteChannel(*) 'channelId' expected a string value.");
        }
        if (utils_1.isIOS || this.native.ANDROID_API_LEVEL < 26) {
            return Promise.resolve();
        }
        return this.native.deleteChannel(channelId);
    }
    deleteChannelGroup(channelGroupId) {
        if (!utils_1.isString(channelGroupId)) {
            throw new Error("notifee.deleteChannelGroup(*) 'channelGroupId' expected a string value.");
        }
        if (utils_1.isIOS || this.native.ANDROID_API_LEVEL < 26) {
            return Promise.resolve();
        }
        return this.native.deleteChannelGroup(channelGroupId);
    }
    // TODO(salakar) Trigger types
    displayNotification(notification, trigger) {
        let options;
        try {
            options = validateNotification_1.default(notification);
        }
        catch (e) {
            throw new Error(`notifee.displayNotification(*) ${e.message}`);
        }
        // TODO(salakar) only android triggers currently implemented
        if (utils_1.isAndroid) {
            return this.native.displayNotification(options, trigger).then(() => {
                return options.id;
            });
        }
        return this.native.displayNotification(options).then(() => {
            return options.id;
        });
    }
    getChannel(channelId) {
        if (!utils_1.isString(channelId)) {
            throw new Error("notifee.getChannel(*) 'channelId' expected a string value.");
        }
        if (utils_1.isIOS || this.native.ANDROID_API_LEVEL < 26) {
            return Promise.resolve(null);
        }
        return this.native.getChannel(channelId);
    }
    getChannels() {
        if (utils_1.isIOS || this.native.ANDROID_API_LEVEL < 26) {
            return Promise.resolve([]);
        }
        return this.native.getChannels();
    }
    getChannelGroup(channelGroupId) {
        if (!utils_1.isString(channelGroupId)) {
            throw new Error("notifee.getChannelGroup(*) 'channelGroupId' expected a string value.");
        }
        if (utils_1.isIOS || this.native.ANDROID_API_LEVEL < 26) {
            return Promise.resolve(null);
        }
        return this.native.getChannelGroup(channelGroupId);
    }
    getChannelGroups() {
        if (utils_1.isIOS || this.native.ANDROID_API_LEVEL < 26) {
            return Promise.resolve([]);
        }
        return this.native.getChannelGroups();
    }
    getInitialNotification() {
        return this.native.getInitialNotification();
    }
    onBackgroundEvent(observer) {
        if (!utils_1.isFunction(observer)) {
            throw new Error("notifee.onBackgroundEvent(*) 'observer' expected a function.");
        }
        if (utils_1.isAndroid &&
            (isRunningForegroundServiceTask || !onNotificationBackgroundEventListenerRegistered)) {
            react_native_1.AppRegistry.registerHeadlessTask(utils_1.kReactNativeNotifeeNotificationEvent, () => {
                return ({ type, detail }) => {
                    return observer({ type, detail });
                };
            });
            onNotificationBackgroundEventListenerRegistered = true;
        }
        if (utils_1.isIOS && !onNotificationBackgroundEventListenerRegistered) {
            this.emitter.addListener(utils_1.kReactNativeNotifeeNotificationBackgroundEvent, ({ type, detail }) => {
                observer({ type, detail });
            });
            onNotificationBackgroundEventListenerRegistered = true;
        }
    }
    onForegroundEvent(observer) {
        if (!utils_1.isFunction(observer)) {
            throw new Error("notifee.onForegroundEvent(*) 'observer' expected a function.");
        }
        const subscriber = this.emitter.addListener(utils_1.kReactNativeNotifeeNotificationEvent, ({ type, detail }) => {
            observer({ type, detail });
        });
        return () => {
            subscriber.remove();
        };
    }
    openNotificationSettings(channelId) {
        if (!utils_1.isUndefined(channelId) && !utils_1.isString(channelId)) {
            throw new Error("notifee.openNotificationSettings(*) 'channelId' expected a string value.");
        }
        if (utils_1.isIOS) {
            return Promise.resolve();
        }
        return this.native.openNotificationSettings(channelId || null);
    }
    requestPermission(permissions = {}) {
        if (utils_1.isAndroid) {
            // Android doesn't require permission, so instead we
            // return a dummy response to allow the permissions
            // flow work the same on both iOS & Android
            return Promise.resolve({
                alert: 1,
                badge: 1,
                criticalAlert: 1,
                showPreviews: 1,
                sound: 1,
                carPlay: 1,
                lockScreen: 1,
                announcement: 1,
                notificationCenter: 1,
                inAppNotificationSettings: 1,
                authorizationStatus: 1,
            });
        }
        let options;
        try {
            options = validateIOSPermissions_1.default(permissions);
        }
        catch (e) {
            throw new Error(`notifee.requestPermission(*) ${e.message}`);
        }
        return this.native.requestPermission(options);
    }
    registerForegroundService(runner) {
        if (!utils_1.isFunction(runner)) {
            throw new Error("notifee.registerForegroundService(_) 'runner' expected a function.");
        }
        if (utils_1.isIOS) {
            return;
        }
        registeredForegroundServiceTask = runner;
    }
    setNotificationCategories(categories) {
        if (utils_1.isAndroid) {
            return Promise.resolve();
        }
        if (!utils_1.isArray(categories)) {
            throw new Error("notifee.setNotificationCategories(*) 'categories' expected an array of IOSCategory.");
        }
        const options = [];
        try {
            for (let i = 0; i < categories.length; i++) {
                options[i] = validateIOSCategory_1.default(categories[i]);
            }
        }
        catch (e) {
            throw new Error(`notifee.setNotificationCategories(*) 'categories' a category is invalid: ${e.message}`);
        }
        return this.native.setNotificationCategories(categories);
    }
    getNotificationCategories() {
        if (utils_1.isAndroid) {
            return Promise.resolve([]);
        }
        return this.native.getNotificationCategories();
    }
    getNotificationSettings() {
        if (utils_1.isAndroid) {
            // Android doesn't support this, so instead we
            // return a dummy response to allow the permissions
            // flow work the same on both iOS & Android
            return Promise.resolve({
                alert: 1,
                badge: 1,
                criticalAlert: 1,
                showPreviews: 1,
                sound: 1,
                carPlay: 1,
                lockScreen: 1,
                announcement: 1,
                notificationCenter: 1,
                inAppNotificationSettings: 1,
                authorizationStatus: 1,
            });
        }
        return this.native.getNotificationSettings();
    }
    getBadgeCount() {
        if (utils_1.isAndroid) {
            return Promise.resolve(0);
        }
        return this.native.getBadgeCount();
    }
    setBadgeCount(count) {
        if (utils_1.isAndroid) {
            return Promise.resolve();
        }
        if (!utils_1.isNumber(count) || count < 0) {
            throw new Error("notifee.setBadgeCount(*) 'count' expected a number value greater than 0.");
        }
        return this.native.setBadgeCount(Math.round(count));
    }
    incrementBadgeCount(incrementBy) {
        if (utils_1.isAndroid) {
            return Promise.resolve();
        }
        let value = 1;
        if (!utils_1.isUndefined(incrementBy)) {
            if (!utils_1.isNumber(incrementBy) || incrementBy < 1) {
                throw new Error("notifee.decrementBadgeCount(*) 'incrementBy' expected a number value greater than 1.");
            }
            value = incrementBy;
        }
        return this.native.incrementBadgeCount(Math.round(value));
    }
    decrementBadgeCount(decrementBy) {
        if (utils_1.isAndroid) {
            return Promise.resolve();
        }
        let value = 1;
        if (!utils_1.isUndefined(decrementBy)) {
            if (!utils_1.isNumber(decrementBy) || decrementBy < 1) {
                throw new Error("notifee.decrementBadgeCount(*) 'decrementBy' expected a number value greater than 1.");
            }
            value = decrementBy;
        }
        return this.native.decrementBadgeCount(Math.round(value));
    }
}
exports.default = NotifeeApiModule;
//# sourceMappingURL=NotifeeApiModule.js.map