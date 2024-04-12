const {
  addBookHandler,
  getBooksHandler,
  getDetailBookHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} = require("../handlers/booksHandler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getDetailBookHandler,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: editBookByIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
