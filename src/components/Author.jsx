import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function Author() {
  const [authors, setAuthors] = useState([]);
  const [editedAuthor, setEditedAuthor] = useState(null);
  const [showModal, setShowModel] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/authors")
      .then((response) => setAuthors(response.data))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  const handleDelete = async (authorId) => {
    console.log("Deleting authorid:", authorId);
    try {
      const response = await fetch(
        `http://localhost:8080/delete/${encodeURIComponent(authorId)}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Author deleted successfully");
        setAuthors((prevAuthors) => {
          return prevAuthors.filter((author) => author.author_id !== authorId);
        });
      } else {
        console.error("Failed to delete author");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (authorId) => {
    console.log("Editing the data:", authorId);
    const authorToEdit = authors.find(
      (author) => author.author_id === authorId
    );
    setEditedAuthor(authorToEdit);
    setShowModel(true);
    console.log("update:", authorId);
  };

  const handleUpdate = async () => {
    console.log("Update Authorid:", editedAuthor);

    try {
      const response = await axios.put(
        `http://localhost:8080/update/${encodeURIComponent(
          editedAuthor.author_id
        )}`,
        { newBirthYear: editedAuthor.birth_year }
      );

      if (response.status === 200) {
        console.log("Author updated Successfully");
        setEditedAuthor(null);
        setShowModel(false);
        axios
          .get("http://localhost:8080/authors")
          .then((response) => setAuthors(response.data));
      } else {
        console.error("Failed to update");
      }
    } catch (error) {
      console.error("Error Update:", error);
    }
  };

  return (
    <div>
      <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/books">Books</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link></Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
      <div className="table-responsive">
        <Table
          striped
          hover
          style={{ fontSize: "14px", width: "95%", marginLeft: "2%" }}
        >
          <thead>
            <tr>
              <th>Author_id</th>
              <th>Author_name</th>
              <th>Birth_year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {authors?.map((author) => (
              <tr key={author.author_id}>
                <td>{author.author_id}</td>
                <td>{author.author_name}</td>
                <td>{author.birth_year}</td>
                <td>
                  <MdEdit
                    size={20}
                    className="edit"
                    onClick={() => handleEdit(author.author_id)}
                  />
                </td>
                <td>
                  <MdDelete
                    size={20}
                    className="delete"
                    onClick={() => handleDelete(author.author_id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4">
                {showModal && editedAuthor && (
                  <Container className="mt-3" style={{ width: "50%" }}>
                    <h2>Edit Birth_year</h2>
                    <Form>
                      <Form.Group controlId="formAuthorName">
                        <Form.Label>AuthorName:</Form.Label>
                        <Form.Control
                          type="text"
                          value={editedAuthor.author_name}
                          onChange={(e) =>
                            setEditedAuthor({
                              ...editedAuthor,
                              author_name: e.target.value,
                            })
                          }
                          style={{ width: "50%" }}
                        />
                      </Form.Group>
                      <Form.Group controlId="formBirthYear">
                        <Form.Label>Birth year</Form.Label>
                        <Form.Control
                          type="text"
                          value={editedAuthor.birth_year}
                          onChange={(e) =>
                            setEditedAuthor({
                              ...editedAuthor,
                              birth_year: e.target.value,
                            })
                          }
                          style={{ width: "50%" }}
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={handleUpdate}
                        style={{ marginTop: "2%" }}
                      >
                        Update
                      </Button>
                    </Form>
                  </Container>
                )}
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
      <Modal show={showModal} onHide={() => setShowModel(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Birth Year</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAuthorName">
              <Form.Label>AuthorName</Form.Label>
              <Form.Control
                type="text"
                value={editedAuthor?.author_name || ""}
                onChange={(e) =>
                  setEditedAuthor({
                    ...editedAuthor,
                    author_name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBirthYear">
              <Form.Label>Birth year</Form.Label>
              <Form.Control
                type="text"
                value={editedAuthor?.birth_year || ""}
                onChange={(e) =>
                  setEditedAuthor({
                    ...editedAuthor,
                    birth_year: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleUpdate}>
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Author;
