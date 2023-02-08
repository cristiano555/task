export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
  company: ICompany;
}
