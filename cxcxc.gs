/**
 * This code is designed for the Cloud Chain Workplace AI Software and Cloud Application Course.
 * The course covers how to use Google Apps Script to automate business processes,
 * and apply it to the development of AI agents and integration with cloud applications.
 *
 * For more course information, please refer to the Cloud Chain official website: https://www.cxcxc.io/agentic-ai-course/
 *
 * Licensing Terms: For group class cooperation, please add our official Line account: https://lin.ee/nlPnBYS.
 */


// API URLs
// https://ai.google.dev/gemini-api/docs/api-versions
// https://ai.google.dev/gemini-api/docs/function-calling

// Store the Google API Key as an environment variable
const apiKey = PropertiesService.getScriptProperties().getProperty("GOOGLE_AI_API_KEY");


// Get the model name, use the default value "gemini-1.5-flash" if not set
function getModelName() {
  var modelName = PropertiesService.getScriptProperties().getProperty("GEMINI_MODEL_NAME");

  // Use explicit conditional checks to avoid null or undefined cases
  if (modelName === null || modelName === undefined || modelName.trim() === "") {
    modelName = "gemini-1.5-flash";  // Default value
  }

  return modelName;
}

/**
 * GeminiQA
 * This function calls the Gemini API through Google Apps Script to generate answers for a single question.
 * Functionality: Accepts a question string and uses the Gemini API to generate a corresponding answer.
 */
function GeminiQA(question) {
  var modelName = getModelName(); // Get the model name
  var url = "https://generativelanguage.googleapis.com/v1beta/models/" + modelName + ":generateContent?key=" + apiKey;

  var payload = {
    "contents": [{
      "parts": [{
        "text": question
      }]
    }]
  };

  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    var json = JSON.parse(response.getContentText());

    // Extract the text from the parts of the content
    var answer = json.candidates[0].content.parts[0].text;

    return answer;
  } catch (error) {
    Logger.log("Error: " + error.toString());
    return null;
  }
}

/**
 * GeminiQAFromImage
 * This function handles image analysis Q&A, converting the image to Base64 format before sending it to the Gemini API.
 * Functionality: Accepts a question and image URL and returns the parsed result through the API.
 */
function GeminiQAFromImage(question, image_url) {

  // Download the image
  var imageBlob = UrlFetchApp.fetch(image_url).getBlob();

  // Get the image's MIME type
  var mimeType = imageBlob.getContentType();

  // Convert the image to Base64
  var imageBase64 = Utilities.base64Encode(imageBlob.getBytes());

  // Construct the data for the API request
  var payload = {
    "contents": [
      {
        "parts": [
          {
            "text": question
          },
          {
            "inline_data": {
              "mime_type": mimeType,
              "data": imageBase64
            }
          }
        ]
      }
    ]
  };

  var modelName = getModelName(); // Get the model name
  var url = "https://generativelanguage.googleapis.com/v1beta/models/" + modelName + ":generateContent?key=" + apiKey;

  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    var json = JSON.parse(response.getContentText());

    // Extract the text from the parts of the content
    var answer = json.candidates[0].content.parts[0].text;

    return answer; // Return the string result
  } catch (error) {
    Logger.log("Error: " + error.toString());
    return null;
  }
}


/**
 * GeminiClassify
 * This function implements text classification, classifying the input text according to specified categories.
 * Functionality: Accepts a classification array and text content, and uses the Gemini API for classification.
 */
function GeminiClassify(class_array, content, extra_prompt = "") {

  // Combine class_array into a string
  var classString = class_array.join(", ");

  // Assemble the prompt
  var prompt = "Please classify the following content as: " + classString + ". Just tell me the classification, no explanation needed." + extra_prompt + ". Content: " + content;

  // Construct the data for the API request
  var payload = {
    "contents": [{
      "parts": [{
        "text": prompt
      }]
    }]
  };

  var modelName = getModelName(); // Get the model name
  var url = "https://generativelanguage.googleapis.com/v1beta/models/" + modelName + ":generateContent?key=" + apiKey;

  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    var json = JSON.parse(response.getContentText());
    Logger.log(json);
    // Extract the text from the parts of the content
    var classification = json.candidates[0].content.parts[0].text;

    return classification.replace(/\r?\n|\r/g, ''); // Return the classification result
    // return json; // Return the classification result
  } catch (error) {
    Logger.log("Error: " + error.toString());
    return "Error: " + error.toString();
  }
}

/**
 * GeminiVector001
 * This function generates a vector representation of text, suitable for scenarios requiring text similarity calculations.
 * Functionality: Accepts input text and uses the Gemini API to generate a corresponding vector.
 */
