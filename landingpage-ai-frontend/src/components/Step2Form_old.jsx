import React, { useState } from 'react';

/**
 * שלב II: מטרת המרה וטון דיבור
 * שדות: goal, tone
 */
const Step2Form = ({ onNext, onBack, initialData = {} }) => {
    const [formData, setFormData] = useState({
        goal: initialData.goal || '',
        tone: initialData.tone || '',
    });

    const [errors, setErrors] = useState({});

    // אופציות מוגדרות מראש
    const goalOptions = [
        { value: 'איסוף לידים', label: 'איסוף לידים' },
        { value: 'מכירת מוצר', label: 'מכירת מוצר' },
        { value: 'הרשמה לאירוע', label: 'הרשמה לאירוע' },
        { value: 'הורדת תוכן', label: 'הורדת תוכן' },
        { value: 'אחר', label: 'אחר' },
    ];

    const toneOptions = [
        { value: 'רשמי', label: 'רשמי' },
        { value: 'ידידותי', label: 'ידידותי' },
        { value: 'מקצועי', label: 'מקצועי' },
        { value: 'נלהב', label: 'נלהב' },
        { value: 'אקדמי', label: 'אקדמי' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.goal) {
            newErrors.goal = 'יש לבחור מטרת המרה';
        }

        if (!formData.tone) {
            newErrors.tone = 'יש לבחור טון דיבור';
        }

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
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">שלב 2: מטרה וטון</h2>
                <p className="text-gray-600 text-sm">מה המטרה שלך ואיך תרצה לדבר עם הקהל?</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* שדה מטרת המרה */}
                <div>
                    <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                        מטרת דף הנחיתה <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="goal"
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right ${
                            errors.goal ? 'border-red-500' : 'border-gray-300'
                        }`}
                        dir="rtl"
                    >
                        <option value="">בחר מטרה...</option>
                        {goalOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {errors.goal && (
                        <p className="text-red-500 text-xs mt-1 text-right">{errors.goal}</p>
                    )}
                </div>

                {/* שדה טון דיבור */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                        טון הדיבור <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3" dir="rtl">
                        {toneOptions.map(option => (
                            <label
                                key={option.value}
                                className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                                    formData.tone === option.value
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-300 hover:border-blue-300'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="tone"
                                    value={option.value}
                                    checked={formData.tone === option.value}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <span className={`text-sm font-medium ${
                                    formData.tone === option.value ? 'text-blue-700' : 'text-gray-700'
                                }`}>
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </div>
                    {errors.tone && (
                        <p className="text-red-500 text-xs mt-1 text-right">{errors.tone}</p>
                    )}
                </div>

                {/* כפתורי ניווט */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                        → חזור
                    </button>
                    <button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        המשך ←
                    </button>
                </div>
            </form>

            {/* אינדיקטור שלב */}
            <div className="flex justify-center items-center space-x-2 space-x-reverse pt-4">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            </div>
        </div>
    );
};

export default Step2Form;
