# Quick Start Guide - Testing in Postman

## Server Status
✅ Server is running on: `http://localhost:8000`

## Method 1: Import Postman Collection (Recommended)

1. Open Postman
2. Click **Import** button (top left)
3. Select the file: `Email-Spoofing-Detection.postman_collection.json`
4. Click **Import**
5. You'll see a collection with 8 pre-configured test requests

## Method 2: Manual Testing

### Test 1: Health Check
```
GET http://localhost:8000/health
```

### Test 2: Analyze Legitimate Email (Score: 0)
```
POST http://localhost:8000/api/v1/email/emailchecking
Content-Type: application/json

{
  "rawEmail": "From: legitimate@company.com\nTo: recipient@example.com\nSubject: Official Communication\nReturn-Path: <legitimate@company.com>\nAuthentication-Results: spf=pass dkim=pass dmarc=pass\n\nThis is a legitimate email."
}
```

### Test 3: Analyze Suspicious Email (Score: 40)
```
POST http://localhost:8000/api/v1/email/emailchecking
Content-Type: application/json

{
  "rawEmail": "From: sender@company.com\nTo: recipient@example.com\nSubject: Suspicious Email\nReturn-Path: <different@domain.com>\nAuthentication-Results: spf=fail dkim=pass dmarc=pass\n\nThis email failed SPF check."
}
```

### Test 4: Analyze High-Risk Email (Score: 120)
```
POST http://localhost:8000/api/v1/email/emailchecking
Content-Type: application/json

{
  "rawEmail": "From: admin@company.com\nTo: victim@example.com\nSubject: URGENT: Reset Your Password\nReturn-Path: <phishing@malicious.com>\nAuthentication-Results: spf=fail dkim=fail dmarc=fail\n\nYour account will be suspended!"
}
```

### Test 5: Test Error Handling
```
POST http://localhost:8000/api/v1/email/emailchecking
Content-Type: application/json

{
  "wrongField": "value"
}
```

## Understanding the Response

### Success Response
```json
{
  "statusCode": 200,
  "data": {
    "from": "sender@example.com",
    "subject": "Email subject",
    "returnPath": "return-path",
    "authentication": {
      "spf": "pass",
      "dkim": "pass",
      "dmarc": "pass"
    },
    "spoofingScore": 0
  },
  "message": "Email analyzed successfully",
  "success": true
}
```

### Spoofing Score Guide
- **0 points**: ✅ Legitimate (all checks passed)
- **40 points**: ⚠️ Low risk (1 check failed)
- **80 points**: ⚠️ Medium risk (2 checks failed)  
- **120 points**: 🚨 High risk (all checks failed)

## Postman Setup Steps

1. Open Postman
2. Create new request or import collection
3. Set method to **POST**
4. URL: `http://localhost:8000/api/v1/email/emailchecking`
5. Go to **Headers** tab, add:
   - Key: `Content-Type`
   - Value: `application/json`
6. Go to **Body** tab
7. Select **raw**
8. Choose **JSON** format
9. Paste test data
10. Click **Send**

## Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/health` | Health check |
| POST | `/api/v1/email/emailchecking` | Analyze email |

## Tips

- The server auto-restarts on file changes (nodemon)
- Check console for logs
{
  "rawEmail": "From: admin@bank.com\nTo: victim@example.com\nSubject: URGENT: Reset Password\nReturn-Path: <phisher@malicious.com>\nAuthentication-Results: spf=fail dkim=fail dmarc=fail\n\nClick here immediately!"
}
- Use the provided Postman collection for quick testing
- Test with different email scenarios to see scoring

## Need Help?

- Check `README.md` for full documentation
- View server logs in the terminal
- Ensure server is running before testing
