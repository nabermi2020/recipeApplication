import { Action } from "@ngrx/store";

export const SIGN_IN = "[AUTH] SIGN_IN";
export const SIGN_UP = "[AUTH] SIGN_UP";
export const LOG_OUT = "[AUTH] LOG_OUT";
export const SET_TOKEN = "[AUTH] SET_TOKEN";

export class signIn implements Action {
  readonly type = SIGN_IN;
}

export class signUp implements Action {
  readonly type = SIGN_UP;
}

export class logOut implements Action {
  readonly type = LOG_OUT;
}

export class setToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {}
}

export type AuthActions = signIn |
                          signUp |
                          logOut |
                          setToken;
