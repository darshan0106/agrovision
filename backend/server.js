const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://0.0.0.0:27017/agrovision", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handle connection events
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Set EJS as the templating engine
app.set("view engine", "ejs");

app.use(cors());

// Middleware to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes for rendering EJS pages
app.get("/", (req, res) => res.render("Landing"));
app.get("/home", (req, res) => res.render("Home"));
app.get("/login", (req, res) => res.render("Login"));
app.get("/register", (req, res) => res.render("Register"));
app.get("/weather", (req, res) => res.render("Weather"));
app.get("/soil", (req, res) => res.render("Soil"));
app.get("/crop", (req, res) => res.render("Crops"));
app.get("/diseases", (req, res) => res.render("Diseases"));
app.get("/about", (req, res) => res.render("About"));

app.post("/register", async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });

    await user.save();

    // ✅ Send success response
    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Both fields are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // ✅ Send success response
    res.json({ message: "Login successful", success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Weather API Route
app.post("/weather", (req, res) => {
  const query = req.body.city;
  const apiKey = "765636232ea242dae071ced28f68501c";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;

  https
    .get(url, (apiResponse) => {
      let data = "";

      // Check for a valid response status
      if (apiResponse.statusCode !== 200) {
        return res.status(apiResponse.statusCode).json({
          error: `Failed to fetch weather data. Status Code: ${apiResponse.statusCode}`,
        });
      }

      // Collect data in chunks
      apiResponse.on("data", (chunk) => {
        data += chunk;
      });

      // Process the complete data
      apiResponse.on("end", () => {
        try {
          const weatherData = JSON.parse(data);

          if (!weatherData.main || !weatherData.weather) {
            throw new Error("Incomplete data received from API");
          }

          const temp = weatherData.main.temp;
          const temp_min = weatherData.main.temp_min;
          const temp_max = weatherData.main.temp_max;
          const humidity = weatherData.main.humidity;
          const weatherMain = weatherData.weather[0].main;
          const windSpeed = weatherData.wind.speed;
          const weatherDescription = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const imgURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

          // Send JSON response with extracted weather data
          res.json({
            temperature: temp,
            maxTemp: temp_max,
            minTemp: temp_min,
            humidity,
            weatherTitle: weatherMain,
            windSpeed,
            description: weatherDescription,
            iconUrl: imgURL,
          });
        } catch (error) {
          console.error("Error parsing weather data:", error);
          console.error("API Response Data:", data);
          res.status(500).json({ error: "Failed to parse weather data" });
        }
      });
    })
    .on("error", (err) => {
      console.error("Request Error:", err);
      res.status(500).json({ error: "Failed to fetch weather data" });
    });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
