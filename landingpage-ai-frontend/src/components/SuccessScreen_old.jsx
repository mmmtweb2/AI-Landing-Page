import React, { useState } from 'react';

/**
 * מסך הצלחה המוצג לאחר יצירת הדף
 * מציג את ה-page_id וקישור לצפייה בדף
 */
const SuccessScreen = ({ pageId, onCreateAnother }) => {
    const [copied, setCopied] = useState(false);

    // בהנחה שהשרת רץ על localhost:3000
    const pageUrl = `http://localhost:3000/l/${pageId}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(pageUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleViewPage = () => {
        window.open(pageUrl, '_blank');
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-6 py-8">
            {/* אייקון הצלחה */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>

            {/* טקסט הצלחה */}
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">הדף נוצר בהצלחה!</h2>
                <p className="text-gray-600">
                    דף הנחיתה שלך מוכן ומחכה לך
                </p>
            </div>

            {/* קופסת ה-URL */}
            <div className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg p-4" dir="ltr">
                <div className="flex items-center justify-between gap-2">
                    <code className="text-sm text-gray-700 flex-1 overflow-x-auto">
                        {pageUrl}
                    </code>
                    <button
                        onClick={handleCopy}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
                    >
                        {copied ? '✓ הועתק' : 'העתק'}
                    </button>
                </div>
            </div>

            {/* מזהה הדף */}
            <div className="text-center">
                <p className="text-xs text-gray-500">מזהה הדף</p>
                <p className="text-sm font-mono font-semibold text-gray-700">{pageId}</p>
            </div>

            {/* כפתורי פעולה */}
            <div className="w-full space-y-3 pt-4">
                <button
                    onClick={handleViewPage}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                    👁️ צפה בדף
                </button>
                <button
                    onClick={onCreateAnother}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                    ✨ צור דף נוסף
                </button>
            </div>

            {/* הערה קטנה */}
            <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-4 text-right" dir="rtl">
                <p className="text-xs text-blue-800">
                    💡 <strong>טיפ:</strong> שמור את הקישור למקום בטוח. תוכל לחזור לדף בכל עת.
                </p>
            </div>
        </div>
    );
};

export default SuccessScreen;
