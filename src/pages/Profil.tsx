import { caretBack } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useSnapshot } from "valtio";

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { PlatformInfo } from "@components/PlatformInfo";
import userState, { logout } from "@store/user";

export const Profil = () => {
  const history = useHistory();
  const { username } = useSnapshot(userState);

  const handleLogout = () => {
    logout();
    history.replace("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Previous" icon={caretBack}></IonBackButton>
          </IonButtons>
          <IonTitle>Profil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {username ? (
          <>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{username}</IonCardTitle>
              </IonCardHeader>
            </IonCard>

            <PlatformInfo />
          </>
        ) : (
          <IonLoading isOpen={true} message={"Loading profil..."} />
        )}
      </IonContent>

      <IonButton expand="block" onClick={handleLogout}>
        Logout
      </IonButton>
    </IonPage>
  );
};
