import { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Header from './Header';

const PageThree = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // Get the name passed from PageOne, or fallback if accessed directly
    const userName = location.state?.name || "اسم تجريبي";
    
    const [selectedCard, setSelectedCard] = useState(null);

    const handleNext = () => {
        if (selectedCard !== null) {
            alert(`Selected card ${selectedCard} for ${userName}`);
        } else {
            alert('الرجاء اختيار أحد التصاميم للمتابعة');
        }
    };

    return (
        <div className="page-container">
            <Header />
            <div className="page-three">
                <div className="card">
                    <h3 style={{ marginBottom: "20px", fontSize: "28px" }}>أختار التصميم الذي يناسبك</h3>
                    
                    <div className="grid-container">
                        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                            <div 
                                key={index} 
                                className={`grid-item ${selectedCard === index ? 'selected' : ''}`}
                                onClick={() => setSelectedCard(index)}
                            >
                                {/* Placeholder for an image */}
                                <div className="image-placeholder"></div>
                                <div className="name-overlay">{userName}</div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="action-buttons">
                        <Link to="/page-two">
                            <button className="yellow">السابق</button>
                        </Link>
                        <button onClick={handleNext}>التالي</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageThree;
