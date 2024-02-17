export type BookPayloadT = {
  name: string;
  userId: string; // AuthorID who has created
  collaborators: string[];
};

export type BookT = {
  id: string;
  name: string;
  userId: string; // AuthorID
  collaborators: string[];
  sections: BookSectionT[];
};

export type BookSectionT = {
  id: string;
  name: string;
  pageNo: number;
  sections: BookSectionT[];
};
