const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const app = express();
const port = 3000;

const allowedOrigins = [
  "chrome-extension://[cnolefaddfjpaafobjcgeeoijhhdmlje]", // SUBSTITUA COM O ID REAL DA SUA EXTENSÃO!
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

// Rota para abrir uma Org Salesforce
app.post("/open-org", (req, res) => {
  const orgAlias = req.body.alias;
  console.log(`Recebida requisição para abrir Org: ${orgAlias}`);

  if (!orgAlias) {
    return res
      .status(400)
      .json({ success: false, message: "Alias da Org é obrigatório." });
  }

  const cliCommand = `sf org open -o ${orgAlias}`;

  exec(cliCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      let clientErrorMessage = `Erro ao executar CLI: ${error.message}`;
      if (stderr) clientErrorMessage += `\nDetalhes: ${stderr}`;
      return res
        .status(500)
        .json({ success: false, message: clientErrorMessage });
    }
    if (stderr) {
      console.warn(`stderr: ${stderr}`);
      if (stderr.toLowerCase().includes("error")) {
        return res
          .status(500)
          .json({ success: false, message: `Erro CLI: ${stderr}` });
      }
    }
    console.log(`stdout: ${stdout}`);
    res.json({
      success: true,
      message: `Org ${orgAlias} aberta com sucesso!`,
      output: stdout,
    });
  });
});

// --- NOVA ROTA: Listar Orgs do CLI ---
app.get("/list-orgs", (req, res) => {
  console.log("Recebida requisição para listar Orgs do CLI...");

  const cliCommand = "sf org list --json"; // Comando para listar orgs em JSON

  exec(cliCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error (list-orgs): ${error}`);
      return res.status(500).json({
        success: false,
        message: `Erro ao listar Orgs: ${stderr || error.message}`,
      });
    }
    if (stderr) {
      console.warn(`stderr (list-orgs): ${stderr}`);
      // stderror pode conter avisos mesmo com sucesso, então não retorne erro fatal a menos que seja um erro explícito
      if (stderr.toLowerCase().includes("error")) {
        return res
          .status(500)
          .json({ success: false, message: `Erro CLI ao listar: ${stderr}` });
      }
    }

    try {
      // O stdout contém a saída JSON do comando CLI
      const cliOutput = JSON.parse(stdout);
      // Filtramos as orgs, se necessário (ex: remover orgs expiradas ou não ativas)
      const orgs = cliOutput.result.nonScratchOrgs.map((org) => ({
        alias: org.alias || org.username, // Usa alias se existir, senão username
        username: org.username,
        instanceUrl: org.instanceUrl,
        isDefault: org.isDefaultDevHub || org.isDefaultUsername, // Indica se é a org padrão
      }));
      // Poderíamos também pegar scratch orgs em cliOutput.result.scratchOrgs

      res.json({ success: true, orgs: orgs });
    } catch (parseError) {
      console.error(`Erro ao parsear JSON do CLI: ${parseError}`);
      res.status(500).json({
        success: false,
        message: `Erro ao processar resposta do CLI: ${parseError.message}`,
      });
    }
  });
});
// --- FIM DA NOVA ROTA ---

app.get("/", (req, res) => {
  res.send("Servidor Local Salesforce ArcPilot online!");
});

app.listen(port, () => {
  console.log(`Servidor local rodando em http://localhost:${port}`);
  console.log(
    "Certifique-se de que o Salesforce CLI está instalado e configurado."
  );
});
