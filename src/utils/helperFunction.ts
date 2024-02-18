import { v4 as uuidv4 } from "uuid";
import { BookSectionT } from "../types/book.type";

export const generateUID = () => uuidv4();

export const appendStringPathToNestedObj = (
  sections: BookSectionT[],
  parentPath = ""
) => {
  return sections.map((section, index) => {
    let path = parentPath + `[${index}]`;
    let __section = { ...section, path };
    if (__section?.sections?.length) {
      let subSection = appendStringPathToNestedObj(
        __section.sections,
        path + ".sections"
      );
      __section.sections = subSection;
    }
    return __section;
  });
};
