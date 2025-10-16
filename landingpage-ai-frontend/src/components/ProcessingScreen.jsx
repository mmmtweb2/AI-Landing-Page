import React from 'react';

/**
 * מסך טעינה מעוצב ומשודרג עם אנימציות
 */
const ProcessingScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-8 py-16">
            {/* אנימציית ספינר מתקדמת */}
            <div className="relative">
                {/* טבעות מסתובבות */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-8 border-purple-200 rounded-full"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-8 border-transparent border-t-purple-600 border-r-pink-600 rounded-full animate-spin"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 border-8 border-transparent border-t-blue-600 border-l-cyan-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                </div>

                {/* אייקון במרכז */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <div className="text-5xl animate-pulse">🤖</div>
                </div>
            </div>

            {/* טקסט */}
            <div className="text-center space-y-3 max-w-md">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                    יוצר את דף הנחיתה שלך...
                </h2>
                <p className="text-lg text-gray-600">
                    הבינה המלאכותית מנתחת את הפרטים שלך
                </p>
                <p className="text-sm text-gray-500 animate-pulse">
                    זה עשוי לקחת 10-30 שניות
                </p>
            </div>

            {/* אנימציית נקודות */}
            <div className="flex space-x-3 space-x-reverse">
                {[0, 150, 300].map((delay, index) => (
                    <div
                        key={index}
                        className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce shadow-lg"
                        style={{ animationDelay: `${delay}ms` }}
                    ></div>
                ))}
            </div>

            {/* שלבי העיבוד */}
            <div className="w-full max-w-md mt-8 space-y-4" dir="rtl">
                {[
                    { text: 'מנתח את הקלט שלך', done: true, icon: '📊' },
                    { text: 'בונה את המבנה', done: true, icon: '🏗️' },
                    { text: 'יוצר תוכן מקורי', inProgress: true, icon: '✍️' },
                    { text: 'מעצב את הדף', done: false, icon: '🎨' },
                    { text: 'מוסיף נגיעות אחרונות', done: false, icon: '✨' },
                ].map((step, index) => (
                    <div
                        key={index}
                        className={`flex items-center space-x-3 space-x-reverse text-sm transition-all duration-300 ${
                            step.done ? 'opacity-100' : step.inProgress ? 'opacity-100' : 'opacity-40'
                        }`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-md ${
                            step.done ? 'bg-green-500' :
                            step.inProgress ? 'bg-blue-500 animate-pulse' :
                            'bg-gray-300'
                        }`}>
                            {step.done ? '✓' : step.inProgress ? '●' : index + 1}
                        </div>
                        <span className="text-lg">{step.icon}</span>
                        <span className={`flex-1 font-medium ${
                            step.done ? 'text-gray-700' :
                            step.inProgress ? 'text-blue-600 font-semibold' :
                            'text-gray-400'
                        }`}>
                            {step.text}
                            {step.inProgress && <span className="animate-pulse">...</span>}
                        </span>
                    </div>
                ))}
            </div>

            {/* פס התקדמות */}
            <div className="w-full max-w-md">
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-shimmer bg-200%" style={{ width: '60%', backgroundSize: '200% 100%' }}></div>
                </div>
            </div>

            {/* הודעה מעודדת */}
            <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl max-w-md" dir="rtl">
                <p className="text-sm text-blue-800 text-center">
                    <span className="font-bold">💡 טיפ:</span> הדף שנוצר יהיה מותאם במיוחד עבורך על בסיס הפרטים שהזנת
                </p>
            </div>
        </div>
    );
};

export default ProcessingScreen;
