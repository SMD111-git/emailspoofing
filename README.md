# Email Spoofing Detection API

A production-ready API to detect email spoofing attempts by analyzing email headers and authentication results (SPF, DKIM, DMARC).

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
# Copy .env.example to .env
cp .env.example .env
```

3. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:8000`

## 📋 API Endpoints

### Health Check
- **GET** `/health`
- Returns server status

### Email Analysis
- **POST** `/api/v1/email/emailchecking`
- Analyzes email for spoofing indicators

## 🧪 Testing with Postman

### 1. Health Check Test
**Request:**
```
GET http://localhost:8000/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-01-27T12:00:00.000Z"
}
```

### 2. Email Analysis Test

**Request:**
```
POST http://localhost:8000/api/v1/email/emailchecking
Content-Type: application/json
```

**Body (Option 1 - Raw Email):**
```json
{
  "rawEmail": "From: sender@example.com\nTo: recipient@example.com\nSubject: Test Email\nReturn-Path: <sender@example.com>\nAuthentication-Results: spf=pass dkim=pass dmarc=pass\n\nThis is a test email body."
}
```

**Body (Option 2 - Header Only):**
```json
{
  "header": "From: sender@example.com\nTo: recipient@example.com\nSubject: Suspicious Email\nReturn-Path: <different@domain.com>\nAuthentication-Results: spf=fail dkim=fail dmarc=fail\n\n"
}
```

**Expected Response:**
```json
{
  "statusCode": 200,
  "data": {
    "from": {
      "value": [
        {
          "address": "sender@example.com",
          "name": ""
        }
      ],
      "html": "<span class=\"mp_address_group\"><a href=\"mailto:sender@example.com\" class=\"mp_address_email\">sender@example.com</a></span>",
      "text": "sender@example.com"
    },
    "subject": "Test Email",
    "returnPath": "<sender@example.com>",
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

### 3. Test Cases

#### Legitimate Email (Score: 0)
```json
{
  "rawEmail": "From: legitimate@company.com\nSubject: Official Communication\nReturn-Path: <legitimate@company.com>\nAuthentication-Results: spf=pass dkim=pass dmarc=pass\n\nThis is a legitimate email."
}
```

#### Suspicious Email (Score: 40)
```json
{
  "rawEmail": "From: fake@company.com\nSubject: Urgent Action Required\nReturn-Path: <different@suspicious.com>\nAuthentication-Results: spf=fail dkim=pass dmarc=pass\n\nClick here immediately!"
}
```

#### High-Risk Email (Score: 120)
```json
{
  "rawEmail": "From: admin@company.com\nSubject: Reset Your Password\nReturn-Path: <phishing@malicious.com>\nAuthentication-Results: spf=fail dkim=fail dmarc=fail\n\nYour account will be suspended."
}
```

## 📊 Spoofing Score Interpretation

- **0**: Legitimate (All checks passed)
- **40**: Low Risk (One authentication failure)
- **80**: Medium Risk (Two authentication failures)
- **120**: High Risk (All authentication checks failed)

## 🔒 Authentication Checks

- **SPF** (Sender Policy Framework): Verifies sender's IP address
- **DKIM** (DomainKeys Identified Mail): Validates email signature
- **DMARC** (Domain-based Message Authentication): Policy enforcement

## 📝 Response Structure

```json
{
  "statusCode": 200,
  "data": {
    "from": "sender@example.com",
    "subject": "Email subject",
    "returnPath": "return-path@example.com",
    "authentication": {
      "spf": "pass|fail|unknown",
      "dkim": "pass|fail|unknown",
      "dmarc": "pass|fail|unknown"
    },
    "spoofingScore": 0
  },
  "message": "Email analyzed successfully",
  "success": true
}
```

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "error": "Raw email or headers are required"
}
```

### 400 Parse Error
```json
{
  "error": "Failed to parse email",
  "details": "Error message details"
}
```

## 🛠️ Development

### Project Structure
```
emailspoofing/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── index.js               # Server entry point
│   ├── constant.js            # Constants
│   ├── controllers/
│   │   └── Emailparser.js     # Email parsing controller
│   ├── middlewares/
│   │   └── Mitreattack.js     # MITRE ATT&CK analysis
│   ├── routes/
│   │   └── Email.route.js     # API routes
│   └── utils/
│       ├── asynchandler.js    # Async error handler
│       ├── Apirespones.js     # API response wrapper
│       └── Apierror.js        # API error handler
├── .env                       # Environment variables
├── package.json
└── README.md
```

## 🌐 Environment Variables

```env
PORT=8000
CORS_ORIGIN=*
NODE_ENV=development
```

## 📚 Technologies Used

- **Express.js** - Web framework
- **mailparser** - Email parsing library
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

ISC

## 👨‍💻 Author

Created for email security analysis and spoofing detection.
