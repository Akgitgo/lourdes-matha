# Google Sheets Integration Setup Guide

Follow these steps to connect your contact form to a Google Sheet.

## 1. Create a Google Sheet
1.  Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2.  Name it "Grace Garden Enquiries" (or any name you prefer).
3.  In the first row, add the following headers (exact spelling matters):
    *   **A1**: `timestamp`
    *   **B1**: `fullName`
    *   **C1**: `phone`
    *   **D1**: `relation`
    *   **E1**: `callbackTime`

## 2. Create the Apps Script
1.  In your Google Sheet, click on **Extensions** > **Apps Script**.
2.  Delete any code in the `Code.gs` file and paste the following script:

```javascript
const SHEET_NAME = "Sheet1"; // Make sure this matches your sheet tab name

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName(SHEET_NAME);

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    const data = JSON.parse(e.postData.contents);
    const newRow = headers.map(function(header) {
      if (header === 'timestamp') {
        return new Date();
      }
      return data[header];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}
```

3.  Click the **Save** icon (floppy disk).

## 3. Deploy the Script
1.  Click on the **Deploy** button (top right) > **New deployment**.
2.  Click the **Select type** (gear icon) > **Web app**.
3.  Fill in the details:
    *   **Description**: Contact Form API
    *   **Execute as**: Me (your email)
    *   **Who has access**: **Anyone** (This is crucial for the form to work without login)
4.  Click **Deploy**.
5.  You might be asked to authorize the script. Click **Review permissions**, choose your account, click **Advanced**, and then **Go to (Script Name) (unsafe)** (it is safe, it's your own script).
6.  Copy the **Web app URL** generated (it starts with `https://script.google.com/macros/s/...`).

## 4. Update Your Code
1.  Open `src/components/ContactForm.tsx`.
2.  Find the line:
    ```typescript
    const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
    ```
3.  Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your copied Web App URL.

## 5. Test It
1.  Go to your website's contact section.
2.  Fill out the form and submit.
3.  Check your Google Sheet to see the new row added!
