import React, { useState } from 'react';

/**
 * שלב II: מטרת המרה וטון דיבור - עיצוב משודרג
 * שדות: goal, tone
 */
const Step2Form = ({ onNext, onBack, initialData = {} }) => {
    const [formData, setFormData] = useState({
        goal: initialData.goal || '',
        tone: initialData.tone || '',
    });

    const [errors, setErrors] = useState({});

    const goalOptions = [
        { value: 'איסוף לידים', label: 'איסוף לידים', icon: '📧', color: 'blue' },
        { value: 'מכירת מוצר', label: 'מכירת מוצר', icon: '🛒', color: 'green' },
        { value: 'הרשמה לאירוע', label: 'הרשמה לאירוע', icon: '🎫', color: 'purple' },
        { value: 'הורדת תוכן', label: 'הורדת תוכן', icon: '📥', color: 'orange' },
        { value: 'אחר', label: 'אחר', icon: '✨', color: 'pink' },
    ];

    const toneOptions = [
        { value: 'רשמי', label: 'רשמי', icon: '👔', desc: 'מקצועי ורציני' },
        { value: 'ידידותי', label: 'ידידותי', icon: '😊', desc: 'חם ונגיש' },
        { value: 'מקצועי', label: 'מקצועי', icon: '💼', desc: 'עסקי ואמין' },
        { value: 'נלהב', label: 'נלהב', icon: '🔥', desc: 'אנרגטי ומרגש' },
        { value: 'אקדמי', label: 'אקדמי', icon: '🎓', desc: 'מדעי ומעמיק' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSelection = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.goal) newErrors.goal = 'יש לבחור מטרת המרה';
        if (!formData.tone) newErrors.tone = 'יש לבחור טון דיבור';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onNext(formData);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-lg transform hover:scale-110 transition-transform">
                    <span className="text-3xl">🎯</span>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    שלב 2: מטרה וטון
                </h2>
                <p className="text-gray-600">הגדר את יעד הדף והסגנון בו תרצה לתקשר</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* שדה מטרת המרה */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 text-right flex items-center justify-end gap-2">
                        <span className="text-red-500 text-lg">*</span>
                        מטרת דף הנחיתה
                        <span className="text-xl">🎯</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3" dir="rtl">
                        {goalOptions.map(option => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelection('goal', option.value)}
                                className={`p-4 border-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                                    formData.goal === option.value
                                        ? 'border-purple-500 bg-purple-50 shadow-lg'
                                        : 'border-gray-200 hover:border-purple-300 bg-white'
                                }`}
                            >
                                <div className="text-3xl mb-2">{option.icon}</div>
                                <div className={`text-sm font-medium ${
                                    formData.goal === option.value ? 'text-purple-700' : 'text-gray-700'
                                }`}>
                                    {option.label}
                                </div>
                            </button>
                        ))}
                    </div>
                    {errors.goal && (
                        <p className="text-red-600 text-sm mt-2 text-right flex items-center justify-end gap-1 animate-slide-down">
                            <span>⚠️</span> {errors.goal}
                        </p>
                    )}
                </div>

                {/* שדה טון דיבור */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 text-right flex items-center justify-end gap-2">
                        <span className="text-red-500 text-lg">*</span>
                        טון הדיבור
                        <span className="text-xl">💬</span>
                    </label>
                    <div className="space-y-2" dir="rtl">
                        {toneOptions.map(option => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelection('tone', option.value)}
                                className={`w-full p-4 border-2 rounded-xl transition-all duration-200 flex items-center justify-between hover:scale-[1.02] ${
                                    formData.tone === option.value
                                        ? 'border-purple-500 bg-purple-50 shadow-lg'
                                        : 'border-gray-200 hover:border-purple-300 bg-white'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl">{option.icon}</div>
                                    <div className="text-right">
                                        <div className={`font-semibold ${
                                            formData.tone === option.value ? 'text-purple-700' : 'text-gray-800'
                                        }`}>
                                            {option.label}
                                        </div>
                                        <div className="text-xs text-gray-500">{option.desc}</div>
                                    </div>
                                </div>
                                {formData.tone === option.value && (
                                    <div className="text-purple-500 text-xl">✓</div>
                                )}
                            </button>
                        ))}
                    </div>
                    {errors.tone && (
                        <p className="text-red-600 text-sm mt-2 text-right flex items-center justify-end gap-1 animate-slide-down">
                            <span>⚠️</span> {errors.tone}
                        </p>
                    )}
                </div>

                {/* כפתורי ניווט */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                    >
                        <span className="transform group-hover:-translate-x-1 transition-transform">→</span>
                        <span>חזור</span>
                    </button>
                    <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                    >
                        <span>המשך</span>
                        <span className="transform group-hover:translate-x-1 transition-transform">←</span>
                    </button>
                </div>
            </form>

            {/* אינדיקטור שלב */}
            <div className="flex justify-center items-center gap-2 pt-6">
                <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold shadow-md">
                        ✓
                    </div>
                    <span className="text-xs text-green-600 font-medium mt-1">פרטים</span>
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-purple-500 rounded-full"></div>
                <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold shadow-lg">
                        2
                    </div>
                    <span className="text-xs text-purple-600 font-medium mt-1">מטרה</span>
                </div>
                <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                        3
                    </div>
                    <span className="text-xs text-gray-400 mt-1">עיצוב</span>
                </div>
            </div>
        </div>
    );
};

export default Step2Form;
