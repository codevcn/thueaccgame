// app.js
import express from "express";

const app = express();
const PORT = 3000;

// Set EJS làm view engine
app.set("view engine", "ejs");
app.set("views", "src/views");

// Dùng static file từ thư mục public
app.use(express.static("public"));

// Route chính
app.get("/", (req, res) => {
  res.render("home/home-page", { title: "Trang chủ" });
});

app.listen(PORT, () => {
  console.log(`>>> Server đang chạy tại http://localhost:${PORT}`);
});