function GeminiVector001(input_value) {


  // Construct the API request data
  var payload = {
    "model": "models/embedding-001",
    "content": {
      "parts": [{
        "text": input_value
      }]
    }
  };

  var modelName = getModelName(); // Get the model name. Not used for embeddings but kept for consistency.
  var url = "https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent?key=" + apiKey;

  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    var json = JSON.parse(response.getContentText());

    // Check and extract the embedding values
    if (json.embedding && json.embedding.values) {
      // Convert the array to a single string
      var vectorString = json.embedding.values.join(", ");
      return vectorString;
    } else {
      return "Error: Unexpected API response format.";
    }
  } catch (error) {
    Logger.log("Error: " + error.toString());
    return "Error: " + error.toString();
  }
}


/**
 * GeminiVectorSimilarCalculate
 * This function calculates the similarity between two vectors and returns the similarity score.
 * Functionality: Accepts two vector strings and calculates their cosine similarity.
 */
function GeminiVectorSimilarCalculate(vector1_string, vector2_string) {
  // Convert strings to number arrays
  var vector1 = vector1_string.split(",").map(Number);
  var vector2 = vector2_string.split(",").map(Number);

  // Ensure both vectors have the same length
  if (vector1.length !== vector2.length) {
    return "Error: Vectors must have the same length.";
  }

  // Calculate cosine similarity
  var dotProduct = 0;
  var magnitude1 = 0;
  var magnitude2 = 0;

  for (var i = 0; i < vector1.length; i++) {
    dotProduct += vector1[i] * vector2[i];
    magnitude1 += vector1[i] * vector1[i];
    magnitude2 += vector2[i] * vector2[i];
  }

  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);

  if (magnitude1 === 0 || magnitude2 === 0) {
    return "Error: One of the vectors has zero magnitude.";
  }

  var similarity = dotProduct / (magnitude1 * magnitude2);
  return similarity; // Return the similarity result
}

/**
 * doGet
 * This function handles HTTP GET requests and performs queries, filtering, and pagination on data in the specified Google Sheet based on the incoming query parameters.
 *
 * Functionality Overview:
 * - Queries data based on the provided sheet name (`sheet_name`) and query mode (`query_mode`).
 * - Supports three query modes:
 *   - `normal`: Standard exact match query, filters data based on specified criteria, and returns matching results.
 *   - `rag`:  Performs an advanced query based on vector similarity in addition to the standard query. Generates a vector from `search_term` and compares it to vector data in a specified column. Filters the results based on the provided `threshold`, keeping only results with similarity greater than or equal to the threshold. After vector comparison, removes all vector-related fields.
 *   - `graph_rag`: Reserved mode, not yet implemented.
 * - Supports filtering data based on specified criteria (`filter_column`) using operators such as greater than, less than, equal to, etc.  In RAG mode, filtering is performed before vector comparison.
 * - Allows specifying fields to be excluded (`exclude_columns`), which will not be included in the returned results.  In RAG mode, fields containing "vector" are removed after filtering and vector comparison.
 * - Supports limiting the number of returned records (`query_item_limit`) and pagination (`page` and `pageSize`).
 * - Returns query results in JSON format and logs each request, including timestamp and query parameters.
 *
 * Query String Parameters:
 * - `sheet_name` (required): The name of the sheet to query.
 * - `query_mode` (optional): The query mode, supports `normal`, `rag`, and `graph_rag`. Defaults to `normal`.
 * - `exclude_columns` (optional):  A comma-separated list of column names to exclude (e.g., `colA,colB,colC`).
 * - `filter_column` (optional): Filter criteria, specified in the format "column_name[operator]value". Multiple criteria can be included, separated by commas.
 * - `page` (optional): Page number of the results to return. Defaults to 1.
 * - `page_size` (optional):  Number of records to return per page. Defaults to 10.
 * - `search_term` (required for `rag`): The search string for RAG mode, which will be converted into a vector for similarity comparison.
 * - `compare_vector_column` (required for `rag`): The column name to compare with the vector generated from `search_term`.
 * - `threshold` (optional for `rag`): The similarity threshold for filtering RAG mode results. Only results with similarity greater than or equal to this threshold are retained.
 *
 * Return Value:
 * - Results are returned in JSON format, containing the matching query results.
 * - In RAG mode, a new field "threshold" is included in the results, representing the similarity score.
 * - In the final RAG mode results, all vector-related fields are removed.
 *
 * Logging:
 * - Each request is logged in the format "timestamp=xxxxx&user_query=???"
 *
 * Main Logic:
 * 1. Parses query parameters and initializes variables.
 * 2. Retrieves all data from the specified Google Sheet.
 * 3. Applies different query logic based on the query mode (`normal` or `rag`).
 * 4. Filters data based on filter criteria. In RAG mode, general filtering is applied before vector similarity comparison.
 * 5. Applies similarity comparison and threshold filtering to RAG mode results, adding the similarity score to the results.
 * 6. Limits the number of returned results if `query_item_limit` is specified.
 * 7. Removes all vector-related fields after vector comparison in RAG mode.
 * 8. Applies pagination logic.
 * 9. Logs the request.
 * 10. Returns the results.
 */
