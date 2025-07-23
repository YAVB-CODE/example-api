const express = require("express");
const DataBase = require("./DataBase");
const cors = require("cors");
const { v7: uuidv7 } = require("uuid");
const PdfPrinter = require("pdfmake");
const path = require("path");
const config = require("./config");

const db = new DataBase(
  config.dbUser,
  config.dbPassword,
  config.dbHost,
  config.dbPort,
  config.dbName
);

const app = express();
const port = config.port;

app.use(cors());
app.use(express.json());

app.get("/api/v1/users", async (req, res) => {
  const users = await db.query("SELECT * FROM users");
  res.json(users);
});

app.get("/api/v1/users/:id", async (req, res) => {
  const users = await db.query("SELECT * FROM users WHERE id = ?", [
    req.params.id,
  ]);
  res.json(users);
});

app.post("/api/v1/users", async (req, res) => {
  const id = uuidv7();
  const users = await db.query(
    "INSERT INTO users (id, name, email) VALUES (?, ?, ?)",
    [id, req.body.name, req.body.email]
  );
  res.json(users);
});

app.put("/api/v1/users/:id", async (req, res) => {
  const users = await db.query(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [req.body.name, req.body.email, req.params.id]
  );
  res.json(users);
});

app.delete("/api/v1/users/:id", async (req, res) => {
  const users = await db.query("DELETE FROM users WHERE id = ?", [
    req.params.id,
  ]);
  res.json(users);
});

app.get("/api/v1/export/users/pdf", async (req, res) => {
  const { limit = "1000" } = req.query;
  const users = await db.query("SELECT * FROM users LIMIT ?", [limit]);

  const fonts = {
    Roboto: {
      normal: path.join(__dirname, 'fonts/Roboto.ttf'),
      bold: path.join(__dirname, 'fonts/Roboto.ttf'),
      italics: path.join(__dirname, 'fonts/Roboto.ttf'),
      bolditalics: path.join(__dirname, 'fonts/Roboto.ttf')
    }
  };

  const pdfPrinter = new PdfPrinter(fonts);

  const docDefinition = {
    content: [
      {
        text: "Pdf Users",
        style: "header",
        alignment: "center",
      },
      {
        table: {
          headerRows: 1,
          widths: ["auto", "auto", "auto"],
          body: users.map((user) => Object.values(user)),
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
    },
  };

  const pdf = pdfPrinter.createPdfKitDocument(docDefinition);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=users-${uuidv7()}.pdf`
  );

  pdf.pipe(res);
  await pdf.end();
});

app.get("/api/v1/export/users/csv", async (req, res) => {
  const { limit = "1000" } = req.query;

  const headers = ["id", "name", "email"];
  const users = await db.query("SELECT * FROM users LIMIT ?", [limit]);
  const csv = users.map((user) => Object.values(user).join(";"));
  const csvContent = [headers.join(";"), ...csv].join("\n");
  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=users-${uuidv7()}.csv`
  );
  res.send(csvContent);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
