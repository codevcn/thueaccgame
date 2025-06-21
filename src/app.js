// app.js
import express from "express"

const app = express()
const PORT = 3000

// Set EJS làm view engine
app.set("view engine", "ejs")
app.set("views", "src/views")

// Dùng static file từ thư mục public
app.use(express.static("public"))

let fetchItemsCount = 0

const items = [
  {
    title: "QBZ, Browning, CSV-9, Astarte | Clean nickname #32177475",
    seller: "Bakhtiyar",
    level: 90,
    price: "4,151,165",
    avatar: "BA",
  },
  {
    title: "Fully Meta Build | 62,635 Parts | Includes Kord, CZ Scorpion,...",
    seller: "Gamebarter",
    level: 66,
    price: "4,499,328",
    avatar: "/imgs/skull.png", // using skull as placeholder
  },
  {
    title: "Fully Meta Loadout for All Classes | Includes QBZ-191, Browning Cyner...",
    seller: "Gamebarter",
    level: 66,
    price: "5,222,434",
    avatar: "/imgs/skull.png",
  },
  {
    title: "Clean Named Account | Includes QBZ-191, Browning Cynergy CX, M...",
    seller: "Gamebarter",
    level: 66,
    price: "4,820,708",
    avatar: "/imgs/skull.png",
  },
  {
    title: "High-Value Account with Heavy Top-Ups | Includes Multiple Donated...",
    seller: "AnotherSeller",
    level: 88,
    price: "6,120,500",
    avatar: "AS",
  },
  {
    title: "2 Grand Seasons | 8K Rating Points | 2,500 Credits | Full Meta Loadout |...",
    seller: "ProPlayer",
    level: 99,
    price: "7,500,000",
    avatar: "/imgs/skull.png",
  },
  {
    title: "Includes King of the Hill Title | 1000+ Meat Grinder and Survival Matches...",
    seller: "Survivalist",
    level: 75,
    price: "3,900,100",
    avatar: "S",
  },
  {
    title: "Established 8-Year Account | Dual Characters | Optimized for 2024–...",
    seller: "VeteranGamer",
    level: 100,
    price: "9,999,999",
    avatar: "/imgs/skull.png",
  },
]
// Route chính
app.get("/", async (req, res) => {
  fetchItemsCount = 0
  res.render("home/home-page", { items })
})

app.get("/api/items", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  let itemsToFetch = [...items]
  if (fetchItemsCount === 2) {
    fetchItemsCount--
    itemsToFetch = []
  }
  fetchItemsCount++
  res.status(200).json({ items: itemsToFetch })
})

app.get("/contact", async (req, res) => {
  res.render("contact/contact-page")
})

app.listen(PORT, () => {
  console.log(`>>> Server đang chạy tại http://localhost:${PORT}`)
})
