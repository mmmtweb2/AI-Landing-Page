import React, { useState } from 'react';
import Step1Form from './components/Step1Form';
import Step2Form from './components/Step2Form';
import Step3Form from './components/Step3Form';
import ProcessingScreen from './components/ProcessingScreen';
import SuccessScreen from './components/SuccessScreen';

function App() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [pageId, setPageId] = useState(null);
    const [error, setError] = useState(null);

    // פונקציה לעדכון הנתונים והתקדמות לשלב הבא
    const handleNext = (data) => {
        const updatedData = { ...formData, ...data };
        setFormData(updatedData);

        if (step < 3) {
            setStep(step + 1);
        } else {
            // אם סיימנו את שלב 3, עוברים ל-Processing
            setStep('processing');
            handleSubmit(updatedData);
        }
    };

    // פונקציה לחזרה לשלב הקודם
    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    // פונקציית השליחה ל-Backend
    const handleSubmit = async (finalData) => {
        try {
            setError(null);

            // שליחת הבקשה ל-API
            const response = await fetch('http://localhost:3000/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalData),
            });

            if (!response.ok) {
                throw new Error('שגיאה ביצירת הדף. נסה שוב.');
            }

            const result = await response.json();

            if (result.success && result.page_id) {
                setPageId(result.page_id);
                setStep('success');
            } else {
                throw new Error('תגובה לא תקינה מהשרת');
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            setError(err.message || 'שגיאה בלתי צפויה. נסה שוב.');
            setStep(3); // חזרה לשלב האחרון
        }
    };

    // פונקציה ליצירת דף נוסף
    const handleCreateAnother = () => {
        setStep(1);
        setFormData({});
        setPageId(null);
        setError(null);
    };

    // פונקציה לרינדור השלב הנוכחי
    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1Form onNext={handleNext} initialData={formData} />;
            case 2:
                return <Step2Form onNext={handleNext} onBack={handleBack} initialData={formData} />;
            case 3:
                return <Step3Form onNext={handleNext} onBack={handleBack} initialData={formData} />;
            case 'processing':
                return <ProcessingScreen />;
            case 'success':
                return <SuccessScreen pageId={pageId} onCreateAnother={handleCreateAnother} />;
            default:
                return <div className="text-center text-gray-500">טוען...</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
            {/* רקע אנימציה */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
                {/* כותרת ראשית */}
                <div className="text-center mb-8 animate-slide-down">
                    <div className="inline-block mb-4">
                        <div className="text-6xl mb-2 animate-float">🚀</div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        LandingPage AI
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-medium">
                        צור דף נחיתה מקצועי ומעוצב תוך דקות ספורות
                        <br />
                        <span className="text-purple-600 font-bold">באמצעות בינה מלאכותית מתקדמת</span>
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
                        <span className="inline-flex items-center gap-1 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            מהיר
                        </span>
                        <span className="inline-flex items-center gap-1 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            חכם
                        </span>
                        <span className="inline-flex items-center gap-1 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">
                            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                            מקצועי
                        </span>
                    </div>
                </div>

                {/* קונטיינר הטופס */}
                <div className="w-full max-w-3xl animate-scale-in">
                    <div className="bg-white/90 backdrop-blur-lg p-8 md:p-10 rounded-3xl shadow-2xl border border-white/50 relative overflow-hidden">
                        {/* גרדיאנט עליון */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                        {/* הצגת שגיאה אם יש */}
                        {error && step === 3 && (
                            <div className="mb-6 bg-red-50/90 backdrop-blur-sm border-2 border-red-300 rounded-xl p-4 text-right animate-slide-down" dir="rtl">
                                <div className="flex items-center gap-3">
                                    <div className="text-3xl">⚠️</div>
                                    <p className="text-red-800 font-medium flex-1">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* רינדור השלב הנוכחי */}
                        <div className="animate-fade-in">
                            {renderStep()}
                        </div>
                    </div>
                </div>

                {/* פוטר */}
                <footer className="mt-12 text-center">
                    <div className="bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 inline-block shadow-lg">
                        <p className="text-sm text-gray-700 font-medium">
                            נבנה עם <span className="text-red-500 animate-pulse">❤️</span> באמצעות React, Tailwind CSS ו-Gemini AI
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;
