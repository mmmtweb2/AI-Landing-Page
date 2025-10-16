import React, { useState } from 'react';

/**
 * שלב I: ליבה עסקית (Business Core)
 * שדות: name, description, theme
 */
const Step1Form = ({ onNext, initialData = {} }) => {
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        description: initialData.description || '',
        theme: initialData.theme || '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // נקה שגיאה כשהמשתמש מתחיל להקליד
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'שם העסק/מוצר הוא שדה חובה';
        } else if (formData.name.length < 2) {
            newErrors.name = 'שם העסק/מוצר חייב להכיל לפחות 2 תווים';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'תיאור הוא שדה חובה';
        } else if (formData.description.length < 10) {
            newErrors.description = 'התיאור חייב להכיל לפחות 10 תווים';
        }

        if (!formData.theme.trim()) {
            newErrors.theme = 'נושא דף הנחיתה הוא שדה חובה';
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
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg transform hover:scale-110 transition-transform">
                    <span className="text-3xl">💼</span>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    שלב 1: פרטי העסק
                </h2>
                <p className="text-gray-600">ספר לנו על העסק או המוצר שלך כדי שנוכל ליצור את הדף המושלם</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* שדה שם העסק/מוצר */}
                <div className="group">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 text-right flex items-center justify-end gap-2">
                        <span className="text-red-500 text-lg">*</span>
                        שם העסק/מוצר/שירות
                        <span className="text-xl">🏢</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="לדוגמה: קורס פיתוח ווב מתקדם"
                        className={`w-full px-5 py-3.5 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-right transition-all duration-200 ${
                            errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-blue-300 bg-white'
                        }`}
                        dir="rtl"
                    />
                    {errors.name && (
                        <p className="text-red-600 text-sm mt-2 text-right flex items-center justify-end gap-1 animate-slide-down">
                            <span>⚠️</span> {errors.name}
                        </p>
                    )}
                </div>

                {/* שדה תיאור */}
                <div className="group">
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2 text-right flex items-center justify-end gap-2">
                        <span className="text-red-500 text-lg">*</span>
                        תיאור קצר
                        <span className="text-xl">📝</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="תאר בקצרה את העסק, המוצר או השירות שלך..."
                        rows="5"
                        className={`w-full px-5 py-3.5 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-right resize-none transition-all duration-200 ${
                            errors.description ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-blue-300 bg-white'
                        }`}
                        dir="rtl"
                    />
                    {errors.description && (
                        <p className="text-red-600 text-sm mt-2 text-right flex items-center justify-end gap-1 animate-slide-down">
                            <span>⚠️</span> {errors.description}
                        </p>
                    )}
                </div>

                {/* שדה נושא */}
                <div className="group">
                    <label htmlFor="theme" className="block text-sm font-semibold text-gray-700 mb-2 text-right flex items-center justify-end gap-2">
                        <span className="text-red-500 text-lg">*</span>
                        נושא דף הנחיתה
                        <span className="text-xl">🎯</span>
                    </label>
                    <input
                        type="text"
                        id="theme"
                        name="theme"
                        value={formData.theme}
                        onChange={handleChange}
                        placeholder="לדוגמה: טכנולוגיה, חינוך, בריאות"
                        className={`w-full px-5 py-3.5 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-right transition-all duration-200 ${
                            errors.theme ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-blue-300 bg-white'
                        }`}
                        dir="rtl"
                    />
                    {errors.theme && (
                        <p className="text-red-600 text-sm mt-2 text-right flex items-center justify-end gap-1 animate-slide-down">
                            <span>⚠️</span> {errors.theme}
                        </p>
                    )}
                </div>

                {/* כפתור המשך */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                >
                    <span>המשך לשלב הבא</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">←</span>
                </button>
            </form>

            {/* אינדיקטור שלב */}
            <div className="flex justify-center items-center gap-2 pt-6">
                <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                        1
                    </div>
                    <span className="text-xs text-blue-600 font-medium mt-1">פרטים</span>
                </div>
                <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                        2
                    </div>
                    <span className="text-xs text-gray-400 mt-1">מטרה</span>
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

export default Step1Form;
