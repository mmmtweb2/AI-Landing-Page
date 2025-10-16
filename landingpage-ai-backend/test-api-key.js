// test-api-key.js - סקריפט לבדיקת תקינות מפתח ה-API של Anthropic

const Anthropic = require("@anthropic-ai/sdk");
const dotenv = require('dotenv');

// טעינת משתני הסביבה
dotenv.config();

async function testApiKey() {
    console.log('🔍 בודק תקינות מפתח ה-API של Anthropic...\n');

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
        console.error('❌ שגיאה: לא נמצא מפתח API בקובץ .env');
        console.log('💡 ודא שיש משתנה ANTHROPIC_API_KEY בקובץ .env');
        process.exit(1);
    }

    console.log(`✅ מפתח API נמצא: ${apiKey.substring(0, 15)}...`);
    console.log(`📏 אורך המפתח: ${apiKey.length} תווים\n`);

    const anthropic = new Anthropic({ apiKey });

    try {
        console.log('🚀 שולח בקשת בדיקה ל-API...\n');

        const message = await anthropic.messages.create({
            model: "claude-sonnet-4-5",
            max_tokens: 100,
            messages: [
                { role: "user", content: "Say 'API test successful' in Hebrew" }
            ]
        });

        console.log('✅ ✅ ✅ הבדיקה הצליחה!\n');
        console.log('📊 פרטי התשובה:');
        console.log('   מודל:', message.model);
        console.log('   תוכן:', message.content[0].text);
        console.log('   טוקנים שנוצרו:', message.usage.output_tokens);
        console.log('\n✨ המפתח תקין והמודל עובד כראוי!');

    } catch (error) {
        console.error('\n❌ ❌ ❌ הבדיקה נכשלה!\n');
        console.error('סוג השגיאה:', error.constructor.name);
        console.error('קוד סטטוס:', error.status);
        console.error('הודעת שגיאה:', error.message);

        if (error.error) {
            console.error('\nפרטי השגיאה מה-API:');
            console.error(JSON.stringify(error.error, null, 2));
        }

        console.log('\n💡 הצעות לפתרון:');
        if (error.status === 401) {
            console.log('   - המפתח לא תקין או לא פעיל');
            console.log('   - בדוק שהעתקת את המפתח המלא מהקונסול של Anthropic');
        } else if (error.status === 404) {
            console.log('   - המודל אינו זמין או שם המודל שגוי');
            console.log('   - נסה מודל אחר כמו: claude-3-sonnet-20240229');
        } else if (error.status === 429) {
            console.log('   - חרגת ממכסת הבקשות');
            console.log('   - המתן מספר דקות ונסה שוב');
        }

        process.exit(1);
    }
}

testApiKey();
