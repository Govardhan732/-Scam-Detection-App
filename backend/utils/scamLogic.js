function detectScam(text) {
  let score = 0;
  let reasons = [];
  let category = "General";

  const lower = text.toLowerCase();

  const rules = [
    {
      keywords: ["urgent", "immediately"],
      weight: 20,
      reason: "Creates urgency pressure"
    },
    {
      keywords: ["send money", "advance payment", "money"],
      weight: 40,
      reason: "Requests financial transaction",
      category: "Payment Scam"
    },
    {
      keywords: ["lottery", "winner"],
      weight: 30,
      reason: "Promises unrealistic rewards",
      category: "Lottery Scam"
    },
    {
      keywords: ["click link", "verify account"],
      weight: 20,
      reason: "Contains suspicious links",
      category: "Phishing"
    }
  ];

  rules.forEach(rule => {
    rule.keywords.forEach(word => {
      if (lower.includes(word)) {
        score += rule.weight;
        reasons.push(rule.reason);
        if (rule.category) category = rule.category;
      }
    });
  });

  if (score > 100) score = 100;

  let risk = "Low";
  if (score >= 60) risk = "High";
  else if (score >= 30) risk = "Medium";

  return {
    score: score,
    risk: risk,
    category: category,
    reasons: reasons,
    scamPercent: score,
    safePercent: 100 - score
  };
}

module.exports = detectScam;