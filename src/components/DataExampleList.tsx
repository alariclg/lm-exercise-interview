import DataExample from "@models/DataExample";

import { IonItem, IonLabel, IonList } from "@ionic/react";

interface DataExampleListProps {
  items: Array<DataExample>;
}

const DataExampleList = ({ items }: DataExampleListProps) => {
  return (
    <IonList>
      {items.map((dataExample) => (
        <IonItem key={dataExample.id}>
          <IonLabel>
            <h2>{dataExample.name}</h2>
            <p>{dataExample.email}</p>
            <p>{dataExample.body}</p>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};

export default DataExampleList;
