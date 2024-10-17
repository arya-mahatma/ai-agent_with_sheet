# Cloud Education Chain Workplace AI Software and Cloud Application Course - Google Apps Script Toolkit

## Project Overview

This project contains a series of Google Apps Script code examples designed for the [Cloud Education Chain Workplace AI Software and Cloud Application Course](https://www.cxcxc.io/agentic-ai-course/).  These scripts aim to enhance participant productivity by automating Google Sheets data manipulation, integrating with the Google Gemini API for AI question answering and classification, and generating and calculating text vector similarity.

## Feature List

- **HTTP GET/POST Data Handling**: Automates data querying, insertion, and updates within Google Sheets.
- **AI Question Answering and Classification**: Utilizes the Google Gemini API for text-based question answering and text classification.
- **Text Vector Generation and Similarity Calculation**: Converts text into vector representations and calculates their similarity.
- **Image Question Answering**: Provides image URL, converts the image to Base64, and uses the Gemini API for question answering.
- **Web Content Scraping and Question Answering**: Automatically scrapes content from specified web pages and performs question answering, enhancing answer accuracy.
- **PDF Document Generation**: Automatically generates PDF documents based on Google Docs templates, with dynamic parameter substitution.
- **Image Saving to Google Drive**: Automatically downloads images from the web and saves them to a Google Drive folder.

## Application Scenarios

These Google Apps Script codes can be applied in the following scenarios:

1. **Automated Data Processing**: Reduces manual errors and time consumption during business report generation.
2. **AI-Driven Text Classification and Analysis**: Quickly classifies customer feedback, extracts key information, and facilitates timely decision-making.
3. **Vector Similarity Calculation**: Quickly finds answers to similar questions in customer service systems, improving efficiency.
4. **Business Process Automation**: Automates the processing and classification of data from various departments, increasing productivity.

For group course collaborations, please contact us via our Line official account: [https://lin.ee/nlPnBYS](https://lin.ee/nlPnBYS)

## Installation and Usage

1. **Copy Project**: Clone this project into your Google Apps Script project.
2. **Configure API Key**: Add your Google Gemini API key in the project settings (Script Properties).
3. **Run Examples**: Use the example functions for testing and verify API integration and functionality.

## License

This project is open-sourced under the MIT License. Feel free to use, modify, and distribute it.  For further collaboration or group course inquiries, please refer to the [Cloud Education Chain website](https://www.cxcxc.io/).

## Contact Us

For any questions or suggestions, please contact us through our [Cloud Education Chain Line official account](https://lin.ee/nlPnBYS).


# Using Google Apps Script in Google Sheets to Call the Gemini API

## Overview

This tutorial demonstrates how to use Google Apps Script within Google Sheets to call the Gemini API for automation. You will learn how to use Apps Script for question answering, text classification, and vector operations.

## Prerequisites

* Obtain a Google API Key (API Key) from Google AI Studio.
* Ensure you have added the API Key as a Script Property in your Apps Script project.
* Ensure the provided code has been added to your Google Apps Script project.

## Function Guide Directory

# Using Google Apps Script in Google Sheets to Call the Gemini API

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

1. **In Google Sheets**:
   - Enter the following formula in any cell to call `GeminiQA`:
   ```javascript
   =GeminiQA("Your question")
   ```

## `GeminiQAFromImage` Tutorial

### Functionality:
The `GeminiQAFromImage` function uses Google Apps Script to call the Gemini API for question answering based on an image. You provide a question and the image URL, and the Gemini API returns the analyzed result after converting the image to Base64.

### Usage:

1. **In Google Sheets**:
   - Enter the following formula in any cell to call `GeminiQAFromImage`:
   ```javascript
   =GeminiQAFromImage("Your question", "Image URL")
   ```

## `GeminiClassify` Tutorial

### Functionality:
The `GeminiClassify` function uses Google Apps Script to call the Gemini API to classify input text based on specified categories.  You provide an array of categories and the text to be classified, and the Gemini API returns the corresponding classification result.

### Usage:

1. **In Google Sheets**:
   - Enter the following formula in any cell to call `GeminiClassify`:
   ```javascript
   =GeminiClassify({"Category 1", "Category 2", "Category 3"}, "Text to classify")
   ```

## `GeminiVector001` Tutorial

### Functionality:
The `GeminiVector001` function uses Google Apps Script to call the Gemini API to generate a vector representation of text. This vector representation can be used for calculating text similarity or other vector operations.

### Usage:

1. **In Google Sheets**:
   - Enter the following formula in any cell to call `GeminiVector001`:
   ```javascript
   =GeminiVector001("Text to generate vector for")
   ```

## `GeminiVectorSimilarCalculate` Tutorial

### Functionality:
The `GeminiVectorSimilarCalculate` function uses Google Apps Script to calculate the similarity between two vectors. The similarity is usually represented as cosine similarity, ranging from -1 to 1. This function can be used to compare the similarity of two texts, provided that both texts have been vectorized.

### Usage:

1. **In Google Sheets**:
   - Enter the following formula in any cell to call `GeminiVectorSimilarCalculate`:
   ```javascript
   =GeminiVectorSimilarCalculate("String of vector 1", "String of vector 2")
   ```

### Example Usage:
```
=GeminiVectorSimilarCalculate("0.123, 0.456, 0.789", "0.321, 0.654, 0.987")
```

## `GeminiQAWithWeb` Tutorial

### Functionality:
The `GeminiQAWithWeb` function (**requires questions in English due to current Gemini function call limitations**) uses Google Apps Script to call the Gemini API for more complex question-answering tasks. This function allows the use of specific features (like fetching web content) during the Q&A process to supplement and expand answers, thereby improving accuracy and comprehensiveness.

### Usage:

1. **In Google Sheets**:
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
The `doGet` function handles HTTP GET requests, extracting data from a Google Spreadsheet and filtering, sorting, and paginating it based on query parameters. This is particularly useful for applications that require dynamically retrieving data from a spreadsheet, such as creating API endpoints for external applications to access the data.

### Usage:

1. **Deploy as a Web App in Google Apps Script**:
   - In the Google Apps Script editor, click `Deploy` > `New deployment`.
   - Set "Who has access" to "Anyone".
   - Click `Deploy` and obtain the web app URL.

2. **Use `doGet` with HTTP GET requests**:
   - Use a web browser or an HTTP client (like Postman or cURL) to access the deployed web app URL with query parameters for data retrieval.
   - Example URL format:
   ```url
   https://script.google.com/macros/s/your-script-id/exec?sheet_name=Sheet1&query_mode=normal&filter_column=colA=ValueA&exclude_columns=colB
   ```

### Common Query Parameters:
* **sheet_name** (required): Specifies the sheet name to query.
* **query_mode** (optional): Query mode, supports `normal`, `rag`, and `graph_rag`. Defaults to `normal`.
* **exclude_columns** (optional): Comma-separated list of column names to exclude (e.g., `colA,colB,colC`).
* **page** (optional): Specifies the page number of results to return. Defaults to 1.
* **page_size** (optional): Specifies the number of records per page. Defaults to 10.


### `doGet` Query Mode Details and Examples


### `normal` Mode

#### Description:
`normal` mode is the most basic query mode, allowing you to extract and filter data from a Google Spreadsheet based on specified query parameters.  You can use filter conditions, exclude specific columns, and paginate results.

#### Query Parameters:
- **Any column name in the sheet**:  Filter based on the data present in your sheet's columns.

#### Example:
Query `Sheet1` for data where `colA` equals `ValueA`, exclude `colB`, and display the first 10 results on page 1.

```url
https://script.google.com/macros/s/your-script-id/exec?sheet_name=Sheet1&query_mode=normal&exclude_columns=colB&page=1&page_size=10&your_data_column_name>=10
```

### `rag` Mode

#### Description:
`rag` mode (Retrieval Augmented Generation) allows you to convert a query string into a vector and compare it with vectors in a specified column for similarity. This mode is particularly useful for data filtering based on semantic similarity.

#### Query Parameters:
- **search_term**: The query string to be converted into a vector for similarity comparison.
- **compare_vector_column**: The column name containing the vectors to compare against the `search_term` vector.
- **threshold**:  The similarity threshold. Only results with similarity greater than or equal to this threshold are returned.

#### Example:
Query `Sheet1` where the similarity between `search_term` and vectors in `vector_col` is greater than or equal to `0.75`, and display the first 10 results on page 1.

```url
https://script.google.com/macros/s/your-script-id/exec?sheet_name=Sheet1&query_mode=rag&search_term=Example%20Query&compare_vector_column=vector_col&threshold=0.75&page=1&page_size=10
```




## `doPost` Tutorial

### Functionality:
The `doPost` function handles HTTP POST requests, performing different actions based on the `function_name` parameter:
- **`insert_data`**: Inserts JSON data from the request into the specified Google Spreadsheet sheet, automatically matching fields based on headers.
- **`mail_user`**: Sends emails to a provided list of recipients.  If no subject is specified, the current date is used as the default subject.
- **`store_image_to_drive`**: Downloads and saves a specified image URL to Google Drive. If a `folder_name` is provided, the image is saved within that folder; otherwise, a folder with the current Spreadsheet's name is used.
- **`create_pdf_from_doc_template`**: Generates a PDF automatically using a specified Google Docs template, replacing keywords or markers within the template based on a replacement dictionary provided in the POST request.  Optionally saves the generated PDF to a specified Google Drive folder with "Anyone with the link can view" permissions for easy sharing.  If no file name or folder is provided, the system will automatically name and save the PDF in the parent folder of the template document.


These functionalities are suitable for scenarios requiring automated data writing to Google Sheets or sending emails.

### Usage:

1. **Deploy as a Web App in Google Apps Script**:
   - In the Google Apps Script editor, click `Deploy` > `New Deployment`.
   - Set "Who has access" to "Anyone".
   - Click `Deploy` and obtain the web app URL.

2. **Use `doPost` with HTTP POST requests**:
   - Use an HTTP client (like Postman or cURL) to send POST requests to the deployed web app URL.
   - Specify `function_name` and other required parameters in the POST body based on the desired functionality.


### POST Body Format:
The request body should be in JSON format and contain the following parameters:

#### Common Parameters:
- **function_name**: Specifies the desired function to execute (e.g., `insert_data`, `mail_user`, `store_image_to_drive`, `create_pdf_from_doc_template`).


#### `insert_data` Mode:
- **sheet_name**: Required.  Specifies the Google Spreadsheet sheet name where data should be inserted.
- Other fields: Should correspond to column names in your Google Spreadsheet.

#### `mail_user` Mode:
- **sender_emails**: Required. List of recipient email addresses.
- **email_subject**: Optional. The email subject. If not provided, the current date will be used.
- **email_content**: Required. The email body content, supports HTML formatting.


#### `store_image_to_drive` Mode:
- **image_url**: Required.  The URL of the image to download.
- **folder_name**: Optional. The name of the folder in Google Drive to save the image to. If not provided, a folder named after the Spreadsheet will be used.

#### `create_pdf_from_doc_template` Mode:
- **template_doc_name**: Optional.  Specifies the name of the Google Docs template document. Defaults to "Document Template" if not provided.
- **pdf_file_name**: Optional. The name of the generated PDF file. If not specified, a unique name will be generated using the current timestamp and a random code.
- **folder_name**: Optional. The name of the Google Drive folder to save the generated PDF to. If not provided, the folder containing the template will be used.
- **replace_map**: Required. Contains a dictionary of replacement values for dynamic text substitution within the template.


### Examples:


#### 1. Insert Data into Sheet (`insert_data` Mode):
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


#### 2. Send Email (`mail_user` Mode):

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


#### 3. Store Image to Google Drive (`store_image_to_drive` Mode):

Save a specified image to a designated Google Drive folder.  If no folder name is provided, the Spreadsheet's name will be used as the folder name.

```json
{
  "function_name": "store_image_to_drive",
  "image_url": "https://example.com/image.jpg",
  "folder_name": "MyImagesFolder"
}
```


Using cURL:
```bash
curl -X POST \
  https://script.google.com/macros/s/your-script-id/exec \
  -H 'Content-Type: application/json' \
  -d '{
    "function_name": "store_image_to_drive",
    "image_url": "https://example.com/image.jpg",
    "folder_name": "MyImagesFolder"
  }'
```


#### 4. Generate PDF from Template (`create_pdf_from_doc_template` Mode):


```json
{
  "function_name": "create_pdf_from_doc_template",
  "template_doc_name": "Course Certificate Template",
  "pdf_file_name": "Student Certificate",
  "folder_name": "Certificates",
  "replace_map": {
    "{{Name}}": "John Doe",
    "{{Course Name}}": "AI Application Course"
  }
}
```


Using cURL:
```bash
curl -X POST \
  https://script.google.com/macros/s/your-script-id/exec \
  -H 'Content-Type: application/json' \
  -d '{
  "function_name": "create_pdf_from_doc_template",
  "template_doc_name": "Course Certificate Template",
  "pdf_file_name": "Student Certificate",
  "folder_name": "Certificates",
  "replace_map": {
    "{{Name}}": "John Doe",
    "{{Course Name}}": "AI Application Course"
  }
}'
```