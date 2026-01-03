import { Device, DeviceInfo } from "@capacitor/device";
import {
  isElectron,
  isDesktop,
  isMobile,
  getPlatform,
  getOperatingSystem,
  getSpecificInfo,
  PlatformEnum,
} from "@utils/platform";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { getPlatforms } from "@ionic/react";

// Mock des modules
vi.mock("@ionic/react", () => ({
  getPlatforms: vi.fn(),
}));

vi.mock("@capacitor/device", () => ({
  Device: {
    getInfo: vi.fn(),
  },
}));

describe("Platform Utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("isElectron", () => {
    it("should return true if platform is electron", () => {
      vi.mocked(getPlatforms).mockReturnValue(["electron", "desktop"]);

      expect(isElectron()).toBe(true);
    });

    it("should return false if platform is not electron", () => {
      vi.mocked(getPlatforms).mockReturnValue(["desktop"]);

      expect(isElectron()).toBe(false);
    });
  });

  describe("isDesktop", () => {
    it("should return true if platform is desktop", () => {
      vi.mocked(getPlatforms).mockReturnValue(["desktop"]);

      expect(isDesktop()).toBe(true);
    });

    it("should return false if platform is not desktop", () => {
      vi.mocked(getPlatforms).mockReturnValue(["mobile", "ios"]);

      expect(isDesktop()).toBe(false);
    });
  });

  describe("isMobile", () => {
    it("should return true if platform is mobile", () => {
      vi.mocked(getPlatforms).mockReturnValue(["mobile", "ios"]);

      expect(isMobile()).toBe(true);
    });

    it("should return false if platform is not mobile", () => {
      vi.mocked(getPlatforms).mockReturnValue(["desktop", "electron"]);

      expect(isMobile()).toBe(false);
    });
  });

  describe("getPlatform", () => {
    it("should return ELECTRON if platform is electron", async () => {
      vi.mocked(getPlatforms).mockReturnValue(["electron"]);

      const platform = await getPlatform();

      expect(platform).toBe(PlatformEnum.ELECTRON);
    });

    it("should return platform from Device.getInfo for iOS", async () => {
      vi.mocked(getPlatforms).mockReturnValue(["mobile", "ios"]);
      vi.mocked(Device.getInfo).mockResolvedValue({
        platform: "ios",
      } as DeviceInfo);

      const platform = await getPlatform();

      expect(platform).toBe("ios");
      expect(Device.getInfo).toHaveBeenCalled();
    });

    it("should return platform from Device.getInfo for Android", async () => {
      vi.mocked(getPlatforms).mockReturnValue(["mobile", "android"]);
      vi.mocked(Device.getInfo).mockResolvedValue({
        platform: "android",
      } as DeviceInfo);

      const platform = await getPlatform();

      expect(platform).toBe("android");
    });

    it("should return WEB for web platform", async () => {
      vi.mocked(getPlatforms).mockReturnValue(["desktop"]);
      vi.mocked(Device.getInfo).mockResolvedValue({
        platform: "web",
      } as DeviceInfo);

      const platform = await getPlatform();

      expect(platform).toBe("web");
    });
  });

  describe("getOperatingSystem", () => {
    it("should return iOS as operating system", async () => {
      vi.mocked(Device.getInfo).mockResolvedValue({
        operatingSystem: "ios",
      } as DeviceInfo);

      const os = await getOperatingSystem();

      expect(os).toBe("ios");
    });

    it("should return Android as operating system", async () => {
      vi.mocked(Device.getInfo).mockResolvedValue({
        operatingSystem: "android",
      } as DeviceInfo);

      const os = await getOperatingSystem();

      expect(os).toBe("android");
    });

    it("should return Windows as operating system", async () => {
      vi.mocked(Device.getInfo).mockResolvedValue({
        operatingSystem: "windows",
      } as DeviceInfo);

      const os = await getOperatingSystem();

      expect(os).toBe("windows");
    });
  });

  describe("getSpecificInfo", () => {
    it("should return complete information for Android", async () => {
      vi.mocked(Device.getInfo).mockResolvedValue({
        platform: "android",
        model: "Pixel 8",
        manufacturer: "Google",
        osVersion: "14",
      } as DeviceInfo);

      const info = await getSpecificInfo(PlatformEnum.ANDROID);

      expect(info).toEqual({
        platform: PlatformEnum.ANDROID,
        model: "Pixel 8",
        manufacturer: "Google",
        osVersion: "14",
      });
    });

    it("should return complete information for iOS", async () => {
      vi.mocked(Device.getInfo).mockResolvedValue({
        platform: "ios",
        model: "iPhone 15 Pro",
        manufacturer: "Apple",
        osVersion: "17.5",
      } as DeviceInfo);

      const info = await getSpecificInfo(PlatformEnum.IOS);

      expect(info).toEqual({
        platform: PlatformEnum.IOS,
        model: "iPhone 15 Pro",
        manufacturer: "Apple",
        osVersion: "17.5",
      });
    });

    it("should return only platform for Electron", async () => {
      const info = await getSpecificInfo(PlatformEnum.ELECTRON);

      expect(info).toEqual({
        platform: PlatformEnum.ELECTRON,
      });

      expect(Device.getInfo).not.toHaveBeenCalled();
    });

    it("should return WEB by default", async () => {
      const info = await getSpecificInfo(PlatformEnum.WEB);

      expect(info).toEqual({
        platform: PlatformEnum.WEB,
      });
    });
  });
});
