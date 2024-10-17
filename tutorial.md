# Using Google Apps Script to Call the Gemini API in Google Spreadsheets

## Overview

This tutorial demonstrates how to use Google Apps Script to call the Gemini API within Google Spreadsheets for automation.  You will learn how to use Apps Script to perform question answering, text classification, and vector operations.

## Prerequisites

* **Obtain a Google API Key:** Ensure you have a Gemini API key from Google AI Studio.
* **Add Script Properties:** Add the API key as a script property in the Apps Script editor.
* **Add the Code:** Ensure the provided code is added to your Google Apps Script project.

## Function Guide and Directory

# Using Google Apps Script to Call the Gemini API in Google Spreadsheets

[GitHub Repository](https://github.com/cxcxc-io/ai-agent_with_sheet)

[Tutorial Document - tutorial.md](https://github.com/cxcxc-io/ai-agent_with_sheet/blob/main/tutorial.md)


## Table of Contents
- [GeminiQA Tutorial](#geminiqa-tutorial)
- [GeminiQAFromImage Tutorial](#geminiqafromimage-tutorial)
- [GeminiClassify Tutorial](#geminiclassify-tutorial)
- [GeminiVector001 Tutorial](#geminivector001-tutorial)
- [GeminiVectorSimilarCalculate Tutorial](#geminivectorsimilarcalculate-tutorial)
- [GeminiQAWithWeb Tutorial](#geminiqawithweb-tutorial)
- [doGet Tutorial](#doget-tutorial)
- [doPost Tutorial](#dopost-tutorial)


## `GeminiQA` Tutorial

### Functionality:

The `GeminiQA` function uses Google Apps Script to call the Gemini API and generate answers to your questions. You simply provide a question, and the Gemini API returns the most appropriate answer.

### Usage:

1. **In Google Sheets:**
   - Enter the following formula in any cell to call `GeminiQA`:
   ```javascript
   =GeminiQA("Your question")
   ```

## `GeminiQAFromImage` Tutorial

### Functionality:

The `GeminiQAFromImage` function uses Google Apps Script to call the Gemini API, converting an image to Base64 format before performing question answering.  You provide a question and the image URL, and the Gemini API returns the analysis.

### Usage:

1. **In Google Sheets:**
   - Enter the following formula in any cell to call `GeminiQAFromImage`:
   ```javascript
   =GeminiQAFromImage("Your question", "Image URL")
   ```


## `GeminiClassify` Tutorial

### Functionality:

The `GeminiClassify` function uses Google Apps Script to call the Gemini API to classify text content according to specified categories. You provide an array of categories and the text to be classified, and the Gemini API returns the corresponding classification result.

### Usage:

1. **In Google Sheets:**
   - Enter the following formula in any cell to call `GeminiClassify`:
   ```javascript
   =GeminiClassify({"Category 1", "Category 2", "Category 3"}, "Text to classify")
   ```

## `GeminiVector001` Tutorial

### Functionality:

The `GeminiVector001` function uses Google Apps Script to call the Gemini API to generate a vector representation of text. This vector representation can be used to calculate text similarity or perform other vector operations.

### Usage:

1. **In Google Sheets:**
   - Enter the following formula in any cell to call `GeminiVector001`:
   ```javascript
   =GeminiVector001("Text to generate vector from")
   ```


## `GeminiVectorSimilarCalculate` Tutorial

### Functionality:

The `GeminiVectorSimilarCalculate` function uses Google Apps Script to calculate the similarity between two vectors. This similarity is typically represented as cosine similarity, ranging from -1 to 1.  This function can be used to compare the similarity of two pieces of text, provided they have already been vectorized.

### Usage:

1. **In Google Sheets:**
   - Enter the following formula in any cell to call `GeminiVectorSimilarCalculate`:
   ```javascript
   =GeminiVectorSimilarCalculate("String of Vector 1", "String of Vector 2")
   ```

### Example Usage:

```
=GeminiVectorSimilarCalculate("0.123, 0.456, 0.789", "0.321, 0.654, 0.987")
```


## `GeminiQAWithWeb` Tutorial

### Functionality:

The `GeminiQAWithWeb` function, **requires English prompts as Gemini's function calling doesn't fully support other languages yet**, uses Google Apps Script to call the Gemini API to handle more complex question-answering tasks. This function allows the use of specific features (such as fetching web content) during the question-answering process to supplement and expand answers, thereby improving accuracy and comprehensiveness.

### Usage:

1. **In Google Sheets:**
   - Enter the following formula in any cell to call `GeminiQAWithWeb`:
   ```javascript
   =GeminiQAWithWeb("Your question in English. If you include a URL, it will be accessed.")
   ```

### Example Usage:

```
=GeminiQAWithWeb("What content is available on https://example.com?")
```

## `doGet` Tutorial

### Functionality:

The `doGet` function handles HTTP GET requests, retrieving data from a Google Spreadsheet and filtering, sorting, and paginating it based on query parameters. This is particularly useful for applications that require dynamically retrieving data from a spreadsheet, such as creating API endpoints for external applications.

### Usage:

1. **Deploy as a Web App:**
   - In the Google Apps Script editor, click `Deploy` > `New Deployment`.
   - Set "Who has access to the app" to `Anyone`.
   - Click `Deploy` and obtain the web app URL.

2. **Access via HTTP GET Request:**
   - Use a web browser or HTTP client (like Postman or cURL) to access the deployed URL with query parameters for data retrieval.
   - Example URL format:
   ```url
   https://script.google.com/macros/s/your-script-id/exec?sheet_name=Sheet1&query_mode=normal&filter_column=colA=ValueA&exclude_columns=colB
   ```
### Common Query Parameters:
* **sheet_name** (required): Specifies the sheet name to query.
* **query_mode** (optional):  Query mode, supports `normal`, `rag`, and `graph_rag`. Defaults to `normal`.
* **exclude_columns** (optional):  Comma-separated list of column names to exclude (e.g., `colA,colB,colC`).
- **page** (optional): Specifies the page number of results to return. Defaults to 1.
- **page_size** (optional): Specifies the number of records per page. Defaults to 10.


### `doGet` Mode-Specific Query Parameters and Examples

### `normal` Mode

#### Description:

The `normal` mode is the most basic query mode, allowing you to extract and filter data from the Google Spreadsheet based on specified query parameters.  You can use filter criteria, exclude specific columns, and paginate the results.

#### Query Parameters:
- **Any Column in Spreadsheet**: Filter by any existing column in your data.

#### Example:

Query `Sheet1` for data where `colA` equals `ValueA`, exclude `colB`, and display the first 10 results on page 1.

```url
https://script.google.com/macros/s/your-script-id/exec?sheet_name=Sheet1&query_mode=normal&exclude_columns=colB&page=1&page_size=10&your_data_column_name>=10
```

### `rag` Mode

#### Description:

The `rag` mode (Retrieval Augmented Generation) allows you to convert a query string into a vector and compare it against vectors in a specified column for similarity. This mode is particularly useful for scenarios requiring data filtering based on semantic similarity.

#### Query Parameters:
- **search_term**: The string to query, which will be converted to a vector for similarity comparison.
- **compare_vector_column**: The column name to compare the `search_term` vector against.
- **threshold**: The similarity threshold.  Only results with similarity greater than or equal to this threshold are returned.


#### Example:
Query `Sheet1` where the similarity between `search_term` and vectors in `vector_col` is greater than or equal to `0.75`, and display the first 10 results on page 1.

```url
https://script.google.com/macros/s/your-script-id/exec?sheet_name=Sheet1&query_mode=rag&search_term=Example%20Query&compare_vector_column=vector_col&threshold=0.75&page=1&page_size=10
```


## `doPost` Tutorial

### Functionality:

The `doPost` function handles HTTP POST requests, performing different actions based on the `function_name` parameter:
- **`insert_data`**: Inserts the requested JSON data into the specified Google Spreadsheet sheet, automatically matching fields based on headers.
- **`mail_user`**: Sends emails to a provided list of recipients. If no subject is specified, the current date is used as the default subject.

These functions are suitable for scenarios requiring automated data writing to Google Spreadsheets or sending emails.

### Usage:

1. **Deploy as a Web App:**
   - In the Google Apps Script editor, click `Deploy` > `New Deployment`.
   - Set "Who has access to the app" to `Anyone`.
   - Click `Deploy` and obtain the web app URL.

2. **Access via HTTP POST Request:**
   - Use an HTTP client (like Postman or cURL) to send a POST request to the deployed URL.
   - Specify the `function_name` and other required parameters in the POST body based on the desired functionality.


### POST Body Format:

The request body should be in JSON format, containing the following parameters:

#### Common Parameters:

- **function_name**: Specifies the function to execute, which can be `insert_data` or `mail_user`.

#### `insert_data` Mode:

- **sheet_name**:  Required.  Specifies the name of the Google Spreadsheet sheet to insert data into.
- Other fields: Must correspond to column names in the Google Spreadsheet.

#### `mail_user` Mode:
- **sender_emails**: Required.  A list of recipient email addresses.
- **email_subject**: Optional.  The email subject. If not provided, the current date will be used as the subject.
- **email_content**: Required.  The email content. Supports HTML formatting.


### Examples:


#### 1. Inserting data into a sheet (`insert_data` mode):

Insert `name` and `email` into a sheet named `Sheet1`.

```json
{
  "function_name": "insert_data",
  "sheet_name": "Sheet1",
  "name": "John Doe",
  "email": "johndoe@example.com"
}
```

Using cURL:

```bash
curl -X POST \
  https://script.google.com/macros/s/your-script-id/exec \
  -H 'Content-Type: application/json' \
  -d '{
    "function_name": "insert_data",
    "sheet_name": "Sheet1",
    "name": "John Doe",
    "email": "johndoe@example.com"
  }'
```



#### 2. Sending an email (`mail_user` mode):

Send an email with the content "Welcome!" and the current date as the subject to multiple recipients.


```json
{
  "function_name": "mail_user",
  "sender_emails": ["user1@example.com", "user2@example.com"],
  "email_content": "<h1>Welcome!</h1><p>Thank you for joining us!</p>"
}
```


Using cURL:

```bash
curl -X POST \
  https://script.google.com/macros/s/your-script-id/exec \
  -H 'Content-Type: application/json' \
  -d '{
    "function_name": "mail_user",
    "sender_emails": ["user1@example.com", "user2@example.com"],
    "email_content": "<h1>Welcome!</h1><p>Thank you for joining us!</p>"
  }'
```
