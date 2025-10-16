// server.js

const express = require('express');
const LandingPage = require('./models/LandingPage'); // ייבוא המודל
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// טעינת משתני סביבה מהקובץ .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- הגדרת Routes ---
const apiRoutes = require('./utils/api');

// Middleware בסיסי
app.use(express.json()); // מאפשר לשרת לעבד גוף בקשה בפורמט JSON
app.use(cors()); // מאפשר בקשות Cross-Origin (חשוב לפיתוח עם Front-end)

// --- חיבור ל-MongoDB ---
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected successfully!');
    } catch (err) {
        console.error('❌ MongoDB Connection Failed:', err.message);
        process.exit(1);
    }
};

// --- Endpoint לבדיקת תקינות השרת (Health Check) ---
app.get('/', (req, res) => {
    res.status(200).send('LandingPage AI Backend is Running!');
});

// --- שימוש ב-API Routes ---
app.use('/api', apiRoutes);

// --- משימה III: Endpoint של ה-Page Renderer ---
app.get('/l/:page_id', async (req, res) => {
    try {
        const { page_id } = req.params;

        // א. שליפה ואימות
        const pageData = await LandingPage.findOne({ page_id });

        if (!pageData) {
            return res.status(404).send('<h1>404 - Page Not Found</h1>');
        }

        // ב. הזרקת HTML (Injection)
        const finalHtml = `
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageData.page_title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    ${pageData.html_code}
</body>
</html>`;

        // ג. כותרות Cacheing (חובה למהירות)
        res.setHeader('Cache-Control', 'public, max-age=604800, immutable'); // מטמון לשבוע
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.status(200).send(finalHtml);

    } catch (error) {
        console.error('❌ Error in Page Renderer:', error);
        res.status(500).send('<h1>500 - Internal Server Error</h1>');
    }
});

// --- הפעלת השרת ---
connectDB().then(() => {
    const server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    // **תיקון קריטי: הגדלת Timeout ל-10 דקות** (600,000 מילישניות)
    // זה מונע מהשרת לנתק את החיבור בזמן ש-Claude עובד.
    server.timeout = 600000;

    // הגדרת Timeout גם לשקעים
    server.keepAliveTimeout = 600000;
});