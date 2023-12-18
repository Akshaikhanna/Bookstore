import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "../styles/Books.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/books")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  return (
    <div>
      <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand>Books</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Author</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
      <div className="table-responsive">
        <Table striped hover >
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author_id</th>
              <th>Publication_Year</th>
              <th>Button</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book) => (
              <tr key={book.book_id}>
                <td>{book.book_id}</td>
                <td>{book.title}</td>
                <td>{book.author_id}</td>
                <td>{book.publication_year}</td>
                <td className="edit">
                  <MdEdit />
                </td>
                <td className="delete">
                  <MdDelete />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Books;
