const fs = require('fs');
const path = require('path');

const structure = {
  "Get Started": {
    dir: "Get-Started",
    files: [
      { name: "introduction", title: "Introduction", desc: "Introduction to Prov AI, our Generative BI platform." },
      { name: "quick-start", title: "Quick Start", desc: "Get up and running with Prov AI." },
      { name: "key-concepts", title: "Key Concepts", desc: "Learn the core concepts of Prov AI." },
      { name: "architecture-overview", title: "Architecture Overview", desc: "System overview diagram and architecture." }
    ]
  },
  "Core Concepts": {
    dir: "Core-Concepts",
    files: [
      { name: "generative-bi", title: "Generative BI", desc: "Fundamentals of Generative BI." },
      { name: "natural-language-query", title: "Natural Language Query", desc: "Text to SQL concepts." },
      { name: "semantic-layer", title: "Semantic Layer", desc: "Understanding the semantic layer." },
      { name: "ai-query-engine", title: "AI Query Engine", desc: "How the AI query engine processes prompts." },
      { name: "conversational-analytics", title: "Conversational Analytics", desc: "Context handling and metrics standardization." }
    ]
  },
  "Data Hub": {
    dir: "Data-Hub",
    files: [
      { name: "data-sources", title: "Data Sources", desc: "Connecting your databases." },
      { name: "connectors", title: "Connectors", desc: "Supported data connectors." },
      { name: "schema-mapping", title: "Schema Mapping", desc: "Map schemas for the semantic layer." },
      { name: "table-explorer", title: "Table Explorer", desc: "Explore database tables." },
      { name: "data-preview", title: "Data Preview", desc: "Preview data before modeling." }
    ]
  },
  "Semantic Modeling": {
    dir: "Semantic-Modeling",
    files: [
      { name: "overview", title: "Overview", desc: "Semantic layer overview." },
      { name: "dimensions-measures", title: "Dimensions & Measures", desc: "Define dimensions and measures." },
      { name: "metrics-library", title: "Metrics Library", desc: "Build a standardized metrics library." },
      { name: "relationships-joins", title: "Relationships & Joins", desc: "Configure table relationships." },
      { name: "calculated-fields", title: "Calculated Fields", desc: "Create new calculated fields." }
    ]
  },
  "AI Analyst": {
    dir: "AI-Analyst",
    files: [
      { name: "chat-interface", title: "Chat Interface", desc: "Interact with the AI Analyst." },
      { name: "query-examples", title: "Query Examples", desc: "Example questions to ask." },
      { name: "follow-up-queries", title: "Follow-up Queries", desc: "Drill down with follow-ups." },
      { name: "explain-sql", title: "Explain SQL", desc: "AI explanation of generated SQL." },
      { name: "prompt-guidelines", title: "Prompt Guidelines", desc: "How to write good prompts." }
    ]
  },
  "Insights": {
    dir: "Insights",
    files: [
      { name: "generated-insights", title: "Generated Insights", desc: "Automatic insights generation." },
      { name: "visualizations", title: "Visualizations", desc: "Chart rendering and capabilities." },
      { name: "dashboards", title: "Dashboards", desc: "Build responsive dashboards." },
      { name: "reports", title: "Reports", desc: "Generate text and data reports." },
      { name: "storytelling", title: "Storytelling", desc: "Data storytelling experiences." }
    ]
  },
  "Dashboard Builder": {
    dir: "Dashboard-Builder",
    files: [
      { name: "ai-dashboard-generation", title: "AI Dashboard Generation", desc: "Auto-generate dashboards from queries." },
      { name: "manual-editing", title: "Manual Editing", desc: "Fine-tune and edit layouts manually." },
      { name: "chart-controls", title: "Chart Controls", desc: "Customize visualizations." },
      { name: "filters-drilldowns", title: "Filters & Drilldowns", desc: "Add interactivity to dashboards." }
    ]
  },
  "Automation & Monitoring": {
    dir: "Automation-Monitoring",
    files: [
      { name: "scheduled-reports", title: "Scheduled Reports", desc: "Automate daily or weekly reports." },
      { name: "alerts", title: "Alerts", desc: "Trigger alerts based on metric anomalies." },
      { name: "anomaly-detection", title: "Anomaly Detection", desc: "AI-driven anomaly detection." },
      { name: "data-freshness", title: "Data Freshness", desc: "Monitor pipeline delays and data SLA." }
    ]
  },
  "Admin & Governance": {
    dir: "Admin-Governance",
    files: [
      { name: "roles-permissions", title: "Roles & Permissions", desc: "RBAC setup." },
      { name: "row-level-security", title: "Row Level Security", desc: "Enforce RLS policies for different users." },
      { name: "audit-logs", title: "Audit Logs", desc: "View system audit trails." },
      { name: "usage-analytics", title: "Usage Analytics", desc: "Track query volume and user adoption." },
      { name: "compliance", title: "Compliance", desc: "Data residency and security compliance." }
    ]
  },
  "Integrations": {
    dir: "Integrations",
    files: [
      { name: "api-overview", title: "API Overview", desc: "Integration API docs." },
      { name: "embedding", title: "Embedding", desc: "Embed dashboards in your own app." },
      { name: "sdk-guide", title: "SDK Guide", desc: "Client SDKs." },
      { name: "slack-integration", title: "Slack Integration", desc: "Ask questions in Slack." },
      { name: "email-reports", title: "Email Reports", desc: "Configure SMTP for email delivery." }
    ]
  },
  "Advanced Configuration": {
    dir: "Advanced-Configuration",
    files: [
      { name: "llm-settings", title: "LLM Settings", desc: "BYOK or configure open-source LLMs." },
      { name: "prompt-templates", title: "Prompt Templates", desc: "Modify system prompt templates." },
      { name: "custom-agents", title: "Custom Agents", desc: "Define specialized agents." },
      { name: "query-limits", title: "Query Limits", desc: "Rate limiting and circuit breakers." },
      { name: "performance-tuning", title: "Performance Tuning", desc: "Optimize semantic searches." }
    ]
  },
  "User Guides": {
    dir: "User-Guides",
    files: [
      { name: "business-users", title: "Business Users", desc: "Guide for non-technical users." },
      { name: "data-analysts", title: "Data Analysts", desc: "Guide for data analysts." },
      { name: "product-managers", title: "Product Managers", desc: "Guide for PMs tracking KPIs." },
      { name: "executives", title: "Executives", desc: "High-level dashboards for executives." }
    ]
  },
  "Use Cases": {
    dir: "Use-Cases",
    files: [
      { name: "sales-analytics", title: "Sales Analytics", desc: "Sales pipeline and forecasting." },
      { name: "marketing-analytics", title: "Marketing Analytics", desc: "Marketing ROI tracking." },
      { name: "finance", title: "Finance", desc: "Financial planning and analysis." },
      { name: "operations", title: "Operations", desc: "Supply chain and ops metrics." },
      { name: "customer-analytics", title: "Customer Analytics", desc: "Churn and retention analysis." }
    ]
  },
  "Tutorials": {
    dir: "Tutorials",
    files: [
      { name: "build-first-dashboard", title: "Build First Dashboard", desc: "Step by step dashboard creation." },
      { name: "ask-your-first-query", title: "Ask Your First Query", desc: "Writing prompt to SQL." },
      { name: "connect-database", title: "Connect Database", desc: "Linking Postgres or Snowflake." },
      { name: "create-metric", title: "Create Metric", desc: "Adding a new metric to semantic layer." }
    ]
  },
  "Reference": {
    dir: "Reference",
    files: [
      { name: "sql-generation", title: "SQL Generation", desc: "Deep dive on how SQL is generated." },
      { name: "supported-databases", title: "Supported Databases", desc: "List of connectors." },
      { name: "chart-types", title: "Chart Types", desc: "List of supported visualizations." },
      { name: "limitations", title: "Limitations", desc: "Known limitations and workarounds." },
      { name: "faq", title: "FAQ", desc: "Frequently asked questions." }
    ]
  },
  "System Design": {
    dir: "System-Design",
    files: [
      { name: "architecture-diagram", title: "Architecture Diagram", desc: "Bird's eye view architecture." },
      { name: "query-flow", title: "Query Flow", desc: "Request lifecycle." },
      { name: "llm-integration", title: "LLM Integration", desc: "How prompts are safely sent and received." },
      { name: "caching-strategy", title: "Caching Strategy", desc: "Redis and in-memory caches." },
      { name: "scalability", title: "Scalability", desc: "Horizontal scaling and kubernetes." }
    ]
  }
};

