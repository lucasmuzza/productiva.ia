const express = require("express");
const dotenv = require("dotenv"); 
const { createClient } = require("@supabase/supabase-js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config();
const app = express();
const PORT = 3000;

// node server.js -> roda o servidor na PORT
// npx nodemon server.js -> kill na PORT

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        // Corrigido encodeURIComponent
        return res.redirect(`/error.html?msg=${encodeURIComponent(error.message)}`);
    }
    
    res.redirect("/dashboard.html");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});