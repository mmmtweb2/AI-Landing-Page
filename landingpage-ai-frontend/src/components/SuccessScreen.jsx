import React, { useState, useEffect } from 'react';

/**
 * מסך הצלחה משודרג עם חגיגה ואנימציות
 */
const SuccessScreen = ({ pageId, onCreateAnother }) => {
    const [copied, setCopied] = useState(false);
    const [showConfetti, setShowConfetti] = useState(true);

    const pageUrl = `http://localhost:3000/l/${pageId}`;

    useEffect(() => {
        // הסתר קונפטי אחרי 3 שניות
        const timer = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

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
        <div className="flex flex-col items-center justify-center space-y-6 py-8 relative">
            {/* אפקט קונפטי */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 rounded-full animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `-${Math.random() * 20}px`,
                                backgroundColor: ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'][Math.floor(Math.random() * 5)],
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${2 + Math.random() * 2}s`,
                            }}
                        ></div>
                    ))}
                </div>
            )}

            {/* אייקון הצלחה מרשים */}
            <div className="relative animate-scale-in">
                <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                <div className="relative w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                    <svg className="w-16 h-16 text-white animate-scale-in" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ animationDelay: '0.2s' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
            </div>

            {/* טקסט הצלחה */}
            <div className="text-center space-y-3 animate-slide-up">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    הדף נוצר בהצלחה! 🎉
                </h2>
                <p className="text-lg text-gray-600">
                    דף הנחיתה המושלם שלך מוכן ומחכה לך
                </p>
            </div>

            {/* קופסת ה-URL מעוצבת */}
            <div className="w-full bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-2xl p-5 shadow-lg animate-slide-up" dir="ltr" style={{ animationDelay: '0.1s' }}>
                <label className="text-xs font-semibold text-gray-600 mb-2 block text-right" dir="rtl">
                    הקישור לדף שלך:
                </label>
                <div className="flex items-center gap-2 bg-white rounded-xl p-3 shadow-inner">
                    <code className="text-sm text-gray-700 flex-1 overflow-x-auto font-mono">
                        {pageUrl}
                    </code>
                    <button
                        onClick={handleCopy}
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 whitespace-nowrap shadow-md hover:shadow-lg transform hover:scale-105 ${
                            copied
                                ? 'bg-green-500 text-white'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                        }`}
                    >
                        {copied ? '✓ הועתק!' : '📋 העתק'}
                    </button>
                </div>
            </div>

            {/* מזהה הדף */}
            <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <p className="text-xs text-gray-500 mb-1">מזהה ייחודי:</p>
                <p className="text-lg font-mono font-bold text-gray-800 bg-white px-4 py-2 rounded-lg inline-block shadow-sm">
                    {pageId}
                </p>
            </div>

            {/* כפתורי פעולה */}
            <div className="w-full space-y-3 pt-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <button
                    onClick={handleViewPage}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3 group"
                >
                    <span className="text-2xl group-hover:scale-110 transition-transform">👁️</span>
                    <span className="text-lg">צפה בדף המושלם שלך</span>
                    <span className="text-2xl group-hover:scale-110 transition-transform">✨</span>
                </button>
                <button
                    onClick={onCreateAnother}
                    className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-200 border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                >
                    <span className="text-xl group-hover:rotate-180 transition-transform duration-300">✨</span>
                    <span>צור דף נחיתה נוסף</span>
                </button>
            </div>

            {/* כרטיסי מידע */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4 text-right" dir="rtl">
                    <div className="text-2xl mb-2">💡</div>
                    <p className="text-sm text-blue-800 font-medium">
                        <strong>טיפ:</strong> שמור את הקישור למקום בטוח. תוכל לחזור לדף בכל עת!
                    </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4 text-right" dir="rtl">
                    <div className="text-2xl mb-2">🚀</div>
                    <p className="text-sm text-purple-800 font-medium">
                        <strong>הבא:</strong> שתף את הדף שלך עם הלקוחות והתחל לקבל תוצאות!
                    </p>
                </div>
            </div>

            {/* סטטיסטיקות מהירות */}
            <div className="w-full mt-6 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-3xl font-bold text-blue-600">1</div>
                        <div className="text-xs text-gray-600 mt-1">דף נוצר</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-purple-600">100%</div>
                        <div className="text-xs text-gray-600 mt-1">מותאם אישית</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-green-600">∞</div>
                        <div className="text-xs text-gray-600 mt-1">אפשרויות</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessScreen;
