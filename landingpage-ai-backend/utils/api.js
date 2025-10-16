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

// פונקציית עזר לניקוי וניתוח JSON
const cleanAndParseJson = (text) => {
    // 1. הסרת תגי עטיפה אפשריים (```json)
    let jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();

    // 2. ניסיון לאתר את אובייקט ה-JSON ולחלץ אותו
    const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        jsonString = jsonMatch[0];
    }

    // 3. ניסיון לפרסר את ה-JSON
    try {
        // החלפה קריטית: Claude לפעמים לא מקודד מרכאות כפולות בתוך ה-HTML
        // זהו ניסיון תיקון גס למקרה שה-JSON נשבר בגלל זה.
        // אנו נסמוך על ההנחיה בפרומפט, אך זוהי שכבת הגנה נוספת.
        return JSON.parse(jsonString);
    } catch (e) {
        // console.error('Failed to parse JSON after cleaning:', e.message);
        return null; // חוזר null אם הניתוח נכשל
    }
};

/**
 * POST /api/generate
 * נקודת קצה ליצירת דף נחיתה חדש
 * Body: { theme, goal, style, name, description, tone, color }
 */
router.post('/generate', async (req, res) => {
    const inputs = req.body;
    let successfulParse = null;

    // אימות קלט בסיסי
    if (!inputs.name || !inputs.description || !inputs.theme) {
        return res.status(400).json({ message: 'שדות חובה חסרים.' });
    }

    // המערך messages ינהל את ההקשר של השיחה עם Claude
    let messages = [{ role: 'user', content: PROMPT_TEMPLATE(inputs) }];

    for (let attempt = 1; attempt <= 2; attempt++) {
        try {
            console.log(`🤖 Starting AI generation attempt #${attempt}`);

            const response = await anthropic.messages.create({
                model: "claude-3-sonnet-20240229", // מודל Sonnet יציב ומומלץ
                max_tokens: 4096,
                messages: messages, // שולח את ההקשר המלא (כולל תיקון אם קיים)
            });

            const rawResponseText = response.content[0].text;
            successfulParse = cleanAndParseJson(rawResponseText);

            if (successfulParse) {
                console.log('✅ Successfully parsed JSON on attempt #' + attempt);
                // הצלחה! יוצאים מהלולאה
                break;
            }

            // אם ניתוח JSON נכשל:
            if (attempt === 1) {
                console.log('❌ JSON failed on first attempt. Sending correction prompt...');

                // הוספת התגובה הגולמית הכושלת להקשר
                messages.push({ role: 'assistant', content: rawResponseText });

                // הוספת הנחיית התיקון להקשר (ניסיון שני יהיה עם ההקשר הזה)
                messages.push({
                    role: 'user',
                    content: "הפלט הקודם שלך אינו JSON תקין. החזר **אך ורק** את אובייקט ה-JSON המלא והתקין, ללא טקסט נוסף מחוץ לו. זה קריטי."
                });
            } else {
                // ניסיון תיקון שני נכשל
                throw new Error('AI failed to return valid JSON after correction prompt.');
            }

        } catch (error) {
            console.error('❌ Error during AI call:', error.message);
            // טיפול בשגיאת API (כגון מפתח לא תקין או מגבלת שימוש)
            return res.status(500).json({
                success: false,
                message: 'שגיאה חמורה: ה-AI לא הצליח להגיב. בדוק את מפתח ה-API.'
            });
        }
    }

    // --- שמירה ב-DB והחזרת תגובה ---
    if (successfulParse && successfulParse.html_code) {
        // בדיקת שדות חובה
        if (!successfulParse.html_code || !successfulParse.page_title || !successfulParse.image_alt_description) {
            console.error('❌ Missing required fields in AI response');
            console.error('📊 Received fields:', Object.keys(successfulParse));
            return res.status(500).json({
                success: false,
                message: 'AI response is missing required fields'
            });
        }

        console.log('📊 Page title:', successfulParse.page_title);
        console.log('📊 HTML code length:', successfulParse.html_code.length);

        const pageId = nanoid(10); // nanoid עדיף לקישורים

        const newPage = new LandingPage({
            page_id: pageId,
            user_id: 'anonymous_mvp',
            original_inputs: inputs,
            html_code: successfulParse.html_code,
            page_title: successfulParse.page_title,
            image_alt_description: successfulParse.image_alt_description,
        });

        await newPage.save();

        return res.status(200).json({
            success: true,
            page_id: pageId,
            message: 'דף הנחיתה נוצר בהצלחה!'
        });
    }

    // כשלון סופי לאחר 2 ניסיונות
    return res.status(500).json({
        success: false,
        message: 'אירעה שגיאה. ה-AI לא הצליח לייצר דף תקין לאחר ניסיון תיקון.'
    });
});

module.exports = router;