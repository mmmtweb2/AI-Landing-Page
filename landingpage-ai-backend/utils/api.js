// routes/api.js
const express = require('express');
const { v4: uuidv4 } = require('uuid'); // שימוש ב-uuid כפי שנדרש במפרט
const { nanoid } = require('nanoid');
const LandingPage = require('../models/LandingPage');
const { PROMPT_TEMPLATE } = require('../utils/promptEngine');

const router = express.Router();

// --- הגדרת לקוח Anthropic AI ---
// ודא שהתקנת את החבילה: npm install @anthropic-ai/sdk
const Anthropic = require("@anthropic-ai/sdk");

// טעינת מפתח ה-API ממשתני הסביבה
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

/**
 * POST /api/generate
 * נקודת קצה ליצירת דף נחיתה חדש
 * Body: { theme, goal, style, name, description, tone, color }
 */
router.post('/generate', async (req, res) => {
    try {
        // 1. קליטת הקלט ואימות בסיסי
        const inputs = req.body;
        if (!inputs.name || !inputs.description) {
            return res.status(400).json({ message: 'שדות חובה חסרים (שם ותיאור).' });
        }

        // 2. בניית הפרומפט למודל ה-AI
        const prompt = PROMPT_TEMPLATE(inputs);

        // 3. שליחת הבקשה ל-Anthropic AI
        const message = await anthropic.messages.create({
            model: "claude-sonnet-4-5",
            max_tokens: 4096,
            messages: [
                { role: "user", content: prompt }
            ]
        });

        // 4. עיבוד התשובה מה-AI
        const text = message.content[0].text;

        // הסרת תגיות Markdown אפשריות וניקוי התשובה
        let cleanedJsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();

        // ניסיון לחלץ JSON אם יש טקסט נוסף
        const jsonMatch = cleanedJsonString.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            cleanedJsonString = jsonMatch[0];
        }

        console.log('🔍 Attempting to parse AI response...');
        console.log('📝 First 500 chars of response:', cleanedJsonString.substring(0, 500));

        let aiOutput;
        try {
            aiOutput = JSON.parse(cleanedJsonString);
        } catch (parseError) {
            console.error('❌ JSON Parse Error:', parseError.message);
            console.error('📄 Full response (first 1000 chars):', cleanedJsonString.substring(0, 1000));

            // ניסיון לתקן JSON פגום - החלפת מרכאות כפולות לא מקודדות
            console.log('🔧 Attempting to fix malformed JSON...');
            throw new Error(`Failed to parse AI response as JSON: ${parseError.message}`);
        }

        // בדיקת שדות חובה
        if (!aiOutput.html_code || !aiOutput.page_title || !aiOutput.image_alt_description) {
            console.error('❌ Missing required fields in AI response');
            console.error('📊 Received fields:', Object.keys(aiOutput));
            throw new Error('AI response is missing required fields');
        }

        console.log('✅ Successfully parsed AI response');
        console.log('📊 Page title:', aiOutput.page_title);
        console.log('📊 HTML code length:', aiOutput.html_code.length);

        // 5. יצירת אובייקט לשמירה במסד הנתונים
        const newPage = new LandingPage({
            page_id: nanoid(10), // יצירת מזהה ייחודי קצר
            original_inputs: inputs,
            html_code: aiOutput.html_code,
            page_title: aiOutput.page_title,
            image_alt_description: aiOutput.image_alt_description,
            // שדות נוספים יקבלו ערכי ברירת מחדל מהסכמה
        });

        // 6. שמירת דף הנחיתה ב-MongoDB
        await newPage.save();

        // 7. שליחת תשובה מוצלחת למשתמש
        res.status(200).json({
            success: true,
            page_id: newPage.page_id
        });

    } catch (error) {
        console.error('❌ Error during landing page generation:', error);
        res.status(500).json({ message: 'שגיאה פנימית בשרת במהלך יצירת הדף.' });
    }
});

module.exports = router;