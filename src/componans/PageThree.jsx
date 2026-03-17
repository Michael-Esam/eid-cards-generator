import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';

const getAssetUrlByFilename = (globMap, filename) => {
    const matchKey = Object.keys(globMap).find((k) => k.endsWith(`/${filename}`));
    return matchKey ? globMap[matchKey] : undefined;
};

const googleAssetUrls = import.meta.glob('../assets/images/google/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
});

const normalAssetUrls = import.meta.glob('../assets/images/normal/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
});

const google = [
    {
        id: 1,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design1.jpg'),
        textX: 250, textY: 350, fontSize: 32, color: '#ffffff'
    },
    {
        id: 2,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design2.jpg'),
        textX: 200, textY: 300, fontSize: 30, color: '#ff0000'
    },
    {
        id: 3,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design3.jpg'),
        textX: 180, textY: 280, fontSize: 28, color: '#00ff00'
    },
    {
        id: 4,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design4.jpg'),
        textX: 220, textY: 320, fontSize: 34, color: '#0000ff'
    },
    {
        id: 5,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design5.jpg'),
        textX: 150, textY: 250, fontSize: 26, color: '#ffff00'
    },
    {
        id: 6,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design6.jpg'),
        textX: 270, textY: 370, fontSize: 36, color: '#ff00ff'
    },
    {
        id: 7,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design7.jpg'),
        textX: 190, textY: 290, fontSize: 32, color: '#00ffff'
    },
    {
        id: 8,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design8.jpg'),
        textX: 210, textY: 310, fontSize: 30, color: '#ffffff'
    },
    {
        id: 9,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design9.jpg'),
        textX: 230, textY: 330, fontSize: 28, color: '#000000'
    },
    {
        id: 10,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design10.jpg'),
        textX: 250, textY: 350, fontSize: 26, color: '#ffffff'
    },
    {
        id: 11,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design11.jpg'),
        textX: 270, textY: 370, fontSize: 24, color: '#000000'
    },
];

const normal = [
    {
        id: 1,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design1.jpg'),
        textX: 250, textY: 350, fontSize: 32, color: '#ffffff'
    },
    {
        id: 2,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design2.jpg'),
        textX: 200, textY: 300, fontSize: 30, color: '#ff0000'
    },
    {
        id: 3,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design3.jpg'),
        textX: 180, textY: 280, fontSize: 28, color: '#00ff00'
    },
    {
        id: 4,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design4.jpg'),
        textX: 220, textY: 320, fontSize: 34, color: '#0000ff'
    },
    {
        id: 5,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design5.jpg'),
        textX: 150, textY: 250, fontSize: 26, color: '#ffff00'
    },
    {
        id: 6,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design6.jpg'),
        textX: 270, textY: 370, fontSize: 36, color: '#ff00ff'
    },
    {
        id: 7,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design7.jpg'),
        textX: 190, textY: 290, fontSize: 32, color: '#00ffff'
    },
    {
        id: 8,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design8.jpg'),
        textX: 210, textY: 310, fontSize: 30, color: '#ffffff'
    },
    {
        id: 9,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design9.jpg'),
        textX: 230, textY: 330, fontSize: 28, color: '#000000'
    },
    {
        id: 10,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design10.jpg'),
        textX: 250, textY: 350, fontSize: 26, color: '#ffffff'
    },
    {
        id: 11,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design11.jpg'),
        textX: 270, textY: 370, fontSize: 24, color: '#000000'
    },
];
const PageThree = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userName = location.state?.name;
    const memberType = location.state?.memberType;
    const designs = memberType === 'gdsc' ? google : normal;
    const [selectedCard, setSelectedCard] = useState(null);
    const [previewDesign, setPreviewDesign] = useState(null);

    const handleNext = () => {
        if (selectedCard !== null) {
            navigate('/page-four', { state: { name: userName, design: designs[selectedCard] } });
        } else {
            alert('الرجاء اختيار أحد التصاميم للمتابعة');
        }
    };

    if (!userName) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="page-container">
            <Header />
            <main className="page-three">
                <div className="card">
                    <h3 className="page-three-title">أختار التصميم الذي يناسبك</h3>

                    <div className="grid-container">
                        {designs.map((design, index) => (
                            <div
                                key={design.id}
                                className={`grid-item ${selectedCard === index ? 'selected' : ''}`}
                            >
                                <img
                                    src={design.image}
                                    alt={design.name}
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                    loading="lazy"
                                />
                                <div className="card-actions">
                                    <button
                                        className="btn-view"
                                        onClick={() => setPreviewDesign(design)}
                                    >
                                        عرض
                                    </button>
                                    <button
                                        className="btn-select"
                                        onClick={() => setSelectedCard(index)}
                                    >
                                        اختيار
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="action-buttons">
                        <Link to="/page-two" state={{ name: userName }}>
                            <button className="btn-yellow">السابق</button>
                        </Link>
                        <button onClick={handleNext}>التالي</button>
                    </div>
                </div>
            </main>

            {previewDesign && (
                <div className="preview-modal" onClick={() => setPreviewDesign(null)}>
                    <div className="preview-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setPreviewDesign(null)}>×</button>
                        <img src={previewDesign.image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
                        <p style={{ textAlign: 'center', marginTop: '10px' }}>سيتم إضافة اسمك على الصورة في الصفحة التالية</p>
                    </div>
                </div>
            )}
        </div>
    );
};