import { simpleParser } from "mailparser";
import { asyncHandler } from "../utils/asynchandler";
import { ApiRespone } from "../utils/Apirespones.js";

const Emailparser = asyncHandler(async (req, res) => {
  const { rawEmail, header } = req.body;

  if (!rawEmail && !header) {
    return res.status(400).json({ error: "Raw email or headers are required" });
  }

  try {
    // Parse email safely
    const parsed = rawEmail
      ? await simpleParser(rawEmail)
      : await simpleParser(header);

    const headers = parsed.headers;

    if (!headers) {
      return res.status(400).json({ error: "Failed to parse email headers" });
    }

  const from = headers.get("from") || "unknown";
  const subject = headers.get("subject") || "unknown";
  const returnPath = headers.get("return-path") || "unknown";

  const authResults =
    headers.get("authentication-results") ||
    headers.get("authentication-result") ||
    "";

  const spf = authResults.includes("spf=pass")
    ? "pass"
    : authResults.includes("spf=fail")
    ? "fail"
    : "unknown";

  const dkim = authResults.includes("dkim=pass")
    ? "pass"
    : authResults.includes("dkim=fail")
    ? "fail"
    : "unknown";

  const dmarc = authResults.includes("dmarc=pass")
    ? "pass"
    : authResults.includes("dmarc=fail")
    ? "fail"
    : "unknown";

  // Scoring
  let score = 0;
  if (spf === "fail") score += 40;
  if (dkim === "fail") score += 40;
  if (dmarc === "fail") score += 40;

  const result = {
    from,
    subject,
    returnPath,
    authentication: { spf, dkim, dmarc },
    spoofingScore: score
  };
  return res
    .status(200)
    .json(new ApiRespone(200, result, "Email analyzed successfully"));
  } catch (error) {
    return res.status(400).json({ 
      error: "Failed to parse email", 
      details: error.message 
    });
  }
});

export default Emailparser;
