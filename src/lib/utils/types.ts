export type TProjects = {
  id: number;
  title: string;
  language: string;
  technicalLabels: TTechnicalLabels[];
  domainLabels: TDomainLabels[];
  description: string;
  status: boolean;
  goal: string;
  milestone: string;
  users: TUsersQuantity[];
  founder: number;
  createdAt: string;
  lastUpdatedAt: string;
  type: string;
  skills: string[];
};

export type TTechnicalLabels = {
  name: string;
};

export type TDomainLabels = {
  name: string;
};

export type TUsersQuantity = {
  usersQuantity: number;
};
