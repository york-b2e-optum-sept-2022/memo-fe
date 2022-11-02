import {IAccount} from "./IAccount";

export interface IMemo {
  id: number;
  owner: IAccount;

  title: string;
  body: string;
  createdDate: Date;
  finished: boolean;
}
