
// utils/promptEngine.js

/**
 * פונקציה לבניית הפרומפט עבור מודל ה-AI ליצירת דף נחיתה.
 * מקבלת אובייקט inputs המכיל את כל הנתונים שהוזנו על ידי המשתמש.
 *
 * @param {object} inputs - אובייקט המכיל את קלט המשתמש.
 * @param {string} inputs.theme - נושא דף הנחיתה (לדוגמה: "קורס פיתוח ווב").
 * @param {string} inputs.goal - מטרת דף הנחיתה (לדוגמה: "איסוף לידים", "מכירת מוצר").
 * @param {string} inputs.style - סגנון עיצובי (לדוגמה: "מודרני", "מינימליסטי", "טכנולוגי").
 * @param {string} inputs.name - שם העסק/מוצר.
 * @param {string} inputs.description - תיאור קצר של העסק/מוצר/שירות.
 * @param {string} inputs.tone - טון הדיבור (לדוגמה: "רשמי", "ידידותי", "מקצועי").
 * @param {string} inputs.color - צבע דומיננטי מועדף (לדוגמה: "כחול", "ירוק", "אדום").
 * @returns {string} מחרוזת הפרומפט המלאה.
 */
const PROMPT_TEMPLATE = (inputs) => {
    const { theme, goal, style, name, description, tone, color } = inputs;

    return `
אתה מומחה ליצירת דפי נחיתה (Landing Pages) באמצעות HTML ו-Tailwind CSS.
המשימה שלך היא ליצור קוד HTML עבור תוכן גוף דף נחיתה (BODY CONTENT בלבד), כולל כל התוכן והעיצוב, בהתבסס על הפרטים הבאים.
הקוד צריך להיות מודרני, רספונסיבי, אסתטי, ובעל קריאה לפעולה ברורה.
השתמש ב-Tailwind CSS בלבד לעיצוב, ולא להשתמש ב-CSS פנימי או חיצוני אחר.
ודא שכל התוכן (טקסטים, כותרות, כפתורים) יהיה בעברית.
הקפד על היררכיה נכונה של כותרות (H1, H2 וכו').
כלול לפחות כותרת ראשית (H1), פסקה תיאורית, כפתור קריאה לפעולה (Call to Action), וטופס ליצירת קשר או הרשמה (אם רלוונטי למטרה).
הטופס צריך לכלול שדות לשם, אימייל, וטלפון.

**חשוב מאוד:** אל תכלול תגיות DOCTYPE, html, head, body או script - רק את תוכן הגוף של הדף (ה-sections והאלמנטים שבתוכו).

**חשוב מאוד:** הפלט שלך חייב להיות אובייקט JSON בפורמט הבא בלבד, ללא כל טקסט נוסף לפני או אחרי.
**שים לב**: בתוך השדה "html_code", כל מרכאות כפולות (") חייבות להיות עם backslash (\\") כדי שה-JSON יהיה תקין.

{
  "page_title": "כותרת הדף (עד 60 תווים, רלוונטית לנושא)",
  "image_alt_description": "תיאור אלטרנטיבי לתמונה ראשית בדף (עד 120 תווים, אופטימלי ל-SEO)",
  "html_code": "קוד ה-HTML המלא של דף הנחיתה כאן - ודא שכל מרכאות כפולות בתוך ה-HTML מקודדות כ-\\" במקום \""
}

פרטי דף הנחיתה:

1.  **נושא דף הנחיתה (Theme):** ${theme}
2.  **מטרת דף הנחיתה (Goal):** ${goal}
3.  **שם העסק/מוצר/שירות (Name):** ${name}
4.  **תיאור קצר (Description):** ${description}
5.  **סגנון עיצובי (Style):** ${style}
6.  **טון דיבור (Tone):** ${tone}
7.  **צבע דומיננטי מועדף (Dominant Color):** ${color} (השתמש בגוונים מתאימים של צבע זה ב-Tailwind)

דגשים נוספים:
-   **רספונסיביות:** ודא שהדף נראה מצוין בכל גודל מסך (מובייל, טאבלט, דסקטופ) באמצעות קלאסים רספונסיביים של Tailwind.
-   **נגישות:** השתמש בתגיות סמנטיות ובתכונות ARIA היכן שרלוונטי.
-   **קריאה לפעולה (CTA):** כפתור ה-CTA צריך להיות בולט וברור, עם טקסט משכנע.
-   **תוכן:** צור תוכן מקורי ורלוונטי על בסיס התיאור והנושא. אם יש צורך בתמונה ראשית, הוסף קומנט במקום המתאים: \`<!-- IMAGE_PLACEHOLDER -->\`
-   **תמונות/אייקונים:** השתמש ב-placeholder לתמונות (לדוגמה, תגית \`<img>\` עם \`alt\` ו-\`src="#"\`). אם יש תמונה ראשית, הוסף את הקומנט \`<!-- IMAGE_PLACEHOLDER -->\` במקום שבו התמונה אמורה להיות.
-   **פוטר:** כלול פוטר בסיסי עם מידע על זכויות יוצרים.
-   **הימנע מ-JavaScript:** אין לכלול קוד JavaScript.
-   **צבעים ב-Tailwind:** השתמש בשמות צבעים גנריים של Tailwind (לדוגמה: \`blue\`, \`red\`, \`green\`) ובגוונים מתאימים (לדוגמה: \`500\`, \`600\`, \`700\`) בהתבסס על ה-\`Dominant Color\` שצוין. אל תנסה להשתמש בצבעים מותאמים אישית או שמות צבעים שאינם חלק מ-Tailwind.

דוגמה למבנה ה-HTML הכללי (אל תחזור על ההערות בתוך הקוד הסופי). שים לב: רק תוכן BODY, ללא תגיות html/head/body:

\`\`\`html
<!-- Hero Section -->
<section class="bg-[COLOR]-100 text-center py-20">
    <h1 class="text-5xl font-bold text-[COLOR]-800">...</h1>
    <p class="mt-4 text-xl text-gray-700">...</p>
    <!-- IMAGE_PLACEHOLDER -->
    <button class="mt-8 bg-[COLOR]-600 hover:bg-[COLOR]-700 text-white font-bold py-3 px-8 rounded-full">...CTA...</button>
</section>

<!-- Features/Benefits Section -->
<section class="py-16 px-4">
    <h2 class="text-4xl font-bold text-center text-gray-800 mb-12">...</h2>
    <div class="grid md:grid-cols-3 gap-8">
        <!-- Feature Card -->
        <div class="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 class="text-2xl font-semibold text-gray-900 mb-4">...</h3>
            <p class="text-gray-600">...</p>
        </div>
    </div>
</section>

<!-- Contact/Form Section -->
<section class="bg-gray-50 py-16 px-4">
    <h2 class="text-4xl font-bold text-center text-gray-800 mb-12">...</h2>
    <form class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <!-- Form fields: שם, אימייל, טלפון -->
    </form>
</section>

<!-- Footer -->
<footer class="bg-gray-800 text-white text-center py-8">
    <p>&copy; 2023 ${name}. כל הזכויות שמורות.</p>
</footer>
\`\`\`

שים לב: ה-HTML לא צריך לכלול תגיות DOCTYPE, html, head, body או script כי אלו מתווספות אוטומטית בשרת.

כעת, צור את אובייקט ה-JSON המלא עם כותרת הדף, תיאור ה-alt לתמונה וקוד ה-HTML, תוך החלפת \`[COLOR]\` בשם צבע גנרי מתאים מ-Tailwind (לדוגמה: \`blue\`, \`red\`, \`green\`) בהתאם ל-\`Dominant Color\` שצוין.
`;
};

module.exports = { PROMPT_TEMPLATE };