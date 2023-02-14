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

export type PostType = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

export type CommentType = {
  body: string;
  email: string;
  id: number;
  postId: number;
  title: string;
};
