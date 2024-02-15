# Book Inventory System

This is a simple web-based book inventory system where users can add, view, filter, sort, search, and delete books.

## Features

- **Add Book**: Users can add a new book to the inventory by providing title, author, genre, publication year, quantity available, and price information.
- **View Books**: Books in the inventory are displayed in a list format with details such as title, author, genre, publication year, quantity available, and price.
- **Filter Books**: Users can filter books by genre.
- **Sort Books**: Books can be sorted based on various criteria such as title, author, genre, publication year, quantity available, and price.
- **Search Books**: Users can search for books by title, author, or genre.
- **Delete Book**: Each book item has a delete button that allows users to remove a book from the inventory.


## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a new file in the root directory of your project.
4. Name the file .env.
5. Add the following line to the .env file, replacing mongo_uri_here with your MongoDB connection URI:
``` bash
MONGO_URI=mongo_uri_here
```
Make sure to replace mongo_uri_here with your actual MongoDB connection URI.

6. Run the server using `npm run dev`.
7. Access the application in your web browser at `http://localhost:3000`.


## Endpoints:

- **Add Book**: `POST /books`
- **Get All Books**: `GET /books`
- **Filter Books by Genre**: `GET /books/filter?genre={genre}`
- **Sort Books**: `GET /books/sort/{sortBy}`
- **Search Books**: `GET /books/search/{searchQuery}`
- **Delete Book by ID**: `DELETE /books/{bookId}`


## Usage

- To add a new book, fill out the form on the homepage and click "Add Book".
- To filter books by genre, enter a genre in the filter input and click "Apply Filter".
- To sort books, enter a sorting criteria in the sort input and click "Apply Sort".
- To search for books, enter a search query in the search input and click "Search".
- To delete a book, click the delete button next to the book item.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any bugs or have suggestions for improvements.

## License

This project is not licensed.
