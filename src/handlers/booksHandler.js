const { nanoid } = require("nanoid");
const books = require("../data/books");

const addBookHandler = (request, h) => {
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // validate
  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });

    response.code(400);

    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });

    response.code(400);

    return response;
  }

  const newBook = {
    id,
    insertedAt,
    updatedAt,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished: pageCount === readPage,
  };

  books.push(newBook);

  const response = h.response({
    status: "success",
    message: "Buku berhasil ditambahkan",
    data: {
      bookId: id,
    },
  });

  response.code(201);

  return response;
};

const getBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  const data = [...books];
  let filteredData = [...books];

  if (name) {
    filteredData = [
      ...data.filter((x) => {
        const bookName = x.name.toLowerCase();
        const filterName = name.toLowerCase();
        return bookName.includes(filterName);
      }),
    ];
  }

  if (reading) {
    const isReading = reading === "1";
    filteredData = [...data.filter((x) => x.reading === isReading)];
  }

  if (finished) {
    const isFinished = finished === "1";
    filteredData = [...filteredData.filter((x) => x.finished === isFinished)];
  }

  const res = filteredData.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  const response = h.response({
    status: "success",
    data: {
      books: res,
    },
  });

  response.code(200);

  return response;
};

const getDetailBookHandler = (request, h) => {
  const { id } = request.params;
  const book = books.filter((x) => x.id === id)[0];

  if (undefined !== book) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });

  response.code(404);

  return response;
};

const editBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((x) => x.id === id);

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // validate
  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });

    response.code(400);

    return response;
  }

  if (index === -1) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });

    response.code(404);

    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });

    response.code(400);

    return response;
  }

  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished: pageCount === readPage,
    updatedAt,
  };

  const response = h.response({
    status: "success",
    message: "Buku berhasil diperbarui",
  });

  response.code(200);

  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((x) => x.id === id);

  // validate

  if (index === -1) {
    const response = h.response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    });

    response.code(404);

    return response;
  }

  books.splice(index, 1);

  const response = h.response({
    status: "success",
    message: "Buku berhasil dihapus",
  });

  response.code(200);

  return response;
};

module.exports = {
  addBookHandler,
  getBooksHandler,
  getDetailBookHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
