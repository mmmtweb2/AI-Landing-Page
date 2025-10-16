// models/LandingPage.js

const mongoose = require('mongoose');

const landingPageSchema = new mongoose.Schema({
    page_id: { 
        type: String, 
        required: true, 
        unique: true 
    }, 
    user_id: { 
        type: String, 
        required: true,
        default: 'anonymous_mvp' // ערך ברירת מחדל לשלב ה-MVP
    }, 
    status: { 
        type: String, 
        enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'], 
        default: 'DRAFT' 
    },
    
    // נתוני הקלט המקוריים שנדרשים להמשך העבודה
    original_inputs: {
        type: Object, // נשמור את כל ה-7 שדות שהמשתמש הזין כאן
        required: true
    },

    // הפלט שנוצר על ידי Claude AI
    html_code: { 
        type: String, 
        required: true,
        maxlength: 100000 // הגבלה סבירה לקוד HTML מלא
    },
    page_title: { 
        type: String, 
        required: true 
    },
    image_alt_description: { 
        type: String 
    }, 

    // שדות עתידיים
    hero_image_url: { type: String, default: null },
    analytics_script: { type: String, default: null },

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LandingPage', landingPageSchema);