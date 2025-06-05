// Enhanced Salesforce ArcPilot Local Server
const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

// Server startup time for uptime tracking
const startTime = new Date();

const allowedOrigins = [
  // Permitir requisições de extensões do Chrome
  /^chrome-extension:\/\/.+$/,
  // Para desenvolvimento local
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        // Permitir requisições sem origin (ex: extensões)
        callback(null, true);
      } else if (
        allowedOrigins.some((pattern) =>
          typeof pattern === "string"
            ? pattern === origin
            : pattern.test(origin)
        )
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());
app.use(express.static("public")); // For serving static files if needed

// Logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  const uptime = Math.floor((new Date() - startTime) / 1000);
  res.json({
    status: "healthy",
    uptime: uptime,
    timestamp: new Date().toISOString(),
    version: "2.0.0",
  });
});

// Enhanced server info endpoint
app.get("/", (req, res) => {
  const uptime = Math.floor((new Date() - startTime) / 1000);
  res.json({
    name: "Salesforce ArcPilot Local Server",
    status: "online",
    version: "2.0.0",
    uptime: uptime,
    endpoints: [
      "GET /health - Server health check",
      "GET /list-orgs - List Salesforce CLI orgs",
      "POST /open-org - Open Salesforce org via CLI",
      "GET /cli-info - Get Salesforce CLI information",
    ],
  });
});

