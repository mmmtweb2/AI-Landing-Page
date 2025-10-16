import React from 'react';

/**
 * מסך טעינה מעוצב המוצג בזמן יצירת הדף ע"י ה-AI
 */
const ProcessingScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-6 py-12">
            {/* אנימציית ספינר */}
            <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
                <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>

            {/* טקסט */}
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">יוצר את דף הנחיתה שלך...</h2>
                <p className="text-gray-600">
                    הבינה המלאכותית עובדת על יצירת הדף המושלם עבורך
                </p>
                <p className="text-sm text-gray-500">
                    זה עשוי לקחת מספר שניות
                </p>
            </div>

            {/* אנימציית נקודות */}
            <div className="flex space-x-2 space-x-reverse">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>

            {/* שלבי העיבוד (אופציונלי) */}
            <div className="w-full max-w-sm mt-8 space-y-3" dir="rtl">
                <div className="flex items-center space-x-3 space-x-reverse text-sm">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <span className="text-gray-700">מנתח את הקלט שלך</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse text-sm">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <span className="text-gray-700">בונה את המבנה</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse text-sm">
                    <div className="w-5 h-5 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-700">יוצר את התוכן...</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse text-sm">
                    <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                    <span className="text-gray-400">מעצב את הדף</span>
                </div>
            </div>
        </div>
    );
};

export default ProcessingScreen;
