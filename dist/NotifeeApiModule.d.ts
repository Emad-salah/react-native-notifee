import { Module } from './types/Module';
import { AndroidChannel, AndroidChannelGroup, NativeAndroidChannel, NativeAndroidChannelGroup } from './types/NotificationAndroid';
import { InitialNotification, Notification, Event } from './types/Notification';
import NotifeeNativeModule from './NotifeeNativeModule';
import { IOSNotificationCategory, IOSNotificationSettings, IOSNotificationPermissions } from './types/NotificationIOS';
export default class NotifeeApiModule extends NotifeeNativeModule implements Module {
    cancelAllNotifications(): Promise<void>;
    cancelNotification(notificationId: string): Promise<void>;
    createChannel(channel: AndroidChannel): Promise<string>;
    createChannels(channels: AndroidChannel[]): Promise<void>;
    createChannelGroup(channelGroup: AndroidChannelGroup): Promise<string>;
    createChannelGroups(channelGroups: AndroidChannelGroup[]): Promise<void>;
    deleteChannel(channelId: string): Promise<void>;
    deleteChannelGroup(channelGroupId: string): Promise<void>;
    displayNotification(notification: Notification, trigger?: any): Promise<string>;
    getChannel(channelId: string): Promise<NativeAndroidChannel | null>;
    getChannels(): Promise<NativeAndroidChannel[]>;
    getChannelGroup(channelGroupId: string): Promise<NativeAndroidChannelGroup | null>;
    getChannelGroups(): Promise<NativeAndroidChannelGroup[]>;
    getInitialNotification(): Promise<InitialNotification | null>;
    onBackgroundEvent(observer: (event: Event) => Promise<void>): void;
    onForegroundEvent(observer: (event: Event) => void): () => void;
    openNotificationSettings(channelId?: string): Promise<void>;
    requestPermission(permissions?: IOSNotificationPermissions): Promise<IOSNotificationSettings>;
    registerForegroundService(runner: (notification: Notification) => Promise<void>): void;
    setNotificationCategories(categories: IOSNotificationCategory[]): Promise<void>;
    getNotificationCategories(): Promise<IOSNotificationCategory[]>;
    getNotificationSettings(): Promise<IOSNotificationSettings>;
    getBadgeCount(): Promise<number>;
    setBadgeCount(count: number): Promise<void>;
    incrementBadgeCount(incrementBy?: number): Promise<void>;
    decrementBadgeCount(decrementBy?: number): Promise<void>;
}