function doGet(e) {
  // Parse query string parameters
  var sheetName = e.parameter.sheet_name;
  var excludeColumns = e.parameter.exclude_columns ? e.parameter.exclude_columns.split(",").map(col => col.toLowerCase().trim()) : [];
  var queryMode = e.parameter.query_mode ? e.parameter.query_mode.toLowerCase() : "normal";
  var page = e.parameter.page ? parseInt(e.parameter.page) : 1;
  var pageSize = e.parameter.page_size ? parseInt(e.parameter.page_size) : 10;

  Logger.log("Sheet Name: " + sheetName);
  Logger.log("Exclude Columns: " + excludeColumns);
  Logger.log("Query Mode: " + queryMode);
  Logger.log("Page: " + page + ", Page Size: " + pageSize);
  Logger.log(e.parameter);

  // Get the specified sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) {
    Logger.log("Error: Sheet not found.");
    return ContentService.createTextOutput("Error: Sheet not found.");
  }

  // Get header row
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  Logger.log("Headers: " + JSON.stringify(headers));

  // Calculate the data range to read
  var startRow = (page - 1) * pageSize + 2;
  var endRow = startRow + pageSize - 1;
  Logger.log("Start Row: " + startRow + ", End Row: " + endRow);


  // Ensure it doesn't exceed the total number of rows in the sheet
  var lastRow = sheet.getLastRow();
  Logger.log("Last Row in Sheet: " + lastRow);
  if (startRow > lastRow) {
    Logger.log("No Data: Returning Empty Array");
    return ContentService.createTextOutput(JSON.stringify([])).setMimeType(ContentService.MimeType.JSON);
  }

  if (endRow > lastRow) {
    endRow = lastRow;
  }


  // Get data range
  var dataRange = sheet.getRange(startRow, 1, endRow - startRow + 1, sheet.getLastColumn());
  var data = dataRange.getValues();
  Logger.log("Data Retrieved: " + JSON.stringify(data));

  // Get indices of columns to keep
  var validIndices = [];
  headers.forEach((header, index) => {
    var lowerHeader = header.toLowerCase().trim();
    // In RAG mode, don't remove columns containing "vector" immediately
    if (queryMode === "rag" || (!lowerHeader.includes("vector") && !excludeColumns.includes(lowerHeader))) {
      validIndices.push(index);
    }
  });
  Logger.log("Valid Indices: " + validIndices);

  // Parse all query strings as filter conditions
  var filters = parseQueryStringsAsFilters(e.parameter, headers);
  Logger.log("Filters: " + JSON.stringify(filters));

  var results = [];

  if (queryMode === "normal") {
    // Query logic for normal mode
    for (var i = 0; i < data.length; i++) {
      if (applyFilters(data[i], filters)) {
        let resultObject = {};
        validIndices.forEach(index => {
          const header = headers[index];
          if (!excludeColumns.includes(header.toLowerCase().trim())) {
            resultObject[header] = data[i][index];
          }
        });
        results.push(resultObject);
      }
    }
  } else if (queryMode === "rag") {
    // Query logic for RAG mode
    var searchTerm = e.parameter.search_term;
    var compareVectorColumn = e.parameter.compare_vector_column ? e.parameter.compare_vector_column.toLowerCase().trim() : null;
    var threshold = e.parameter.threshold ? parseFloat(e.parameter.threshold) : 0.7;

    if (!searchTerm || !compareVectorColumn) {
      return ContentService.createTextOutput("Error: Missing search_term or compare_vector_column for RAG mode.").setMimeType(ContentService.MimeType.JSON);
    }

    // Convert searchTerm to vector string
    var searchTermVector = GeminiVector001(searchTerm);
    Logger.log("Search Term Vector: " + searchTermVector);

    // Apply filter conditions first
    var filteredResults = [];
    for (var i = 0; i < data.length; i++) {
      if (applyFilters(data[i], filters)) {
        let resultObject = {};
        validIndices.forEach(index => {
          const header = headers[index];
          resultObject[header] = data[i][index];
        });
        filteredResults.push(resultObject);
      }
    }


    // Perform vector comparison on filtered results
    for (var i = 0; i < filteredResults.length; i++) {
      var resultObject = filteredResults[i];
      var vectorValue = resultObject[compareVectorColumn];

      var similarity = GeminiVectorSimilarCalculate(searchTermVector, vectorValue);
      Logger.log("Similarity: " + similarity);

      if (similarity >= threshold) {
        resultObject["threshold"] = similarity; // Add similarity score
        results.push(resultObject);
      }
    }

    // Remove vector-related fields after vector comparison
    results = results.map(result => {
      validIndices.forEach(index => {
        const header = headers[index];
        if (header.toLowerCase().trim().includes("vector") || excludeColumns.includes(header.toLowerCase().trim())) {
          delete result[header];
        }
      });
      return result;
    });

  } else if (queryMode === "graph_rag") {
    // TODO: Add query logic for graph_rag mode
  }


  Logger.log("Results: " + JSON.stringify(results));

  // Log the request
  var log = "timestamp=" + new Date().toISOString() + "&user_query=" + JSON.stringify(e.parameters);
  Logger.log("Log: " + log);

  saveLogToSheet("GET Data Log", log);


  // Return results, filtered result data is returned in JSON format
  return ContentService.createTextOutput(JSON.stringify(results)).setMimeType(ContentService.MimeType.JSON);
}

