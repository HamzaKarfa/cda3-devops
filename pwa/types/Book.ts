export class Book {
  public "@id"?: string;
  public "rating"?: number;
  public "body"?: string;
  public "author"?: string;
  public "publicationDate"?: string;
  public "publication_date"?: string;

  constructor(
    _id?: string,
     rating?: number,
     body?: string,
     author?: string,
     publicationDate?: string,
     publication_date?: string
  ) {
    this["@id"] = _id;
    this["rating"] = rating;
    this["body"] = body;
    this["author"] = author;
    this["publicationDate"] = publicationDate;
    this["publication_date"] = publication_date;
  }
}
