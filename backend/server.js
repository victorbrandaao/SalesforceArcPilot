const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: [
      "https://victorbrandao.github.io",
      "http://localhost:3000",
      "https://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));

// Simple in-memory storage (resets when server restarts - OK for free tier)
const subscribers = [];
const downloads = [];
const analytics = [];

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "🚀 Salesforce Arc Pilot API Online!",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    stats: {
      subscribers: subscribers.length,
      downloads: downloads.length,
      analytics: analytics.length,
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
    const existingSubscriber = subscribers.find(
      (sub) => sub.email.toLowerCase() === email.toLowerCase()
    );
    if (existingSubscriber) {
      return res.status(409).json({
        error: "Email já cadastrado",
        message: "Este email já está na nossa lista!",
      });
    }

    // Add subscriber
    const newSubscriber = {
      email: email.toLowerCase(),
      source: source || "landing_page",
      language: language || "pt",
      subscribedAt: new Date().toISOString(),
      id: Date.now(),
      ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
    };

    subscribers.push(newSubscriber);

    console.log(`📧 New subscriber: ${email} (Total: ${subscribers.length})`);

    res.json({
      success: true,
      message: "Email cadastrado com sucesso! 🎉",
      totalSubscribers: subscribers.length,
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Enhanced download tracking with GitHub releases integration
app.post("/api/download-link", (req, res) => {
  try {
    const { type } = req.body;
    const userAgent = req.headers["user-agent"];
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    // Track download
    const downloadRecord = {
      type: type || "free",
      timestamp: new Date().toISOString(),
      userAgent: userAgent?.substring(0, 100),
      ip: ip?.split(",")[0],
      id: Date.now(),
    };

    downloads.push(downloadRecord);

    console.log(`⬇️ Download tracked: ${type} (Total: ${downloads.length})`);

    // GitHub releases URLs (update with actual release URLs)
    const downloadUrls = {
      free: "https://github.com/victorbrandao-tech/SalesforceArcPilot/releases/download/v1.0.0/salesforce-arc-pilot-free-v1.0.0.zip",
      premium:
        "https://github.com/victorbrandao-tech/SalesforceArcPilot/releases/download/v1.0.0/salesforce-arc-pilot-premium-v1.0.0.zip",
    };

    res.json({
      success: true,
      downloadUrl: downloadUrls[type] || downloadUrls.free,
      totalDownloads: downloads.length,
      message: "Link de download gerado com sucesso!",
      instructions: {
        pt: {
          steps: [
            "1. Baixe o arquivo ZIP",
            "2. Extraia em uma pasta",
            "3. Abra Chrome > chrome://extensions/",
            '4. Ative "Modo do desenvolvedor"',
            '5. Clique "Carregar sem compactação"',
            "6. Selecione a pasta extraída",
          ],
          videoGuide:
            "https://victorbrandaao.github.io/salesforce-arc-pilot-landing/how-to-install",
        },
        en: {
          steps: [
            "1. Download the ZIP file",
            "2. Extract to a folder",
            "3. Open Chrome > chrome://extensions/",
            '4. Enable "Developer mode"',
            '5. Click "Load unpacked"',
            "6. Select the extracted folder",
          ],
          videoGuide:
            "https://victorbrandaao.github.io/salesforce-arc-pilot-landing/how-to-install",
        },
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ error: "Erro ao gerar link de download" });
  }
});

// Get latest release info
app.get("/api/latest-release", async (req, res) => {
  try {
    // In a real implementation, you'd fetch from GitHub API
    const latestRelease = {
      version: "1.0.0",
      releaseDate: "2024-06-09",
      downloads: {
        free: "https://github.com/victorbrandao-tech/SalesforceArcPilot/releases/download/v1.0.0/salesforce-arc-pilot-free-v1.0.0.zip",
        premium:
          "https://github.com/victorbrandao-tech/SalesforceArcPilot/releases/download/v1.0.0/salesforce-arc-pilot-premium-v1.0.0.zip",
      },
      changelog: [
        "🎉 Initial release",
        "✨ Support for up to 2 orgs (free) / unlimited (premium)",
        "🔍 Smart org search",
        "🎨 Modern interface",
        "💎 Premium features: Analytics, Dark Mode, Cloud Sync",
      ],
    };

    res.json(latestRelease);
  } catch (error) {
    console.error("Latest release error:", error);
    res.status(500).json({ error: "Erro ao buscar versão mais recente" });
  }
});

// Download tracking (free)
app.post("/api/download-link", (req, res) => {
  try {
    const { type } = req.body;
    const userAgent = req.headers["user-agent"];
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    // Track download
    const downloadRecord = {
      type: type || "free",
      timestamp: new Date().toISOString(),
      userAgent: userAgent?.substring(0, 100),
      ip: ip?.split(",")[0],
      id: Date.now(),
    };

    downloads.push(downloadRecord);

    console.log(`⬇️ Download tracked: ${type} (Total: ${downloads.length})`);

    // Return GitHub raw file URL (free hosting)
    const downloadUrls = {
      free: "https://github.com/victorbrandao-tech/SalesforceArcPilot/releases/download/v1.0.0/salesforce-arc-pilot-free.zip",
      premium:
        "https://github.com/victorbrandao-tech/SalesforceArcPilot/releases/download/v1.0.0/salesforce-arc-pilot-premium.zip",
    };

    res.json({
      success: true,
      downloadUrl: downloadUrls[type] || downloadUrls.free,
      totalDownloads: downloads.length,
      message: "Link de download gerado com sucesso!",
    });
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ error: "Erro ao gerar link de download" });
  }
});

// Simple analytics (free)
app.post("/api/analytics", (req, res) => {
  try {
    const { event, parameters, timestamp, userAgent, referrer, page } =
      req.body;

    const analyticsRecord = {
      event,
      parameters: parameters || {},
      timestamp: timestamp || new Date().toISOString(),
      userAgent: userAgent?.substring(0, 100),
      referrer: referrer?.substring(0, 100),
      page: page?.substring(0, 100),
      ip: (
        req.headers["x-forwarded-for"] || req.connection.remoteAddress
      )?.split(",")[0],
      id: Date.now(),
    };

    analytics.push(analyticsRecord);

    // Keep only last 1000 analytics records (memory optimization)
    if (analytics.length > 1000) {
      analytics.splice(0, analytics.length - 1000);
    }

    console.log(`📊 Analytics: ${event}`, parameters);

    res.json({ received: true, totalAnalytics: analytics.length });
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
    const merchantKey = "victorbrandaotech@gmail.com";
    const pixCode = `00020126580014BR.GOV.BCB.PIX0136${merchantKey}520400005303986540${amount.toFixed(
      2
    )}5802BR5913VICTOR BRANDAO6009SAO PAULO6304ABCD`;

    console.log(`💰 PIX generated: ${plan} - R$ ${amount}`);

    res.json({
      success: true,
      pixCode,
      amount,
      plan,
      message: "Código PIX gerado! (Este é um exemplo para demonstração)",
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

    const todayAnalytics = analytics.filter(
      (a) => new Date(a.timestamp).toDateString() === today
    ).length;

    res.json({
      total: {
        subscribers: subscribers.length,
        downloads: downloads.length,
        analytics: analytics.length,
      },
      today: {
        subscribers: todaySubscribers,
        downloads: todayDownloads,
        analytics: todayAnalytics,
      },
      recent: {
        subscribers: subscribers.slice(-5).map((s) => ({
          email: s.email.replace(/(.{3}).*(@.*)/, "$1***$2"),
          date: s.subscribedAt,
          source: s.source,
        })),
        downloads: downloads.slice(-5),
        topEvents: getTopEvents(),
      },
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ error: "Erro ao buscar estatísticas" });
  }
});

// Helper function for top events
function getTopEvents() {
  const eventCounts = {};
  analytics.forEach((a) => {
    eventCounts[a.event] = (eventCounts[a.event] || 0) + 1;
  });

  return Object.entries(eventCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([event, count]) => ({ event, count }));
}

// Simple admin dashboard (password protected)
app.get("/admin", (req, res) => {
  const { password } = req.query;

  if (password !== "salesforce2024") {
    return res.status(401).send(`
            <html>
            <head><title>Admin Login</title></head>
            <body style="font-family: Arial; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f9ff;">
                <div style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                    <h2>🔐 Admin Access</h2>
                    <form>
                        <input type="password" name="password" placeholder="Digite a senha" style="padding: 12px; width: 200px; border: 1px solid #ddd; border-radius: 6px; margin-right: 10px;">
                        <button type="submit" style="padding: 12px 20px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Entrar</button>
                    </form>
                </div>
            </body>
            </html>
        `);
  }

  const todaySubscribers = subscribers.filter(
    (s) => new Date(s.subscribedAt).toDateString() === new Date().toDateString()
  ).length;

  const todayDownloads = downloads.filter(
    (d) => new Date(d.timestamp).toDateString() === new Date().toDateString()
  ).length;

  res.send(`
        <html>
        <head>
            <title>Admin Dashboard</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f8fafc; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px; margin-bottom: 20px; }
                .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0; }
                .stat-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                .stat-number { font-size: 28px; font-weight: bold; color: #3b82f6; }
                .recent-section { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin: 20px 0; }
                .recent-item { padding: 10px; border-bottom: 1px solid #f1f5f9; }
                .recent-item:last-child { border-bottom: none; }
                .email-masked { font-family: monospace; color: #64748b; }
                .timestamp { color: #94a3b8; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🚀 Salesforce Arc Pilot - Dashboard</h1>
                <p>Monitoramento em tempo real • Atualizado em ${new Date().toLocaleString(
                  "pt-BR"
                )}</p>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>📧 Total Subscribers</h3>
                    <div class="stat-number">${subscribers.length}</div>
                    <p>+${todaySubscribers} hoje</p>
                </div>
                <div class="stat-card">
                    <h3>⬇️ Total Downloads</h3>
                    <div class="stat-number">${downloads.length}</div>
                    <p>+${todayDownloads} hoje</p>
                </div>
                <div class="stat-card">
                    <h3>📊 Analytics Events</h3>
                    <div class="stat-number">${analytics.length}</div>
                    <p>Últimas 24h</p>
                </div>
                <div class="stat-card">
                    <h3>🌍 Status</h3>
                    <div class="stat-number">Online</div>
                    <p>API funcionando</p>
                </div>
            </div>
            
            <div class="recent-section">
                <h3>📧 Recent Subscribers (${subscribers.length})</h3>
                ${subscribers
                  .slice(-10)
                  .reverse()
                  .map(
                    (s) =>
                      `<div class="recent-item">
                        <div class="email-masked">${s.email.replace(
                          /(.{3}).*(@.*)/,
                          "$1***$2"
                        )}</div>
                        <div class="timestamp">${new Date(
                          s.subscribedAt
                        ).toLocaleString("pt-BR")} • ${s.source}</div>
                    </div>`
                  )
                  .join("")}
            </div>
            
            <div class="recent-section">
                <h3>⬇️ Recent Downloads (${downloads.length})</h3>
                ${downloads
                  .slice(-10)
                  .reverse()
                  .map(
                    (d) =>
                      `<div class="recent-item">
                        <div><strong>${d.type}</strong></div>
                        <div class="timestamp">${new Date(
                          d.timestamp
                        ).toLocaleString("pt-BR")}</div>
                    </div>`
                  )
                  .join("")}
            </div>
            
            <div class="recent-section">
                <h3>📊 Top Events</h3>
                ${getTopEvents()
                  .map(
                    (e) => `
                    <div class="recent-item">
                        <div><strong>${e.event}</strong></div>
                        <div class="timestamp">${e.count} ocorrências</div>
                    </div>`
                  )
                  .join("")}
            </div>
            
            <script>
                // Auto refresh every 30 seconds
                setTimeout(() => location.reload(), 30000);
            </script>
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
  res.status(404).json({
    error: "Endpoint não encontrado",
    availableEndpoints: [
      "GET / - Health check",
      "POST /api/subscribe - Email subscription",
      "POST /api/download-link - Download tracking",
      "POST /api/analytics - Analytics",
      "GET /api/stats - Statistics",
      "GET /admin?password=XXX - Admin dashboard",
    ],
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Salesforce Arc Pilot API running on port ${PORT}`);
  console.log(
    `📊 Admin: https://your-app.railway.app/admin?password=salesforce2024`
  );
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});