function parseQueryStringsAsFilters(params, headers) {
  var filters = [];
  var operators = ["<=", ">=", "<", ">", "=", "!="];

  for (var key in params) {
    if (params.hasOwnProperty(key) && key !== 'sheet_name' && key !== 'query_item_limit' && key !== 'exclude_column' && key !== 'page' && key !== 'pageSize') {
      var value = params[key].trim();
      var operatorFound = false;

      for (var i = 0; i < operators.length; i++) {
        var operator = operators[i];


        // Case 1: Operator is at the end of the key name
        if (key.endsWith(operator)) {
          var columnName = key.substring(0, key.length - operator.length).trim().toLowerCase();
          var filterValue = value;
          var index = headers.findIndex(header => header.toLowerCase() === columnName);
          if (index !== -1) {
            filters.push({ index: index, operator: operator, value: filterValue });
            operatorFound = true;
            break;
          }
        }


        // Case 2: Operator is at the beginning of the value
        if (value.startsWith(operator)) {
          var columnName = key.trim().toLowerCase();
          var filterValue = value.substring(operator.length).trim();
          var index = headers.findIndex(header => header.toLowerCase() === columnName);
          if (index !== -1) {
            filters.push({ index: index, operator: operator, value: filterValue });
            operatorFound = true;
            break;
          }
        }
      }

      // If no operator is found, assume equality condition
      if (!operatorFound) {
        var columnName = key.trim().toLowerCase();
        var filterValue = value;
        var index = headers.findIndex(header => header.toLowerCase() === columnName);
        if (index !== -1) {
          filters.push({ index: index, operator: "=", value: filterValue });
        }
      }
    }
  }


  Logger.log("Parsed Filters: " + JSON.stringify(filters));
  return filters;
}

// Apply filter conditions
function applyFilters(row, filters) {
  for (var i = 0; i < filters.length; i++) {
    var filter = filters[i];
    var cellValue = row[filter.index];

    switch (filter.operator) {
      case "<=":
        if (!(cellValue <= filter.value)) return false;
        break;
      case ">=":
        if (!(cellValue >= filter.value)) return false;
        break;
      case "<":
        if (!(cellValue < filter.value)) return false;
        break;
      case ">":
        if (!(cellValue > filter.value)) return false;
        break;
      case "=":
        if (!(cellValue == filter.value)) return false;
        break;
      case "!=":
        if (!(cellValue != filter.value)) return false;
        break;
    }
  }
  return true;
}


