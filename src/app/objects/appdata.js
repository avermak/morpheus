export default {
  platforms: [
    {id: "p0001", type: "platform", name: "Authorizations", keywords: ["cas", "amp"]},
    {id: "p0002", type: "platform", name: "americanexpress.com", keywords: ["web", "myca"]},
    {id: "p0003", type: "platform", name: "Mobile", keywords: ["app", "ios", "android"]},
    {id: "p0004", type: "platform", name: "Acquisition", keywords: ["go2", "onboarding", "gna"]},
    {id: "p0005", type: "platform", name: "Servicing", keywords: ["isp", "ccp", "gsp", "csp"]},
  ],
  applications: [
    {id: "60000001", type: "application", name: "Global Servicing Portal", keywords: ["gsp", "isp"]},
    {id: "60000002", type: "application", name: "MYCA", keywords: ["myca", "web"]},
    {id: "60000003", type: "application", name: "Online Disputes", keywords: ["myca", "web", "disputes"]},
    {id: "60000004", type: "application", name: "RTF", keywords: ["reliable transaction framework", "Message"]},
    {id: "60000005", type: "application", name: "ECM", keywords: ["enterprise configuration management", "config"]},
  ],
  journeys: [
    {id: "j0001", type: "journey", name: "I want to track my balance", keywords: ["statement"]},
    {id: "j0002", type: "journey", name: "I want to pay my bill", keywords: ["payment", "statement"]},
    {id: "j0003", type: "journey", name: "I want to dispute a charge", keywords: ["issue", "claim"]},
    {id: "j0004", type: "journey", name: "I want to be authenticated", keywords: ["identity", "security"]},
    {id: "j0005", type: "journey", name: "I want to fund my checking account", keywords: ["banking", "savings"]},
  ],
};

