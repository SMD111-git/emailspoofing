const mitreAttackTechniques = {
    'T1566.001': 'Phishing: Spearphishing Attachment',
    'T1566.002': 'Phishing: Spearphishing Link',
    'T1598.002': 'Phishing for Information: Spearphishing Attachment',
    'T1598.003': 'Phishing for Information: Spearphishing Link'
};

const analyzeMitreAttack = (req, res, next) => {
    try {
        const { body, headers, from, to } = req.body;
        
        const threats = [];
        
        // Check for suspicious attachments
        if (req.body.attachments && req.body.attachments.length > 0) {
            threats.push({
                technique: 'T1566.001',
                description: mitreAttackTechniques['T1566.001'],
                severity: 'high',
                details: 'Email contains attachments that could be malicious'
            });
        }
        
        // Check for suspicious links in email body
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const urls = body?.match(urlRegex);
        if (urls && urls.length > 0) {
            threats.push({
                technique: 'T1566.002',
                description: mitreAttackTechniques['T1566.002'],
                severity: 'medium',
                details: `Email contains ${urls.length} link(s)`
            });
        }
        
        // Check for spoofed sender
        if (from && headers?.from && from !== headers.from) {
            threats.push({
                technique: 'T1598.003',
                description: mitreAttackTechniques['T1598.003'],
                severity: 'critical',
                details: 'Sender address appears to be spoofed'
            });
        }
        
        req.mitreAnalysis = {
            threats,
            riskLevel: threats.length > 0 ? 'high' : 'low',
            timestamp: new Date().toISOString()
        };
        
        next();
    } catch (error) {
        console.error('MITRE ATT&CK analysis error:', error);
        next(error);
    }
};

export { analyzeMitreAttack, mitreAttackTechniques };