import { Device } from "@capacitor/device";

import { getPlatforms } from "@ionic/react";

export const isElectron = () => getPlatforms().includes("electron");
export const isDesktop = () => getPlatforms().includes("desktop");
export const isMobile = () => getPlatforms().includes("mobile");

export type AppPlatformInfo = {
  platform: AppPlatform;
  model?: string;
  manufacturer?: string;
  osVersion?: string;
};

export enum PlatformEnum {
  WEB = "web",
  ANDROID = "android",
  IOS = "ios",
  ELECTRON = "electron",
}

export enum OperatingSystemEnum {
  IOS = "ios",
  ANDROID = "android",
  WINDOWS = "windows",
  MAC = "mac",
  UNKNOWN = "unknown",
}

export type AppPlatform = PlatformEnum;
export type AppOperatingSystem = OperatingSystemEnum;

export const getPlatform = async (): Promise<AppPlatform> => {
  if (getPlatforms().includes("electron")) {
    return PlatformEnum.ELECTRON;
  }

  return Device.getInfo().then(
    (deviceInfo) => deviceInfo.platform as AppPlatform
  );
};

export const getOperatingSystem = async (): Promise<AppOperatingSystem> =>
  (await Device.getInfo()).operatingSystem as AppOperatingSystem;

export const getSpecificInfo = async (
  platform: AppPlatform
): Promise<AppPlatformInfo> => {
  switch (platform) {
    case PlatformEnum.ANDROID:
    case PlatformEnum.IOS: {
      const data = await Device.getInfo();

      return {
        platform,
        model: data.model,
        manufacturer: data.manufacturer,
        osVersion: data.osVersion,
      };
    }
    case PlatformEnum.ELECTRON:
      return {
        platform,
      };
    case PlatformEnum.WEB:
    default:
      return {
        platform: PlatformEnum.WEB,
      };
  }
};
