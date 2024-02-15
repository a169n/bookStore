document.addEventListener("DOMContentLoaded", function () {
  const createBookForm = document.getElementById("createBookForm");
  const filterByInput = document.getElementById("filterBy");
  const applyFilterBtn = document.getElementById("applyFilterBtn");
  const sortByInput = document.getElementById("sortBy");
  const applySortBtn = document.getElementById("applySortBtn");
  const searchQueryInput = document.getElementById("searchQuery");
  const searchBtn = document.getElementById("searchBtn");
  const booksContainer = document.getElementById("booksContainer");

  async function fetchBooks() {
    try {
      const response = await fetch("/books");
      const data = await response.json();
      displayBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  function displayBooks(books) {
    booksContainer.innerHTML = "";
    const ol = document.createElement("ol");
    books.forEach((book) => {
      const li = document.createElement("li");
      const publicationYear = new Date(book.publicationYear).getFullYear();
      li.innerHTML = `
              <h2>${book.title}</h2>
              <p><strong>Author:</strong> ${book.author}</p>
              <p><strong>Genre:</strong> ${book.genre}</p>
              <p><strong>Publication Year:</strong> ${publicationYear}</p>
              <p><strong>Quantity Available:</strong> ${book.quantityAvailable}</p>
              <p><strong>Price:</strong> $${book.price}</p>
              <button id="deleteButton" onclick="deleteBook('${book._id}')">Delete</button>
          `;
      ol.appendChild(li);
    });
    booksContainer.appendChild(ol);
  }

  createBookForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(createBookForm);
    const bookData = {
      title: formData.get("title"),
      author: formData.get("author"),
      genre: formData.get("genre"),
      publicationYear: formData.get("publicationYear"),
      quantityAvailable: formData.get("quantityAvailable"),
      price: formData.get("price"),
    };
    try {
      const response = await fetch("/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });
      const data = await response.json();
      console.log("New book added:", data);
      createBookForm.reset();
      fetchBooks();
    } catch (error) {
      console.error("Error adding new book:", error);
    }
  });

  applyFilterBtn.addEventListener("click", function () {
    const filterBy = filterByInput.value.trim();
    if (filterBy) {
      fetchFilteredBooks(filterBy);
    } else {
      fetchBooks();
    }
  });

  async function fetchFilteredBooks(filterBy) {
    try {
      const response = await fetch(`/books/filter?genre=${filterBy}`);
      const data = await response.json();
      displayBooks(data);
    } catch (error) {
      console.error("Error fetching filtered books:", error);
    }
  }

  applySortBtn.addEventListener("click", function () {
    const sortBy = sortByInput.value.trim();
    if (sortBy) {
      fetchSortedBooks(sortBy);
    } else {
      fetchBooks();
    }
  });

  async function fetchSortedBooks(sortBy) {
    try {
      const response = await fetch(`/books/sort/${sortBy}`);
      const data = await response.json();
      displayBooks(data);
    } catch (error) {
      console.error("Error fetching sorted books:", error);
    }
  }

  searchBtn.addEventListener("click", function () {
    const searchQuery = searchQueryInput.value.trim();
    if (searchQuery) {
      fetchSearchedBooks(searchQuery);
    } else {
      fetchBooks();
    }
  });

  async function fetchSearchedBooks(searchQuery) {
    try {
      const response = await fetch(`/books/search/${searchQuery}`);
      const data = await response.json();
      displayBooks(data);
    } catch (error) {
      console.error("Error fetching searched books:", error);
    }
  }

  window.deleteBook = async function (bookId) {
    try {
      const response = await fetch(`/books/${bookId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Book deleted successfully");
        fetchBooks();
      } else {
        console.error("Error deleting book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  fetchBooks();
});