/**
 * doPost
 *
 * This function handles HTTP POST requests and performs different functions based on the provided parameters, including:
 * - Inserting JSON data from the request into a specified Google Sheet.
 * - Sending emails to multiple recipients based on provided email information.
 * - Downloading images from URLs and storing them in a specified Google Drive folder.
 * - Generating PDF files from a Google Docs template, replacing placeholders with provided parameters.
 *
 * Functionality Overview:
 * - Parses and processes JSON data from the POST request.
 * - Determines the function to execute based on the `function_name` parameter:
 *   - `insert_data`: Inserts data into a specified Google Sheet.
 *   - `mail_user`: Sends emails to specified recipients.
 *   - `store_image_to_drive`: Downloads and stores images from a URL to Google Drive.
 *     - If `folder_name` is provided, the image is stored in the specified folder.
 *     - If `folder_name` is not provided, the current Spreadsheet's name is used as the folder name.
 *   - `create_pdf_from_doc_template`: Generates a PDF file based on a Google Docs template, allowing for dynamic parameter replacement.
 *     - If `folder_name` is not provided, the parent folder of the template file is used.
 *     - If `pdf_file_name` is not provided, the current time and a random string are used for the file name.
 *     - If `template_doc_name` is not provided, "Document Template" is used as the default.
 *
 * POST Body Parameters:
 * - `function_name` (required): The name of the function to execute. Can be `insert_data`, `mail_user`, `store_image_to_drive`, or `create_pdf_from_doc_template`.
 * - When `function_name` is `create_pdf_from_doc_template`:
 *   - `template_doc_name` (optional): The name of the template document. Defaults to "Document Template".
 *   - `pdf_file_name` (optional): The name of the PDF file. If not specified, uses current time and a random string.
 *   - `folder_name` (optional): The name of the folder to store the PDF in. If not specified, uses the template's parent folder.
 *   - `replace_map` (required):  A key-value dictionary for replacing placeholders in the template.
 *
 * Return Value:
 * - JSON format with a `result` field indicating the success of the operation:
 *   - "success" indicates data insertion, email sending, or PDF generation was successful.
 *   - "failure" indicates the operation failed, including an `error` field describing the error message.
 *   - When executing `create_pdf_from_doc_template`, returns the link to the generated PDF file upon success.
 *
 * Logging:
 * - Each request is logged, including timestamp, request content, and operation result. The log is saved to a specified Google Sheet.
 */
