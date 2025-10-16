import React, { useState } from 'react';

/**
 * שלב III: עיצוב וצבע
 * שדות: style, color
 */
const Step3Form = ({ onNext, onBack, initialData = {} }) => {
    const [formData, setFormData] = useState({
        style: initialData.style || '',
        color: initialData.color || '',
    });

    const [errors, setErrors] = useState({});

    const styleOptions = [
        { value: 'מודרני', label: 'מודרני', description: 'עיצוב נקי ועכשווי' },
        { value: 'מינימליסטי', label: 'מינימליסטי', description: 'פשוט ומרווח' },
        { value: 'טכנולוגי', label: 'טכנולוגי', description: 'פיוצ׳ריסטי ומתקדם' },
        { value: 'עסקי', label: 'עסקי', description: 'מקצועי ורשמי' },
        { value: 'יצירתי', label: 'יצירתי', description: 'ייחודי וצבעוני' },
    ];

    const colorOptions = [
        { value: 'כחול', label: 'כחול', hex: '#3B82F6' },
        { value: 'ירוק', label: 'ירוק', hex: '#10B981' },
        { value: 'סגול', label: 'סגול', hex: '#8B5CF6' },
        { value: 'אדום', label: 'אדום', hex: '#EF4444' },
        { value: 'כתום', label: 'כתום', hex: '#F59E0B' },
        { value: 'ורוד', label: 'ורוד', hex: '#EC4899' },
    ];

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.style) {
            newErrors.style = 'יש לבחור סגנון עיצובי';
        }

        if (!formData.color) {
            newErrors.color = 'יש לבחור צבע דומיננטי';
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
                <h2 className="text-2xl font-bold text-gray-800 mb-2">שלב 3: עיצוב וצבעים</h2>
                <p className="text-gray-600 text-sm">בחר את הסגנון והצבע המועדפים עליך</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* בחירת סגנון */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                        סגנון עיצובי <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2" dir="rtl">
                        {styleOptions.map(option => (
                            <label
                                key={option.value}
                                className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                    formData.style === option.value
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-300 hover:border-blue-300'
                                }`}
                            >
                                <div className="flex-1 text-right">
                                    <div className={`font-semibold ${
                                        formData.style === option.value ? 'text-blue-700' : 'text-gray-800'
                                    }`}>
                                        {option.label}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {option.description}
                                    </div>
                                </div>
                                <input
                                    type="radio"
                                    name="style"
                                    value={option.value}
                                    checked={formData.style === option.value}
                                    onChange={(e) => handleChange('style', e.target.value)}
                                    className="mr-3"
                                />
                            </label>
                        ))}
                    </div>
                    {errors.style && (
                        <p className="text-red-500 text-xs mt-1 text-right">{errors.style}</p>
                    )}
                </div>

                {/* בחירת צבע */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 text-right">
                        צבע דומיננטי <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3" dir="rtl">
                        {colorOptions.map(option => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleChange('color', option.value)}
                                className={`flex flex-col items-center p-4 border-2 rounded-lg transition-all ${
                                    formData.color === option.value
                                        ? 'border-gray-800 bg-gray-50'
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                            >
                                <div
                                    className="w-12 h-12 rounded-full mb-2 shadow-md"
                                    style={{ backgroundColor: option.hex }}
                                ></div>
                                <span className={`text-sm font-medium ${
                                    formData.color === option.value ? 'text-gray-800' : 'text-gray-600'
                                }`}>
                                    {option.label}
                                </span>
                            </button>
                        ))}
                    </div>
                    {errors.color && (
                        <p className="text-red-500 text-xs mt-1 text-right">{errors.color}</p>
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
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        ✨ צור דף נחיתה
                    </button>
                </div>
            </form>

            {/* אינדיקטור שלב */}
            <div className="flex justify-center items-center space-x-2 space-x-reverse pt-4">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            </div>
        </div>
    );
};

export default Step3Form;
