import type { ComponentType } from "react";

import { Home } from "@pages/Home";
import { Login } from "@pages/Login";
import { Profil } from "@pages/Profil";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Redirect, Route } from "react-router-dom";
import { useSnapshot } from "valtio";

import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactHashRouter, IonReactRouter } from "@ionic/react-router";

import { PrivateRoute } from "@components/PrivateRoute";
import userState from "@store/user";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */

import "./theme/global.scss";
import { isElectron } from "./utils/platform";

const queryClient = new QueryClient();

setupIonicReact({ mode: "md", animated: false });

const Router: ComponentType = isElectron()
  ? IonReactHashRouter
  : IonReactRouter;

export const App = () => {
  const { isLoggedIn } = useSnapshot(userState);

  return (
    <QueryClientProvider client={queryClient}>
      <IonApp>
        <Router>
          <IonRouterOutlet>
            <Route exact path="/login">
              {isLoggedIn ? <Redirect to="/home" /> : <Login />}
            </Route>

            <PrivateRoute exact path="/home">
              <Home />
            </PrivateRoute>

            <PrivateRoute exact path="/profil">
              <Profil />
            </PrivateRoute>

            <Route exact path="/">
              <Redirect to={isLoggedIn ? "/home" : "/login"} />
            </Route>
          </IonRouterOutlet>
        </Router>
      </IonApp>
    </QueryClientProvider>
  );
};