const rootDir = 'c:/Users/PC/Desktop/prov-ai-docs';

// Generate files
const navigation = [];

for (const [groupName, data] of Object.entries(structure)) {
  const dirPath = path.join(rootDir, data.dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const pages = [];
  
  for (const fileData of data.files) {
    const filePath = path.join(dirPath, `${fileData.name}.mdx`);
    
    // Create or format md file
    const content = `---
title: "${fileData.title}"
description: "${fileData.desc}"
---

# ${fileData.title}

Content goes here...
`;
    fs.writeFileSync(filePath, content, 'utf8');
    
    // Add to navigation (e.g., Get-Started/introduction)
    pages.push(`${data.dir}/${fileData.name}`);
  }

  navigation.push({
    group: groupName,
    pages: pages
  });
}

// Read docs.json
const docsJsonPath = path.join(rootDir, 'docs.json');
const docsJsonStr = fs.readFileSync(docsJsonPath, 'utf8');
const docsJson = JSON.parse(docsJsonStr);

// Overwrite navigation to replace Dify completely
docsJson.navigation = navigation;

// If we need to set the redirect or anchor page explicitly
// We can set default page (currently introduction)
// though we don't strictly modify everything else

fs.writeFileSync(docsJsonPath, JSON.stringify(docsJson, null, 2), 'utf8');

console.log("Structure generated successfully!");
