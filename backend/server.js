const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));

// Simple in-memory storage (resets when server restarts - OK for free tier)
const subscribers = [];
const downloads = [];

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Salesforce Arc Pilot API",
    stats: {
      subscribers: subscribers.length,
      downloads: downloads.length,
    },
  });
});

// Email subscription (free)
app.post("/api/subscribe", (req, res) => {
  try {
    const { email, source, language } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Email inválido" });
    }

    // Check if email already exists
    if (subscribers.find((sub) => sub.email === email)) {
      return res.status(409).json({ error: "Email já cadastrado" });
    }

    // Add subscriber
    subscribers.push({
      email,
      source: source || "landing_page",
      language: language || "pt",
      subscribedAt: new Date().toISOString(),
      id: Date.now(),
    });

    console.log(`📧 New subscriber: ${email} (Total: ${subscribers.length})`);

    res.json({
      success: true,
      message: "Email cadastrado com sucesso!",
      totalSubscribers: subscribers.length,
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Download tracking (free)
app.post("/api/download-link", (req, res) => {
  try {
    const { type } = req.body;
    const userAgent = req.headers["user-agent"];
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    // Track download
    downloads.push({
      type: type || "free",
      timestamp: new Date().toISOString(),
      userAgent,
      ip: ip?.split(",")[0], // First IP if behind proxy
      id: Date.now(),
    });

    console.log(`⬇️ Download tracked: ${type} (Total: ${downloads.length})`);

    // Return GitHub raw file URL (free hosting)
    const downloadUrl =
      type === "premium"
        ? "https://raw.githubusercontent.com/your-username/salesforce-arc-pilot/main/dist/premium.zip"
        : "https://raw.githubusercontent.com/your-username/salesforce-arc-pilot/main/dist/free.zip";

    res.json({
      success: true,
      downloadUrl,
      totalDownloads: downloads.length,
    });
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ error: "Erro ao gerar link de download" });
  }
});

// Simple analytics (free)
app.post("/api/analytics", (req, res) => {
  try {
    const { event, parameters, timestamp, userAgent, referrer } = req.body;

    // Just log to console (you can upgrade to proper analytics later)
    console.log(`📊 Analytics: ${event}`, {
      parameters,
      timestamp,
      userAgent: userAgent?.substring(0, 50),
      referrer,
    });

    res.json({ received: true });
  } catch (error) {
    console.error("Analytics error:", error);
    res.json({ received: false });
  }
});

// PIX payment simulation (for testing)
app.post("/api/generate-pix", (req, res) => {
  try {
    const { plan, amount } = req.body;

    // Generate a simple PIX code (this would integrate with real payment provider)
    const pixCode = `00020126580014BR.GOV.BCB.PIX0136seu-email@exemplo.com520400005303986540${amount.toFixed(
      2
    )}5802BR5913VICTOR BRANDAO6009SAO PAULO630463041234`;

    console.log(`💰 PIX generated: ${plan} - R$ ${amount}`);

    res.json({
      success: true,
      pixCode,
      amount,
      plan,
      message: "Código PIX gerado (simulação)",
    });
  } catch (error) {
    console.error("PIX error:", error);
    res.status(500).json({ error: "Erro ao gerar PIX" });
  }
});

// Get statistics (free dashboard)
app.get("/api/stats", (req, res) => {
  try {
    const today = new Date().toDateString();

    const todaySubscribers = subscribers.filter(
      (s) => new Date(s.subscribedAt).toDateString() === today
    ).length;

    const todayDownloads = downloads.filter(
      (d) => new Date(d.timestamp).toDateString() === today
    ).length;

    res.json({
      total: {
        subscribers: subscribers.length,
        downloads: downloads.length,
      },
      today: {
        subscribers: todaySubscribers,
        downloads: todayDownloads,
      },
      recent: {
        subscribers: subscribers.slice(-5),
        downloads: downloads.slice(-5),
      },
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ error: "Erro ao buscar estatísticas" });
  }
});

// Simple admin dashboard (password protected)
app.get("/admin", (req, res) => {
  const { password } = req.query;

  if (password !== "sua-senha-secreta") {
    return res.status(401).send("Acesso negado");
  }

  res.send(`
        <html>
        <head><title>Admin Dashboard</title></head>
        <body style="font-family: Arial; padding: 20px;">
            <h1>📊 Salesforce Arc Pilot - Dashboard</h1>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0;">
                <div style="background: #f0f9ff; padding: 20px; border-radius: 8px;">
                    <h3>📧 Subscribers</h3>
                    <p style="font-size: 24px; margin: 0;">${
                      subscribers.length
                    }</p>
                </div>
                <div style="background: #f0fdf4; padding: 20px; border-radius: 8px;">
                    <h3>⬇️ Downloads</h3>
                    <p style="font-size: 24px; margin: 0;">${
                      downloads.length
                    }</p>
                </div>
            </div>
            <h3>Recent Subscribers:</h3>
            <ul>
                ${subscribers
                  .slice(-10)
                  .reverse()
                  .map(
                    (s) =>
                      `<li>${s.email} - ${new Date(
                        s.subscribedAt
                      ).toLocaleString("pt-BR")}</li>`
                  )
                  .join("")}
            </ul>
            <h3>Recent Downloads:</h3>
            <ul>
                ${downloads
                  .slice(-10)
                  .reverse()
                  .map(
                    (d) =>
                      `<li>${d.type} - ${new Date(d.timestamp).toLocaleString(
                        "pt-BR"
                      )}</li>`
                  )
                  .join("")}
            </ul>
        </body>
        </html>
    `);
});

// Error handling
app.use((error, req, res, next) => {
  console.error("Server error:", error);
  res.status(500).json({ error: "Erro interno do servidor" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Endpoint não encontrado" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(
    `📊 Admin: http://localhost:${PORT}/admin?password=sua-senha-secreta`
  );
});
