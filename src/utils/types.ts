export type CompanyType = {
  name: string;
}

export type UserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: CompanyType;
}
