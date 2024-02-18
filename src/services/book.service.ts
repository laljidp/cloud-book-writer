import { Fetcher } from "swr";
import { BASE_URL } from "../constants";
import { BookPayloadT, BookSectionT, BookT } from "../types/book.type";

export const addNewBook = async (book: BookPayloadT) => {
  try {
    const resp = await fetch(`${BASE_URL}/books`, {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    return { success: true, data };
  } catch (err) {
    console.log("ERROR adding book::", err);
    return { success: false, data: null };
  }
};

export const fetchBooks: Fetcher<BookT[]> = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/books`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    return data || [];
  } catch (err) {
    console.log("ERROR fetching books::", err);
    return [];
  }
};

export const editBook = async (
  id: string,
  { collaborators }: { collaborators: string[] }
) => {
  try {
    const resp = await fetch(`${BASE_URL}/books/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ collaborators }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    return { success: true, data };
  } catch (err) {
    console.log("ERROR updating books::", err);
    return { success: false };
  }
};

export const fetchBookByID: Fetcher<BookT | null, { id: string }> = async ({
  id,
}: {
  id: string;
}) => {
  try {
    const resp = await fetch(`${BASE_URL}/books/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    return data || null;
  } catch (err) {
    console.log("ERROR updating books::", err);
    return null;
  }
};

export const upsertBookSections = async (
  bookId: string,
  sections: BookSectionT[]
) => {
  try {
    const resp = await fetch(`${BASE_URL}/books/${bookId}`, {
      method: "PATCH",
      body: JSON.stringify({ sections: sections }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    return data || null;
  } catch (err) {
    console.log("ERROR updating books::", err);
    return null;
  }
};
