// app.js
import express from "express"
import { DevHelper } from "./utils/helpers.js"

const app = express()
const PORT = 3000

// Set EJS làm view engine
app.set("view engine", "ejs")
app.set("views", "src/views")
app.use(express.json())

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

const loggedInUsers = new Map()

// Route chính
app.get("/", async (req, res) => {
  fetchItemsCount = 0
  res.render("home/home-page", { items })
})

app.get("/api/auth/logout", async (req, res) => {
  const { username } = req.body
  if (!username) {
    res.status(400).json({ message: "Username is required" })
    return
  }
  if (loggedInUsers.has(username)) {
    loggedInUsers.delete(username)
  }
  res.status(200).json({ message: "Logout successful" })
})

app.get("/profile", async (req, res) => {
  res.render("profile/profile-page", { user: loggedInUsers.get("admin") })
})

app.get("/rent-account", async (req, res) => {
  res.render("rent-account/rent-account-page")
})

app.get("/api/account/accounts", async (req, res) => {
  await DevHelper.delay(1000)
  let itemsToFetch = [...items]
  if (fetchItemsCount === 2) {
    fetchItemsCount--
    itemsToFetch = []
  }
  fetchItemsCount++
  res.status(200).json({ items: itemsToFetch, user: loggedInUsers.get("admin") })
})

app.post("/api/auth/login", async (req, res) => {
  await DevHelper.delay(1000)
  const { username, password } = req.body
  if (username === "admin" && password === "123456") {
    loggedInUsers.set(username, {
      username,
      password,
    })
    res.status(200).json({ message: "Login successful" })
  } else {
    res.status(401).json({ message: "Login failed" })
  }
})

app.get("/contact", async (req, res) => {
  res.render("contact/contact-page")
})

app.get("/login", async (req, res) => {
  res.render("login/login-page")
})

app.get("/deposit/card", async (req, res) => {
  res.render("deposit/by-card/by-card-page")
})

app.get("/deposit/banking", async (req, res) => {
  res.render("deposit/by-banking/by-banking-page")
})

app.listen(PORT, () => {
  console.log(`>>> Server đang chạy tại http://localhost:${PORT}`)
})
