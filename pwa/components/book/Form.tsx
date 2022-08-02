import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { Book } from "../../types/Book";

interface Props {
  book?: Book;
}

export const Form: FunctionComponent<Props> = ({ book }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(book["@id"], { method: "DELETE" });
      router.push("/books");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{book ? `Edit Book ${book["@id"]}` : `Create Book`}</h1>
      <Formik
        initialValues={book ? { ...book } : new Book()}
        validate={(values) => {
          console.log(values);
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/books" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/books");
          } catch (error) {
            setStatus({
              isValid: false,
              msg: `${error.defaultErrorMsg}`,
            });
            setErrors(error.fields);
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-control-label" htmlFor="_rating">
                rating
              </label>
              <input
                name="rating"
                id="_rating"
                value={values.rating ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.rating && touched.rating ? " is-invalid" : ""
                }`}
                aria-invalid={errors.rating && touched.rating}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="rating"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_body">
                body
              </label>
              <input
                name="body"
                id="_body"
                value={values.body ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.body && touched.body ? " is-invalid" : ""
                }`}
                aria-invalid={errors.body && touched.body}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="body" />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_author">
                author
              </label>
              <input
                name="author"
                id="_author"
                value={values.author ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.author && touched.author ? " is-invalid" : ""
                }`}
                aria-invalid={errors.author && touched.author}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="author"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_publicationDate">
                publicationDate
              </label>
              <input
                name="publicationDate"
                id="_publicationDate"
                value={values.publicationDate ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.publicationDate && touched.publicationDate
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={errors.publicationDate && touched.publicationDate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="publicationDate"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_publication_date">
                publication_date
              </label>
              <input
                name="publication_date"
                id="_publication_date"
                value={values.publication_date ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.publication_date && touched.publication_date
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={
                  errors.publication_date && touched.publication_date
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="publication_date"
            />

            {status && status.msg && (
              <div
                className={`alert ${
                  status.isValid ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                {status.msg}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <Link href="/books">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {book && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
