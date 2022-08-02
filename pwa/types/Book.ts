export class Book {
  public "@id"?: string;

  constructor(
    _id?: string,
    public rating?: number,
    public body?: string,
    public author?: string,
    public publicationDate?: Date,
    public publication_date?: Date
  ) {
    this["@id"] = _id;
  }
}
