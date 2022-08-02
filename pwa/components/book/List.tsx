import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { Book } from "../../types/Book";

interface Props {
  books: Book[];
}

export const List: FunctionComponent<Props> = ({ books }) => (
  <div>
    <h1>Book List</h1>
    <Link href="/books/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>rating</th>
          <th>body</th>
          <th>author</th>
          <th>publicationDate</th>
          <th>publication_date</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {books &&
          books.length !== 0 &&
          books.map((book) => (
            <tr key={book["@id"]}>
              <th scope="row">
                <ReferenceLinks items={book["@id"]} type="book" />
              </th>
              <td>{book["rating"]}</td>
              <td>{book["body"]}</td>
              <td>{book["author"]}</td>
              <td>{book["publicationDate"]}</td>
              <td>{book["publication_date"]}</td>
              <td>
                <ReferenceLinks
                  items={book["@id"]}
                  type="book"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${book["@id"]}/edit`}>
                  <a>
                    <i className="bi bi-pen" aria-hidden="true" />
                    <span className="sr-only">Edit</span>
                  </a>
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);
