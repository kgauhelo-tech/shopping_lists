export type List = {
  id: string;
  name: string;
  description: string;
  dateCreated: string;
  category: string;
  userId: string;
  notes: string;
};

export type ListItem = {
  id: string;
  name: string;
  description: string;
  quantity: string;
  imgLink: string;
  listId: string;
};

export type user = {
  id: string;
  name: string;
  surname: string;
  cellNumber: string;
  email: string;
  password?: string;
};