// Enhanced CLI info endpoint
app.get("/cli-info", (req, res) => {
  console.log("Checking Salesforce CLI information...");

  const cliCommand = "sf version --json";

  // Adicionar timeout de 10 segundos para evitar travamento
  const timeout = setTimeout(() => {
    console.error("CLI check timeout after 10 seconds");
    res.status(408).json({
      success: false,
      message:
        "Timeout ao verificar CLI - operação demorou mais de 10 segundos",
      cliInstalled: false,
      timeout: true,
    });
  }, 10000);

  exec(cliCommand, { timeout: 8000 }, (error, stdout, stderr) => {
    clearTimeout(timeout);

    if (error) {
      console.error(`CLI info error: ${error}`);

      // Verificar se é erro de timeout específico
      if (error.killed && error.signal === "SIGTERM") {
        return res.status(408).json({
          success: false,
          message: "Timeout ao verificar CLI - comando foi interrompido",
          cliInstalled: false,
          timeout: true,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Salesforce CLI não encontrado ou não instalado",
        cliInstalled: false,
        error: error.message,
      });
    }

    try {
      const versionInfo = JSON.parse(stdout);
      res.json({
        success: true,
        cliInstalled: true,
        version: versionInfo,
        timestamp: new Date().toISOString(),
      });
    } catch (parseError) {
      console.error(`Error parsing CLI version: ${parseError}`);
      res.json({
        success: true,
        cliInstalled: true,
        version: { raw: stdout.trim() },
        timestamp: new Date().toISOString(),
      });
    }
  });
});

// Enhanced org opening with better error handling and logging
app.post("/open-org", (req, res) => {
  const orgAlias = req.body.alias;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] Opening org: ${orgAlias}`);

  if (!orgAlias) {
    return res.status(400).json({
      success: false,
      message: "Alias da Org é obrigatório.",
      timestamp: timestamp,
    });
  }

  // Validate alias format (basic validation)
  if (orgAlias.length > 100 || /[<>:"\/\\|?*]/.test(orgAlias)) {
    return res.status(400).json({
      success: false,
      message: "Alias da Org contém caracteres inválidos.",
      timestamp: timestamp,
    });
  }

  const cliCommand = `sf org open -o "${orgAlias}"`;

  exec(cliCommand, { timeout: 15000 }, (error, stdout, stderr) => {
    if (error) {
      console.error(`[${timestamp}] exec error: ${error}`);
      let clientErrorMessage = `Erro ao executar CLI: ${error.message}`;

      if (error.code === "TIMEOUT") {
        clientErrorMessage = "Timeout: CLI demorou muito para responder";
      } else if (stderr) {
        clientErrorMessage += `\nDetalhes: ${stderr}`;
      }

      return res.status(500).json({
        success: false,
        message: clientErrorMessage,
        timestamp: timestamp,
      });
    }

    if (stderr) {
      console.warn(`[${timestamp}] stderr: ${stderr}`);
      if (
        stderr.toLowerCase().includes("error") ||
        stderr.toLowerCase().includes("not found")
      ) {
        return res.status(500).json({
          success: false,
          message: `Erro CLI: ${stderr}`,
          timestamp: timestamp,
        });
      }
    }

    console.log(`[${timestamp}] Org opened successfully: ${stdout}`);
    res.json({
      success: true,
      message: `Org ${orgAlias} aberta com sucesso!`,
      output: stdout,
      timestamp: timestamp,
    });
  });
});

// Enhanced org listing with better error handling and caching
app.get("/list-orgs", (req, res) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Listing Salesforce CLI orgs...`);

  const cliCommand = "sf org list --json";

  // Adicionar timeout de 15 segundos para evitar travamento
  const timeout = setTimeout(() => {
    console.error(`[${timestamp}] CLI list timeout after 15 seconds`);
    res.status(408).json({
      success: false,
      message: "Timeout ao listar orgs - operação demorou mais de 15 segundos",
      timestamp: timestamp,
      timeout: true,
    });
  }, 15000);

  exec(cliCommand, { timeout: 12000 }, (error, stdout, stderr) => {
    clearTimeout(timeout);

    if (error) {
      console.error(`[${timestamp}] CLI list error: ${error}`);

      let errorMessage = "Erro ao listar Orgs via CLI";

      // Verificar se é erro de timeout específico
      if (error.killed && error.signal === "SIGTERM") {
        errorMessage = "Timeout ao listar orgs - comando foi interrompido";
      } else if (error.code === "TIMEOUT") {
        errorMessage = "Timeout: CLI demorou muito para listar as orgs";
      } else if (
        error.message.includes("not found") ||
        error.message.includes("command not found")
      ) {
        errorMessage =
          "Salesforce CLI não encontrado. Verifique se está instalado.";
      } else if (error.message.includes("No orgs found")) {
        // Este não é um erro real, apenas não há orgs
        return res.json({
          success: true,
          orgs: [],
          metadata: {
            totalOrgs: 0,
            nonScratchOrgs: 0,
            scratchOrgs: 0,
            timestamp: timestamp,
            message: "Nenhuma org autorizada encontrada",
          },
        });
      } else {
        errorMessage = `Erro CLI: ${stderr || error.message}`;
      }

      return res.status(500).json({
        success: false,
        message: errorMessage,
        timestamp: timestamp,
        error: error.message,
      });
    }

    if (stderr) {
      console.warn(`[${timestamp}] CLI stderr: ${stderr}`);
      // Alguns warnings do CLI são normais, só retornar erro se for crítico
      if (
        stderr.toLowerCase().includes("error") &&
        !stderr.includes("warning")
      ) {
        return res.status(500).json({
          success: false,
          message: `Erro CLI ao listar: ${stderr}`,
          timestamp: timestamp,
        });
      }
    }

    try {
      // Parse CLI output
      const cliOutput = JSON.parse(stdout);

      // Process both non-scratch and scratch orgs
      const nonScratchOrgs = (cliOutput.result?.nonScratchOrgs || []).map(
        (org) => ({
          alias: org.alias || org.username,
          username: org.username,
          instanceUrl: org.instanceUrl,
          isDefault: org.isDefaultDevHub || org.isDefaultUsername,
          type: "production",
          connectedStatus: org.connectedStatus,
          lastUsed: org.lastUsed,
        })
      );

      const scratchOrgs = (cliOutput.result?.scratchOrgs || []).map((org) => ({
        alias: org.alias || org.username,
        username: org.username,
        instanceUrl: org.instanceUrl,
        isDefault: false,
        type: "scratch",
        expirationDate: org.expirationDate,
        connectedStatus: org.connectedStatus,
        lastUsed: org.lastUsed,
      }));

      const allOrgs = [...nonScratchOrgs, ...scratchOrgs];

      // Sort orgs: default first, then by last used, then alphabetically
      allOrgs.sort((a, b) => {
        if (a.isDefault && !b.isDefault) return -1;
        if (!a.isDefault && b.isDefault) return 1;

        if (a.lastUsed && b.lastUsed) {
          return new Date(b.lastUsed) - new Date(a.lastUsed);
        }
        if (a.lastUsed && !b.lastUsed) return -1;
        if (!a.lastUsed && b.lastUsed) return 1;

        return (a.alias || a.username).localeCompare(b.alias || b.username);
      });

      console.log(`[${timestamp}] Successfully listed ${allOrgs.length} orgs`);

      res.json({
        success: true,
        orgs: allOrgs,
        metadata: {
          totalOrgs: allOrgs.length,
          nonScratchOrgs: nonScratchOrgs.length,
          scratchOrgs: scratchOrgs.length,
          timestamp: timestamp,
        },
      });
    } catch (parseError) {
      console.error(`[${timestamp}] Error parsing CLI JSON: ${parseError}`);
      console.error(`Raw CLI output: ${stdout}`);

      res.status(500).json({
        success: false,
        message: `Erro ao processar resposta do CLI: ${parseError.message}`,
        timestamp: timestamp,
        rawOutput: stdout.substring(0, 500), // First 500 chars for debugging
      });
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Server error:`, error);
  res.status(500).json({
    success: false,
    message: "Erro interno do servidor",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint não encontrado: ${req.path}`,
    availableEndpoints: [
      "/health",
      "/",
      "/list-orgs",
      "/open-org",
      "/cli-info",
    ],
    timestamp: new Date().toISOString(),
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("Recebido SIGTERM, encerrando servidor graciosamente...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("Recebido SIGINT, encerrando servidor graciosamente...");
  process.exit(0);
});

app.listen(port, () => {
  console.log(`🚀 Salesforce ArcPilot Server v2.0.0`);
  console.log(`📡 Servidor rodando em http://localhost:${port}`);
  console.log(`⚡ Salesforce CLI integration ativo`);
  console.log(`🔗 CORS configurado para extensões Chrome`);
  console.log(`⏰ Iniciado em ${startTime.toISOString()}`);
  console.log(`---`);
  console.log(`Endpoints disponíveis:`);
  console.log(`  GET  /health     - Status do servidor`);
  console.log(`  GET  /cli-info   - Informações do Salesforce CLI`);
  console.log(`  GET  /list-orgs  - Listar orgs autorizadas`);
  console.log(`  POST /open-org   - Abrir org via CLI`);
  console.log(`---`);
  console.log(
    `💡 Certifique-se de que o Salesforce CLI está instalado e configurado.`
  );
});
