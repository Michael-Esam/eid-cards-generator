import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Popup from './Popup';

const PageOne = () => {
    const location = useLocation();
    const [name, setName] = useState(location.state?.name || '');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleNext = () => {
        const wordCount = name.trim().split(/\s+/).filter(word => word.length > 0).length;
        if (wordCount >= 2) {
            navigate('/page-two', { state: { name } });
        } else {
            setErrorMessage('الرجاء إدخال الاسم الثنائي (كلمتين على الأقل)');
        }
    };

    return (
        <div className="page-container">
            <Header />
            <div className="page-one">
                <div className="card">
                    <h3>أدخل الاسم الثنائي</h3>
                    <input
                        type="text"
                        placeholder="اسمك يهمنا!"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button onClick={handleNext}>التالي</button>
                </div>
            </div>

            <Popup
                message={errorMessage}
                onClose={() => setErrorMessage('')}
            />
        </div>
    );
};

export default PageOne;
