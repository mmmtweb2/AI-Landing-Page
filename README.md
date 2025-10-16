# 🚀 LandingPage AI - מערכת ליצירת דפי נחיתה באמצעות בינה מלאכותית

מערכת מלאה ליצירת דפי נחיתה מעוצבים באמצעות AI, הכוללת Backend (Node.js + Express + MongoDB + Gemini AI) ו-Frontend (React + Vite + Tailwind CSS).

## 📁 מבנה הפרויקט

```
AI_LandingPage/
├── landingpage-ai-backend/     # שרת Backend
│   ├── models/                 # מודלים של MongoDB
│   ├── utils/                  # פונקציות עזר ו-API routes
│   ├── server.js              # נקודת הכניסה של השרת
│   └── .env                   # משתני סביבה (לא כלול)
│
└── landingpage-ai-frontend/    # אפליקציית Frontend
    ├── src/
    │   ├── components/        # קומפוננטות React
    │   ├── App.jsx           # רכיב ראשי
    │   └── index.css         # Tailwind CSS
    └── package.json
```

## 🛠️ התקנה והפעלה

### שלב 1: הגדרת Backend

1. עבור לתיקיית הbackend:
```bash
cd landingpage-ai-backend
```

2. התקן תלויות:
```bash
npm install
```

3. צור קובץ `.env` עם המשתנים הבאים:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
ANTHROPIC_API_KEY=your_anthropic_api_key
```

4. הרץ את השרת:
```bash
node server.js
```

השרת יפעל על `http://localhost:3000`

### שלב 2: הגדרת Frontend

1. עבור לתיקיית הfrontend:
```bash
cd landingpage-ai-frontend
```

2. התקן תלויות:
```bash
npm install
```

3. הרץ את שרת הפיתוח:
```bash
npm run dev
```

האפליקציה תפעל על `http://localhost:5173`

## 📋 Flow השימוש

### 1. משתמש ממלא 3 שלבים:

**שלב 1 - פרטי העסק:**
- שם העסק/מוצר
- תיאור קצר
- נושא הדף

**שלב 2 - מטרה וטון:**
- מטרת המרה (לידים, מכירה, הרשמה וכו')
- טון דיבור (רשמי, ידידותי, מקצועי וכו')

**שלב 3 - עיצוב:**
- סגנון עיצובי
- צבע דומיננטי

### 2. המערכת יוצרת את הדף:

- Frontend שולח את הנתונים ל-Backend
- Backend בונה פרומפט מפורט ושולח ל-Gemini AI
- Gemini AI מחזיר קוד HTML עם Tailwind CSS
- Backend שומר את הדף ב-MongoDB ומחזיר `page_id`
- Frontend מציג קישור לדף שנוצר

### 3. צפייה בדף:

הדף זמין בכתובת: `http://localhost:3000/l/{page_id}`

## 🌐 API Endpoints

### Backend (Port 3000)

| Method | Endpoint | תיאור |
|--------|----------|-------|
| GET | `/` | בדיקת תקינות השרת |
| POST | `/api/generate` | יצירת דף נחיתה חדש |
| GET | `/l/:page_id` | הצגת דף נחיתה |

### דוגמת בקשה ל-`/api/generate`:

```json
{
  "name": "קורס פיתוח ווב",
  "description": "קורס מקיף ללימוד פיתוח אתרים",
  "theme": "חינוך",
  "goal": "הרשמה לאירוע",
  "tone": "מקצועי",
  "style": "מודרני",
  "color": "כחול"
}
```

### תגובה:

```json
{
  "success": true,
  "page_id": "abc123xyz"
}
```

## 🎨 טכנולוגיות

### Backend:
- **Node.js** + **Express** - שרת ו-API
- **MongoDB** + **Mongoose** - מסד נתונים
- **Gemini AI** - יצירת תוכן באמצעות AI
- **CORS** - תמיכה בבקשות Cross-Origin
- **dotenv** - ניהול משתני סביבה

### Frontend:
- **React 18** - ספריית UI
- **Vite** - כלי בנייה מהיר
- **Tailwind CSS** - פריימוורק CSS
- **Fetch API** - תקשורת HTTP

## 🔒 אבטחה

- הקוד מגן מפני HTML Injection בסיסי
- CORS מוגדר למניעת בקשות לא מורשות
- ולידציה של קלט משתמש בצד Frontend וBackend

## 🚀 פיתוח עתידי

רעיונות להמשך פיתוח:
- [ ] העלאת תמונות משלב הטופס
- [ ] עריכת דפים קיימים
- [ ] מערכת משתמשים והתחברות
- [ ] ניהול דפים (מחיקה, שכפול)
- [ ] אנליטיקס לדפים
- [ ] אינטגרציה עם שירותי email marketing
- [ ] ייצוא קוד HTML לקובץ

## 📝 הערות חשובות

1. **מפתח Gemini AI**: צריך להשיג מפתח API מ-[Google AI Studio](https://makersuite.google.com/app/apikey)
2. **MongoDB**: אפשר להשתמש ב-MongoDB Atlas (חינמי) או התקנה מקומית
3. **צד לקוח בייצור**: צריך לבנות את הfrontend (`npm run build`) ולהגיש דרך שרת סטטי

## 🐛 פתרון בעיות נפוצות

### Backend לא מתחיל:
- ודא שכל משתני הסביבה ב-`.env` מוגדרים נכון
- בדוק שMongoDB פועל ונגיש

### Frontend לא מתחבר לBackend:
- ודא שהbackend רץ על port 3000
- בדוק שאין בעיות CORS

### AI לא מחזיר תוצאות:
- ודא שמפתח Gemini API תקין וזמין
- בדוק את הלוגים של השרת לשגיאות

## 📄 רישיון

MIT License - ראה קובץ LICENSE לפרטים נוספים

---

**נבנה עם ❤️ באמצעות React, Node.js, Tailwind CSS ו-Gemini AI**
