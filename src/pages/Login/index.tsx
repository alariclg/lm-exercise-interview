import { useState } from "react";

import { useLoginMutation } from "@api/user";
import { useHistory } from "react-router-dom";

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonInput,
  IonPage,
} from "@ionic/react";

import { loginSchema } from "@schema/login.schema";
import { login as loginStore } from "@store/user";

import "./login.scss";

export const Login = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const loginMutation = useLoginMutation();

  const handleMutationSuccess = (data: { user: string; token: string }) => {
    loginStore(data.user, data.token);

    history.replace("/home");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse({ username, password });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        username: fieldErrors.username?.[0],
        password: fieldErrors.password?.[0],
      });
    } else {
      setErrors({});

      loginMutation.mutate(
        { username, password },
        {
          onSuccess: handleMutationSuccess,
          onError: (error) => {
            console.error("Login failed:", error);
          },
        }
      );
    }
  };

  return (
    <IonPage>
      <IonContent className="login-container">
        <IonCard className="login-card">
          <IonCardHeader>
            <IonCardTitle>Login</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <form onSubmit={handleSubmit}>
              <IonInput
                label="Username"
                type="text"
                value={username}
                onIonInput={(e) => setUsername(e.detail.value!)}
                required
              />

              {errors.username && (
                <p className="error-text">{errors.username}</p>
              )}

              <IonInput
                label="Password"
                type="password"
                value={password}
                onIonInput={(e) => setPassword(e.detail.value!)}
                required
              />

              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}

              {loginMutation.isError && (
                <p className="error-text">
                  Vos identifiants n'ont pas été reconnus. Veuillez réessayer.
                </p>
              )}

              <IonButton
                expand="block"
                type="submit"
                className="ion-margin-top"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Loading..." : "Login"}
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
