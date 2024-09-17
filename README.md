# Shahry_Assessment

## Project Overview

This project is a backend API service that validates an Egyptian national ID and extracts useful information such as:
- **Birth Date** (Year, Month, Day)
- **Governorate** (where the ID was issued)
- **Gender** (Male or Female)

The purpose of this task is to demonstrate how to build a maintainable and scalable backend service, emphasizing code quality, design decisions, and modularity.

## Features
- **ID Validation**: Ensures the input national ID is in the correct format (14-digit number).
- **Data Extraction**: Extracts the birth date, governorate, and gender from the provided national ID.
- **Date Validation**: Ensures that the extracted birth date is a valid date (e.g., checking if February 29th only exists in leap years).
- **Modular Code**: The code is divided into multiple modules to enhance maintainability.
  
## Tech Stack

- **Backend**: Node.js (JavaScript)
- **Framework**: Express.js
- **Data Storage**: A static object containing governorate codes and names

## How to Run the Application

### 1. Prerequisites
- **Node.js**: Ensure that Node.js (v14.x or higher) is installed. You can download it from [Node.js official website](https://nodejs.org/).
- **npm**: It comes with Node.js but make sure it's updated.

### 2. Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/monasr6/NationalIDValidator.git
    cd NationalIDValidator
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

### 3. Running the Application

1. Start the server:
    ```bash
    npm start
    ```

2. The API will be running locally at `http://localhost:3000`.

### 4. Making Requests

The API exposes a single POST endpoint: `http://localhost:3000/validate-id`.

#### **POST /validate-id**

**Request Body:**

```json
{
  "nationalID": "29001011234567"
}
```

**Response Example (Valid ID):**
```json
{
  "message": "Valid National ID",
  "birthDate": "1990-01-01",
  "gender": "Male",
  "governorate": "Cairo"
}
```

**Response Example (Invalid ID Format):**
```json
{
  "error": "Invalid National ID format"
}
```

**Response Example (Invalid Date in ID):**
```json
{
  "error": "Invalid birth date extracted from National ID"
}
```

## Project Structure

```
├── server.js                     # Entry point of the application
├── extractDataService.js         # Contains the logic to extract birthdate, gender, governorate
├── governorates.js               # Governorate codes and names
├── package.json                  # Project dependencies and scripts
├── README.md                     # Project documentation
```

- **`server.js`**: Handles the API route and requests.
- **`extractDataService.js`**: Contains the extraction logic to ensure separation of concerns.
- **`governorates.js`**: Contains governorate code mappings for easy lookup.

## Design Decisions

1. **Modularization**: The extraction logic was moved to a separate file (`extractDataService.js`) for better maintainability and separation of concerns. This makes the codebase easier to scale and test.
  
2. **Governorate Codes**: Governorate codes were stored in a dedicated file (`governorates.js`) to ensure easy updates and decoupling from business logic.

3. **Date Validation**: An additional layer of validation is added to ensure the birth date extracted from the National ID is valid. For example, February 29 is considered valid only in leap years. Invalid dates will trigger an appropriate error response.

4. **Validation**: Basic validation is applied to ensure the ID is 14 digits and matches the expected pattern before attempting to extract data.

5. **Error Handling**: Error responses for invalid input (missing or wrongly formatted national ID) are handled gracefully to ensure robustness.

## Future Improvements

- **Unit Tests**: Add unit tests to validate different cases for national IDs (invalid format, invalid governorate code, invalid date, etc.).
- **Logging**: Implement logging to track request/response and potential errors.
- **Caching**: Cache governorate codes to improve performance for future requests.

## Conclusion

This project demonstrates an efficient way to validate and extract meaningful information from an Egyptian National ID. The goal was to maintain high code quality with clear separation of logic while ensuring the system can be extended or updated easily.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
