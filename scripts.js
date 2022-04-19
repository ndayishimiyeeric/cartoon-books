class Book { //eslint-disable-line
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class UI { //eslint-disable-line
  static displayBooks() {
    const books = Store.getBooks(); //eslint-disable-line
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.id}</td>
    <td><a href="#"class="btn-danger delete">X</a></td>
    `;
    list.appendChild(row);
  }

  static deleteBook(ele) {
    if (ele.classList.contains('delete')) {
      ele.parentElement.parentElement.remove();
    }
  }

  static clearInputs() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#id-number').value = '';
  }
}

// Store class : to store books
class Store { //eslint-disable-line
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks(); //eslint-disable-line
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(id) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.id === id) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event : to display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event : to Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent default
  e.preventDefault();

  // Get values form input
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const idNumber = document.querySelector('#id-number').value;

  // Create a new book
  const book = new Book(title, author, idNumber);

  // Add book to UI
  UI.addBookToList(book);

  // Add book to Store
  Store.addBook(book);

  // then  we clear inputs
  UI.clearInputs();
});

// Event : to remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});
