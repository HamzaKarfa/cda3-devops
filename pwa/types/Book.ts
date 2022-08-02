export class Book {
  public "@id"?: string;
  public "rating"?: number;
  public "body"?: string;
  public "author"?: string;
  public "publicationDate"?: Date;
  public "publication_date"?: Date;

  constructor(
    _id?: string,
     rating?: number,
     body?: string,
     author?: string,
     publicationDate?: Date,
     publication_date?: Date
  ) {
    this["@id"] = _id;
    this["rating"] = rating;
    this["body"] = body;
    this["author"] = author;
    this["publicationDate"] = publicationDate;
    this["publication_date"] = publication_date;
  }
}