function doPost(e) {
  try {
    // Parse JSON data from the POST request
    var requestBody = JSON.parse(e.postData.contents);
    Logger.log("Request Body: " + JSON.stringify(requestBody));


    // Check if the function_name parameter exists
    var functionName = requestBody.function_name;
    if (!functionName) {
      throw new Error("Missing function_name parameter.");
    }

    // Determine the function to execute based on the value of function_name
    if (functionName === "insert_data") {
      // Call the function to insert data
      return insertData(requestBody);
    } else if (functionName === "mail_user") {
      // Call the function to send email
      return mailUser(requestBody);
    } else if (functionName === "store_image_to_drive") {
      // Call the function to store image to Google Drive
      var folderName = requestBody.folder_name || SpreadsheetApp.getActiveSpreadsheet().getName();
      return storeImageToDrive(requestBody.image_url, folderName);
    } else if (functionName === "create_pdf_from_doc_template") {
      // Call the function to generate PDF
      var templateDocName = requestBody.template_doc_name;
      var pdfFileName = requestBody.pdf_file_name;
      var folderName = requestBody.folder_name;
      var replaceMap = requestBody.replace_map;

      // Check for required parameters
      if (!replaceMap) {
        throw new Error("Missing parameters for creating PDF.");
      }

      // Call the createPDFfromTemplate function to generate the PDF
      var result = createPDFfromDocTemplate(templateDocName, pdfFileName, replaceMap, folderName);
      return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
    } else {
      throw new Error("Invalid function_name: " + functionName);
    }

  } catch (error) {
    // Catch errors and log them
    Logger.log("Error: " + error.message);


    // Return a failure result
    return ContentService.createTextOutput(JSON.stringify({ result: "failure", error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * createPDFfromDocTemplate
 *
 * This function generates a PDF file based on a specified Google Docs template, replacing specified parameters within the template.
 *
 * Functionality:
 * - Generates a PDF file using a template document and performs content replacement based on the provided `replace_map`.
 * - If `template_doc_name` is not specified, defaults to "Document Template".
 * - If `folder_name` is not specified, uses the folder where the template file is located.
 * - If `pdf_file_name` is not specified, uses the current time and a random string for the file name; if specified, appends the user-specified name after the time.
 * - Returns the generated PDF link and file name.
 *
 * @param {string} templateDocName - The name of the Google Docs template.
 * @param {string} pdfFileName - The name of the generated PDF file.
 * @param {object} replaceMap - The replacement dictionary used to replace placeholders in the template.
 * @param {string} folderName - The name of the folder to store the generated PDF.
 * @returns {string} - A JSON string containing the generation result.  Includes the PDF link if successful, or an error message if failed.
 */
function createPDFfromDocTemplate(templateDocName, pdfFileName, replaceMap, folderName) {
  try {
    // If templateDocName is not specified, use "Document Template" as the default
    if (!templateDocName) {
      templateDocName = "Document Template";  // Or "文件範本" if you want to keep the original Chinese name
    }

    // Get the template file by name
    var files = DriveApp.getFilesByName(templateDocName);


    if (!files.hasNext()) {
      return JSON.stringify({
        "result": "failure",
        "message": "Template file not found."
      });
    }

    var templateFile = files.next();
    var templateDoc = DocumentApp.openById(templateFile.getId());

    // Copy the template file
    var copiedDoc = templateFile.makeCopy();
    var copiedDocId = copiedDoc.getId();
    var copiedDocFile = DocumentApp.openById(copiedDocId);


    // Make multiple content changes. replaceMap is an object used for multiple text replacements.
    var body = copiedDocFile.getBody();

    for (var key in replaceMap) {
      if (replaceMap.hasOwnProperty(key)) {
        body.replaceText("{{" + key + "}}", replaceMap[key]); // Replace the key in the template with the corresponding value
      }
    }

    // Save changes
    copiedDocFile.saveAndClose();

    // If folderName is not provided, use the folder where the template file is located.
    var targetFolder;
    if (!folderName) {
      targetFolder = templateFile.getParents().next(); // Use the template file's parent folder
    } else {
      // Find the specified folder by name
      var folders = DriveApp.getFoldersByName(folderName);


      if (!folders.hasNext()) {
        return JSON.stringify({
          "result": "failure",
          "message": "Specified folder not found."
        });
      }

      targetFolder = folders.next();
    }


    // Generate current timestamp, format: yyyymmddHHMMss
    var timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMddHHmmss");

    // Generate random string
    var randomString = Math.random().toString(36).substring(2, 8); // Generate 6-digit random string

    // If pdfFileName is not provided, use the current time and random code for naming; if provided, append it after the time
    if (!pdfFileName) {
      pdfFileName = timestamp + "-" + randomString;
    } else {
      pdfFileName = timestamp + "-" + pdfFileName;
    }


    // Convert the copied document to PDF
    var pdfBlob = DriveApp.getFileById(copiedDocId).getAs('application/pdf');

    // Save the PDF in the target folder, the file name is determined by the parameter
    var pdfFile = targetFolder.createFile(pdfBlob).setName(pdfFileName + '.pdf');


    // Set permissions to "Anyone with the link can view"
    pdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);


    // Delete the copied file
    DriveApp.getFileById(copiedDocId).setTrashed(true);


    // Get the web link of the PDF file
    var webLink = pdfFile.getUrl();


    // Return JSON result
    var result = {
      "result": "success",
      "fileName": pdfFileName + '.pdf',
      "fileLink": webLink,
      "message": "PDF generated and set to 'Anyone with the link can view'."
    };


    Logger.log(JSON.stringify(result)); // Can be used to check the result
    return JSON.stringify(result);

  } catch (error) {
    Logger.log("Error: " + error.message);
    return JSON.stringify({
      "result": "failure",
      "message": "An error occurred: " + error.message
    });
  }
}



// Store image to Google Drive. If no folder name is specified, use the current spreadsheet's name as the folder name.
function storeImageToDrive(imageUrl, folderName) {
  try {
    // 1. Check if the specified folder exists. If not, create it.
    var folders = DriveApp.getFoldersByName(folderName);
    var folder;
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderName);
    }

    // 2. Use UrlFetchApp to fetch the image
    var response = UrlFetchApp.fetch(imageUrl);
    var blob = response.getBlob();


    // 3. Save the image to the folder
    var fileName = "downloaded_image_" + new Date().getTime() + ".jpg"; // Use current time to generate a unique file name
    var file = folder.createFile(blob.setName(fileName));


    // 4. Return the URL of the image file
    Logger.log("Image saved successfully: " + file.getUrl());
    return ContentService.createTextOutput(JSON.stringify({ result: "success", image_url: file.getUrl() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ result: "failure", error: "Failed to fetch or save image." }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Insert data function
function insertData(requestBody) {
  var sheetName = requestBody.sheet_name;
  if (!sheetName) {
    throw new Error("Missing sheet_name parameter.");
  }

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);


  // If the sheet doesn't exist, create a new one
  if (!sheet) {
    Logger.log("Sheet not found: " + sheetName + ". Creating a new sheet.");
    sheet = spreadsheet.insertSheet(sheetName);

    // Generate the header row based on the keys in requestBody
    var headers = Object.keys(requestBody);
    sheet.appendRow(headers);
  }

  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  Logger.log("Headers: " + JSON.stringify(headers));

  var newRow = [];
  for (var i = 0; i < headers.length; i++) {
    var header = headers[i];
    var lowerHeader = header.toLowerCase().trim();
    var matchedKey = Object.keys(requestBody).find(key => lowerHeader.includes(key.toLowerCase().trim()));
    var value = matchedKey ? requestBody[matchedKey] : undefined;

    if (value === undefined) {
      newRow.push('');
    } else if (lowerHeader.includes("vector") && matchedKey) {
      var vector = GeminiVector001(value);
      Logger.log("Generated Vector for " + matchedKey + ": " + vector);
      newRow.push(vector);
    } else {
      newRow.push(value);
    }
  }

  sheet.appendRow(newRow);
  Logger.log("Data inserted successfully into sheet: " + sheetName);


  var log = "timestamp=" + new Date().toISOString() + "&user_payload=" + JSON.stringify(requestBody);
  Logger.log("Log: " + log);
  saveLogToSheet("POST Data Log", log);

  return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}


// Send email function
function mailUser(requestBody) {
  var senderEmails = requestBody.sender_emails;
  var emailSubject = requestBody.email_subject || "Email Subject: " + new Date().toLocaleString(); // Default to current date and time
  var emailContent = requestBody.email_content;

  if (!senderEmails || senderEmails.length === 0) {
    throw new Error("Missing sender_emails parameter.");
  }

  // Send emails
  for (var i = 0; i < senderEmails.length; i++) {
    var recipient = senderEmails[i];
    MailApp.sendEmail({
      to: recipient,
      subject: emailSubject,
      htmlBody: emailContent
    });
    Logger.log("Email sent to: " + recipient);
  }


  var log = "timestamp=" + new Date().toISOString() + "&email_sent_to=" + JSON.stringify(senderEmails);
  Logger.log("Log: " + log);
  saveLogToSheet("Email Log", log);


  return ContentService.createTextOutput(JSON.stringify({ result: "email_sent_success" }))
    .setMimeType(ContentService.MimeType.JSON);
}



// Log data to the specified sheet
function saveLogToSheet(sheetName, log) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(sheetName);
  }
  sheet.appendRow([new Date(), log]);
}



// Gemini with Webscraper
// https://apify.com/store



// Gemini with Function tool
function GeminiQAWithWeb(user_question) {

  var modelName = getModelName(); // Get the model name
  var url = "https://generativelanguage.googleapis.com/v1beta/models/" + modelName + ":generateContent?key=" + apiKey;


  Logger.log("Sending request to Gemini API, Question: " + user_question);

  var payload = {
    "contents": [
      {
        "role": "user",
        "parts": [
          {
            "text": user_question
          }
        ]
      }
    ],
    "tools": [
      {
        "function_declarations": [
          {
            "name": "GeminiFetchUrl",
            "description": "Sends an HTTP request to a specified URL with various options for method, headers, and payload, and includes the user's original question.",
            "parameters": {
              "type": "object",
              "properties": {
                "url": {
                  "type": "string",
                  "description": "The URL to send the request to."
                },
                "user_question": {
                  "type": "string",
                  "description": "The question intent from the question."
                },
                "method": {
                  "type": "string",
                  "description": "The HTTP method to use, e.g., GET, POST, PUT, DELETE.",
                  "enum": ["get", "delete", "patch", "post", "put"]
                },
                "headers": {
                  "type": "object",
                  "description": "Optional HTTP headers to include in the request.",
                  "properties": {
                    "Content-Type": {
                      "type": "string",
                      "description": "The MIME type of the body of the request, e.g., application/json."
                    },
                    "Authorization": {
                      "type": "string",
                      "description": "Optional authorization token for the request."
                    },
                    "Custom-Header": {
                      "type": "string",
                      "description": "A custom header that you may want to add to the request."
                    }
                  }
                },
                "payload": {
                  "type": "string",
                  "description": "Optional data to send with the request, typically used for POST or PUT requests. This should be a JSON string, a URL-encoded form data string, or another format depending on the Content-Type."
                },
                "contentType": {
                  "type": "string",
                  "description": "The content type of the payload, e.g., application/json, application/x-www-form-urlencoded."
                },
                "muteHttpExceptions": {
                  "type": "boolean",
                  "description": "Whether to prevent exceptions from being thrown on HTTP errors (status codes 4xx or 5xx)."
                },
                "followRedirects": {
                  "type": "boolean",
                  "description": "Whether to automatically follow HTTP redirects (3xx responses). Defaults to true."
                },
                "validateHttpsCertificates": {
                  "type": "boolean",
                  "description": "Whether to validate HTTPS certificates. Defaults to true."
                }
              },
              "required": ["url", "user_question"]
            }
          }
        ]
      }
    ]
  };
  Logger.log("Payload being sent: " + JSON.stringify(payload, null, 2));

  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

  var response = UrlFetchApp.fetch(url, options);
  Logger.log("Initial Response Received: " + response.getContentText());

  var jsonResponse = JSON.parse(response.getContentText());


  // Parse and process the response
  var finalResult = parseGeminiResponse(jsonResponse);
  Logger.log("Final Result: " + finalResult);

  return finalResult;

}


/**
 * Parses the Gemini response and performs the corresponding actions
 */
function parseGeminiResponse(response) {
  Logger.log("Parsing Response: " + JSON.stringify(response, null, 2));

  if (response.candidates && response.candidates.length > 0) {
    var candidate = response.candidates[0];

    // Check if it's a function call
    if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
      var part = candidate.content.parts[0];
      if (part.functionCall) {
        Logger.log("Function call detected: " + part.functionCall.name);
        var functionName = part.functionCall.name;
        var argsString = part.functionCall.args;

        try {
          var args = JSON.parse(argsString);
        } catch (e) {
          Logger.log("Error parsing function arguments: " + e);
          return "Error parsing function arguments: " + e;
        }

        Logger.log(functionName + " args are: " + JSON.stringify(args));
        // Call the corresponding function
        return executeFunctionCall(functionName, args);
      } else if (part.text) {
        // If it's a regular text response
        Logger.log("Received regular text response");
        return part.text;
      }
    }
  }

  Logger.log("Failed to parse Gemini response");
  return "Failed to parse Gemini response";
}



/**
 * Dispatches the appropriate function based on the function call
 */
function executeFunctionCall(functionName, args) {
  Logger.log("Executing function: " + functionName + ", Arguments: " + JSON.stringify(args, null, 2));

  if (functionName === "GeminiFetchUrl") {
    return GeminiFetchUrl(args);
  } else {
    Logger.log("Undefined function name: " + functionName);
    return "Undefined function name: " + functionName;
  }
}


/**
 * Executes the function to fetch web page content
 */
function GeminiFetchUrl(args) {
  Utilities.sleep(2000); // Pause for 2 seconds to avoid overwhelming the API

  Logger.log("Fetching web page content, URL: " + args.url);


  var url = args.url;
  var method = args.method || "get";
  var headers = args.headers || {};
  var payload = args.payload || null;
  var contentType = args.contentType || "application/json";
  var muteHttpExceptions = args.muteHttpExceptions || false;
  var followRedirects = args.followRedirects !== undefined ? args.followRedirects : true;
  var validateHttpsCertificates = args.validateHttpsCertificates !== undefined ? args.validateHttpsCertificates : true;
  var user_question = args.user_question;


  var options = {
    "method": method,
    "headers": headers,
    "payload": payload,
    "contentType": contentType,
    "muteHttpExceptions": muteHttpExceptions,
    "followRedirects": followRedirects,
    "validateHttpsCertificates": validateHttpsCertificates
  };


  Logger.log("Fetch URL Options: " + JSON.stringify(options, null, 2));

  var response = UrlFetchApp.fetch(url, options);
  var content = response.getContentText();
  Logger.log("Fetched Content: " + content);

  // Send the fetched content and user question back to Gemini
  return sendFinalRequestToGemini(user_question, content);
}

/**
 * Sends the user question and fetched data back to Gemini to get the final answer
 */
function sendFinalRequestToGemini(user_question, fetchedData) {
  var modelName = getModelName(); // Get the model name
  var url = "https://generativelanguage.googleapis.com/v1beta/models/" + modelName + ":generateContent?key=" + apiKey;

  var payload = {
    "contents": [{
      "parts": [{
        "text": user_question + ". Fetched content is as follows: " + fetchedData
      }]
    }]
  };

  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };


  Logger.log("Final Request Payload: " + JSON.stringify(payload, null, 2));

  var response = UrlFetchApp.fetch(url, options);
  var finalResponse = JSON.parse(response.getContentText());


  Logger.log("Final Response: " + JSON.stringify(finalResponse, null, 2));
  var finalResult = finalResponse.candidates[0].content.parts[0].text;
  return finalResult;
}




function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
    .addItem('Tutorial', 'showTeachingModal')
    .addToUi();
}

function showTeachingModal() {
  var htmlContent = `
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; margin: 20px; }
      h1, h2, h3 { color: #4CAF50; }
      p { line-height: 1.6; }
      a { color: #1E90FF; text-decoration: none; }
    </style>
  </head>
  <body>
    <h1>View Full Tutorial</h1>
    <p>Click the button below to view the complete tutorial document and all its features in a new window:</p>
    <a href="https://github.com/cxcxc-io/ai-agent_with_sheet/blob/main/README.md" target="_blank">
      <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; cursor: pointer;">Open GitHub Tutorial in New Window</button>
    </a>
  </body>
  </html>
  `;

  var htmlOutput = HtmlService.createHtmlOutput(htmlContent)
    .setWidth(400)
    .setHeight(200);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Tutorial');
}