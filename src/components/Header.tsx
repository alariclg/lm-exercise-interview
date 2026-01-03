import { personCircleOutline } from "ionicons/icons";

import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

interface HeaderProps {
  pageTitle?: string;
}

const Header = ({ pageTitle }: HeaderProps) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{pageTitle}</IonTitle>
        <IonButtons slot="end">
          <IonButton routerLink="/profil">
            <IonIcon icon={personCircleOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
