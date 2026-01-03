import { useDataQuery } from "@api/data";

import { IonContent, IonLoading, IonPage } from "@ionic/react";

import DataExampleList from "@components/DataExampleList";
import Header from "@components/Header";

export const Home = () => {
  const { isPending, data, error } = useDataQuery();

  return (
    <IonPage>
      <Header pageTitle="Home" />
      <IonContent className="ion-padding">
        <h1>Fetched data example</h1>

        <IonLoading isOpen={isPending} message={"Loading data..."} />

        {data && DataExampleList({ items: data })}

        {error && <p>Error fetching data</p>}
      </IonContent>
    </IonPage>
  );
};
