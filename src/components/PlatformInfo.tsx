import { useEffect, useState } from "react";

import {
  AppPlatformInfo,
  getPlatform,
  getSpecificInfo,
  PlatformEnum,
} from "@utils/platform";

import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";

export const PlatformInfo = () => {
  const [platformInfo, setPlatformInfo] = useState<AppPlatformInfo | null>(
    null
  );

  useEffect(() => {
    const fetchPlatformInfo = async () => {
      const platform = await getPlatform();
      const info = await getSpecificInfo(platform);

      setPlatformInfo(info);
    };

    fetchPlatformInfo();
  }, []);

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Platform Info</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          <IonListHeader>Details</IonListHeader>
          {platformInfo && (
            <>
              <IonItem>
                <IonLabel>Platform:</IonLabel> {platformInfo.platform}
              </IonItem>
              {platformInfo.model && (
                <IonItem>
                  <IonLabel>Model:</IonLabel> {platformInfo.model}
                </IonItem>
              )}
              {platformInfo.manufacturer && (
                <IonItem>
                  <IonLabel>Manufacturer:</IonLabel> {platformInfo.manufacturer}
                </IonItem>
              )}
              {platformInfo.osVersion && (
                <IonItem>
                  <IonLabel>OS Version:</IonLabel> {platformInfo.osVersion}
                </IonItem>
              )}
            </>
          )}
        </IonList>

        {platformInfo?.platform === PlatformEnum.ELECTRON && (
          <IonItem>
            <IonLabel>
              Note: You are running the Electron version of this application.
            </IonLabel>
          </IonItem>
        )}
      </IonCardContent>
    </IonCard>
  );
};
