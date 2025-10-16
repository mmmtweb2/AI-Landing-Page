import React, { useState } from 'react';

/**
 * שלב III: עיצוב וצבע - עיצוב משודרג
 * שדות: style, color
 */
const Step3Form = ({ onNext, onBack, initialData = {} }) => {
    const [formData, setFormData] = useState({
        style: initialData.style || '',
        color: initialData.color || '',
    });

    const [errors, setErrors] = useState({});

    const styleOptions = [
        { value: 'מודרני', label: 'מודרני', description: 'עיצוב נקי ועכשווי', icon: '✨', gradient: 'from-blue-400 to-cyan-400' },
        { value: 'מינימליסטי', label: 'מינימליסטי', description: 'פשוט ומרווח', icon: '⚪', gradient: 'from-gray-400 to-gray-500' },
        { value: 'טכנולוגי', label: 'טכנולוגי', description: 'פיוצ׳ריסטי ומתקדם', icon: '🚀', gradient: 'from-purple-400 to-indigo-500' },
        { value: 'עסקי', label: 'עסקי', description: 'מקצועי ורשמי', icon: '💼', gradient: 'from-slate-500 to-blue-600' },
        { value: 'יצירתי', label: 'יצירתי', description: 'ייחודי וצבעוני', icon: '🎨', gradient: 'from-pink-400 to-orange-400' },
    ];

    const colorOptions = [
        { value: 'כחול', label: 'כחול', hex: '#3B82F6', gradient: 'from-blue-400 to-blue-600' },
        { value: 'ירוק', label: 'ירוק', hex: '#10B981', gradient: 'from-green-400 to-emerald-600' },
        { value: 'סגול', label: 'סגול', hex: '#8B5CF6', gradient: 'from-purple-400 to-violet-600' },
        { value: 'אדום', label: 'אדום', hex: '#EF4444', gradient: 'from-red-400 to-rose-600' },
        { value: 'כתום', label: 'כתום', hex: '#F59E0B', gradient: 'from-orange-400 to-amber-600' },
        { value: 'ורוד', label: 'ורוד', hex: '#EC4899', gradient: 'from-pink-400 to-fuchsia-600' },
    ];

    const handleSelection = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.style) newErrors.style = 'יש לבחור סגנון עיצובי';
        if (!formData.color) newErrors.color = 'יש לבחור צבע דומיננטי';
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
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-600 rounded-2xl mb-4 shadow-lg transform hover:scale-110 transition-transform">
                    <span className="text-3xl">🎨</span>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
                    שלב 3: עיצוב וצבעים
                </h2>
                <p className="text-gray-600">בחר את הסגנון והצבע שמתאים לך ביותר</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* בחירת סגנון */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 text-right flex items-center justify-end gap-2">
                        <span className="text-red-500 text-lg">*</span>
                        סגנון עיצובי
                        <span className="text-xl">✨</span>
                    </label>
                    <div className="space-y-2" dir="rtl">
                        {styleOptions.map(option => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelection('style', option.value)}
                                className={`w-full p-4 border-2 rounded-xl transition-all duration-200 flex items-center justify-between hover:scale-[1.02] group ${
                                    formData.style === option.value
                                        ? 'border-pink-500 bg-pink-50 shadow-lg'
                                        : 'border-gray-200 hover:border-pink-300 bg-white'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                                        {option.icon}
                                    </div>
                                    <div className="text-right">
                                        <div className={`font-bold text-lg ${
                                            formData.style === option.value ? 'text-pink-700' : 'text-gray-800'
                                        }`}>
                                            {option.label}
                                        </div>
                                        <div className="text-xs text-gray-500">{option.description}</div>
                                    </div>
                                </div>
                                {formData.style === option.value && (
                                    <div className="text-pink-500 text-2xl">✓</div>
                                )}
                            </button>
                        ))}
                    </div>
                    {errors.style && (
                        <p className="text-red-600 text-sm mt-2 text-right flex items-center justify-end gap-1 animate-slide-down">
                            <span>⚠️</span> {errors.style}
                        </p>
                    )}
                </div>

                {/* בחירת צבע */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 text-right flex items-center justify-end gap-2">
                        <span className="text-red-500 text-lg">*</span>
                        צבע דומיננטי
                        <span className="text-xl">🎨</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3" dir="rtl">
                        {colorOptions.map(option => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelection('color', option.value)}
                                className={`relative p-4 border-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                                    formData.color === option.value
                                        ? 'border-gray-800 bg-gray-50 shadow-lg'
                                        : 'border-gray-200 hover:border-gray-400 bg-white'
                                }`}
                            >
                                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${option.gradient} shadow-lg mb-2 transform transition-transform hover:rotate-6`}></div>
                                <div className={`text-sm font-bold ${
                                    formData.color === option.value ? 'text-gray-800' : 'text-gray-600'
                                }`}>
                                    {option.label}
                                </div>
                                {formData.color === option.value && (
                                    <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                                        ✓
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                    {errors.color && (
                        <p className="text-red-600 text-sm mt-2 text-right flex items-center justify-end gap-1 animate-slide-down">
                            <span>⚠️</span> {errors.color}
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
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                    >
                        <span className="text-xl">✨</span>
                        <span>צור דף נחיתה</span>
                        <span className="text-xl">🚀</span>
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
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold shadow-md">
                        ✓
                    </div>
                    <span className="text-xs text-green-600 font-medium mt-1">מטרה</span>
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg">
                        3
                    </div>
                    <span className="text-xs text-pink-600 font-medium mt-1">עיצוב</span>
                </div>
            </div>
        </div>
    );
};

export default Step3Form;
