import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';

// تعريفات الخطوط
const FONTS = {
    IBM_PLEX_ARABIC: "'IBM Plex Arabic', sans-serif",
    AYNAMA_CURVED: "'Aynama Curved', sans-serif",
    KHALAYA: "'Khalaya', sans-serif",
    KHALAYA_VF: "'Khalaya VF', sans-serif",
};

// دالة مساعدة للحصول على مسار الصورة
const getAssetUrlByFilename = (globMap, filename) => {
    const matchKey = Object.keys(globMap).find((k) => k.endsWith(`/${filename}`));
    return matchKey ? globMap[matchKey] : undefined;
};

// استيراد الصور
const googleAssetUrls = import.meta.glob('../assets/images/google/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });
const normalAssetUrls = import.meta.glob('../assets/images/normal/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });

// بيانات التصاميم (الإحداثيات على الصورة الأصلية 4962x7016)
const google = [
    { id: 1, image: getAssetUrlByFilename(googleAssetUrls, 'design1.jpg'), textX: 2481, textY: 2455, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.IBM_PLEX_ARABIC },
    { id: 2, image: getAssetUrlByFilename(googleAssetUrls, 'design2.jpg'), textX: 2481, textY: 5444, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.IBM_PLEX_ARABIC },
    { id: 3, image: getAssetUrlByFilename(googleAssetUrls, 'design3.jpg'), textX: 2481, textY: 5444, fontSizeRatio: 0.05, color: '#9caabc', fontFamily: FONTS.IBM_PLEX_ARABIC },
    { id: 4, image: getAssetUrlByFilename(googleAssetUrls, 'design4.jpg'), textX: 2481, textY: 6595, fontSizeRatio: 0.05, color: '#bcbcbc', fontFamily: FONTS.IBM_PLEX_ARABIC },
    { id: 5, image: getAssetUrlByFilename(googleAssetUrls, 'design5.jpg'), textX: 2481, textY: 6050, fontSizeRatio: 0.05, color: '#c8b89a', fontFamily: FONTS.IBM_PLEX_ARABIC },
    { id: 6, image: getAssetUrlByFilename(googleAssetUrls, 'design6.jpg'), textX: 2481, textY: 5355, fontSizeRatio: 0.06, color: '#393938', fontFamily: FONTS.KHALAYA },
    { id: 7, image: getAssetUrlByFilename(googleAssetUrls, 'design7.jpg'), textX: 2481, textY: 1584, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.AYNAMA_CURVED },
    { id: 8, image: getAssetUrlByFilename(googleAssetUrls, 'design8.jpg'), textX: 2481, textY: 6560, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.AYNAMA_CURVED },
    { id: 9, image: getAssetUrlByFilename(googleAssetUrls, 'design9.jpg'), textX: 2481, textY: 1700, fontSizeRatio: 0.06, color: '#c1803a', fontFamily: FONTS.AYNAMA_CURVED },
    { id: 10, image: getAssetUrlByFilename(googleAssetUrls, 'design10.jpg'), textX: 2481, textY: 2355, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.AYNAMA_CURVED },
    { id: 11, image: getAssetUrlByFilename(googleAssetUrls, 'design11.jpg'), textX: 2821, textY: 1700, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.AYNAMA_CURVED },
];

const normal = [
    { id: 1, image: getAssetUrlByFilename(normalAssetUrls, 'design1.jpg'), textX: 2481, textY: 2455, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.IBM_PLEX_ARABIC },
    { id: 2, image: getAssetUrlByFilename(normalAssetUrls, 'design2.jpg'), textX: 2481, textY: 5444, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.IBM_PLEX_ARABIC },
    { id: 3, image: getAssetUrlByFilename(normalAssetUrls, 'design3.jpg'), textX: 2481, textY: 5444, fontSizeRatio: 0.05, color: '#9caabc', fontFamily: FONTS.IBM_PLEX_ARABIC },
    { id: 4, image: getAssetUrlByFilename(normalAssetUrls, 'design4.jpg'), textX: 2481, textY: 6595, fontSizeRatio: 0.05, color: '#bcbcbc', fontFamily: FONTS.IBM_PLEX_ARABIC },
    { id: 5, image: getAssetUrlByFilename(normalAssetUrls, 'design5.jpg'), textX: 2481, textY: 6050, fontSizeRatio: 0.05, color: '#c8b89a', fontFamily: FONTS.IBM_PLEX_ARABIC },
    { id: 6, image: getAssetUrlByFilename(normalAssetUrls, 'design6.jpg'), textX: 2481, textY: 5355, fontSizeRatio: 0.06, color: '#393938', fontFamily: FONTS.KHALAYA },
    { id: 7, image: getAssetUrlByFilename(normalAssetUrls, 'design7.jpg'), textX: 2481, textY: 1584, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.AYNAMA_CURVED },
    { id: 8, image: getAssetUrlByFilename(normalAssetUrls, 'design8.jpg'), textX: 2481, textY: 6560, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.AYNAMA_CURVED },
    { id: 9, image: getAssetUrlByFilename(normalAssetUrls, 'design9.jpg'), textX: 2481, textY: 1700, fontSizeRatio: 0.06, color: '#c1803a', fontFamily: FONTS.AYNAMA_CURVED },
    { id: 10, image: getAssetUrlByFilename(normalAssetUrls, 'design10.jpg'), textX: 2481, textY: 2355, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.AYNAMA_CURVED },
    { id: 11, image: getAssetUrlByFilename(normalAssetUrls, 'design11.jpg'), textX: 2821, textY: 1700, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.AYNAMA_CURVED },
];

// دالة رسم الصورة على الكانفاس مع إمكانية تحديد الحجم الأقصى
function drawCard(canvas, design, userName, variant = 'grid') {
    if (!canvas || !design?.image) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
        // تحديد الحجم الأقصى حسب نوع العرض (شبكة / معاينة)
        // رفع القيم للحصول على جودة أفضل
        const maxSide = variant === 'preview' ? 2000 : 1200; // 1200 للشبكة، 2000 للمعاينة
        const scale = Math.min(maxSide / img.naturalWidth, maxSide / img.naturalHeight, 1);
        const W = Math.round(img.naturalWidth * scale);
        const H = Math.round(img.naturalHeight * scale);
        canvas.width = W;
        canvas.height = H;
        ctx.drawImage(img, 0, 0, W, H);

        const name = String(userName || 'User Name').trim() || 'User Name';
        // حساب الإحداثيات على canvas الجديد
        const x = design.textX * (W / img.naturalWidth);
        const y = design.textY * (H / img.naturalHeight);
        const fs = Math.round(H * (design.fontSizeRatio || 0.05));

        ctx.save();
        ctx.font = `400 ${fs}px ${design.fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = design.color;
        // إضافة ظل خفيف لتحسين القراءة (اختياري)
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.fillText(name, x, y);
        ctx.restore();
    };
    img.src = design.image;
}

const PageThree = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userName = location.state?.name || 'User Name';
    const memberType = location.state?.memberType;
    const designs = memberType === 'gdsc' ? google : normal;

    const [selectedCard, setSelectedCard] = useState(null);
    const [activeCard, setActiveCard] = useState(null);
    const [previewDesign, setPreviewDesign] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const canvasRefs = useRef([]);
    const popupCanvasRef = useRef(null);

    const setCanvasRef = useCallback((el, index, design) => {
        if (!el) return;
        canvasRefs.current[index] = el;
        drawCard(el, design, userName, 'grid');
    }, [userName]);

    useEffect(() => {
        if (previewDesign && popupCanvasRef.current)
            drawCard(popupCanvasRef.current, previewDesign, userName, 'preview');
    }, [previewDesign, userName]);

    const handleNext = async () => {
        if (selectedCard === null) {
            setErrorMessage('الرجاء اختيار تصميم أولاً');
            return;
        }

        const design = designs[selectedCard];
        if (!design) {
            setErrorMessage('خطأ في التصميم');
            return;
        }

        // إنشاء canvas مؤقت عالي الجودة للتنزيل
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = design.image;

        try {
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });

            // نستخدم الحجم الأصلي مع حد أقصى 3000 بكسل (يمكن تعديله)
            const maxDownloadSize = 3000;
            const scale = Math.min(maxDownloadSize / img.naturalWidth, maxDownloadSize / img.naturalHeight, 1);
            const W = Math.round(img.naturalWidth * scale);
            const H = Math.round(img.naturalHeight * scale);

            canvas.width = W;
            canvas.height = H;
            ctx.drawImage(img, 0, 0, W, H);

            const name = String(userName || 'User Name').trim() || 'User Name';
            const x = design.textX * (W / img.naturalWidth);
            const y = design.textY * (H / img.naturalHeight);
            const fs = Math.round(H * (design.fontSizeRatio || 0.05));

            ctx.save();
            ctx.font = `400 ${fs}px ${design.fontFamily}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = design.color;
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 8;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.fillText(name, x, y);
            ctx.restore();

            // تحويل canvas إلى blob
            const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
            if (!blob) {
                setErrorMessage('تعذر حفظ الصورة، حاول مرة أخرى');
                return;
            }

            // تنزيل الصورة
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `eid-card-${userName}-${timestamp}.png`;
            a.click();
            URL.revokeObjectURL(url);

            // إنشاء صورة مصغرة للانتقال للصفحة التالية (اختياري، نستخدم نفس الـ canvas ولكن بحجم مناسب)
            const previewCanvas = document.createElement('canvas');
            const previewScale = 800 / Math.max(img.naturalWidth, img.naturalHeight); // حجم معقول للعرض
            const pW = Math.round(img.naturalWidth * previewScale);
            const pH = Math.round(img.naturalHeight * previewScale);
            previewCanvas.width = pW;
            previewCanvas.height = pH;
            const pCtx = previewCanvas.getContext('2d');
            pCtx.drawImage(img, 0, 0, pW, pH);
            const px = design.textX * (pW / img.naturalWidth);
            const py = design.textY * (pH / img.naturalHeight);
            const pfs = Math.round(pH * (design.fontSizeRatio || 0.05));
            pCtx.font = `400 ${pfs}px ${design.fontFamily}`;
            pCtx.textAlign = 'center';
            pCtx.textBaseline = 'middle';
            pCtx.fillStyle = design.color;
            pCtx.shadowColor = 'rgba(0,0,0,0.5)';
            pCtx.shadowBlur = 5;
            pCtx.shadowOffsetX = 2;
            pCtx.shadowOffsetY = 2;
            pCtx.fillText(name, px, py);
            const imageDataUrl = previewCanvas.toDataURL('image/png');

            // الانتقال للصفحة التالية مع صورة المعاينة
            navigate('/page-four', {
                state: {
                    name: userName,
                    design: design,
                    imageDataUrl: imageDataUrl,
                }
            });

        } catch (error) {
            console.error('خطأ في تحميل الصورة:', error);
            setErrorMessage('حدث خطأ أثناء تجهيز الصورة');
        }
    };

    if (!userName) return <Navigate to="/" replace />;

    return (
        <div className="page-container">
            <Header />
            <main className="page-three">
                <div className="card">
                    <h3 className="page-three-title">اختر التصميم المناسب لك</h3>
                    <div className="grid-container">
                        {designs.map((design, index) => (
                            <div
                                key={design.id}
                                className={`grid-item ${selectedCard === index ? 'selected' : ''}`}
                                onClick={() => setActiveCard(activeCard === index ? null : index)}
                                role="button"
                                tabIndex={0}
                            >
                                <canvas
                                    ref={el => setCanvasRef(el, index, design)}
                                    style={{ width: '100%', height: 'auto', display: 'block', background: '#f0f0f0' }}
                                />
                                {activeCard === index && (
                                    <div className="card-overlay" onClick={e => e.stopPropagation()}>
                                        <button className="btn-view" onClick={e => { e.stopPropagation(); setPreviewDesign(design); }}>عرض</button>
                                        <button className="btn-select" onClick={e => { e.stopPropagation(); setSelectedCard(index); setActiveCard(null); setErrorMessage(''); }}>اختيار</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {errorMessage && (
                        <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
                    )}
                    <div className="action-buttons">
                        <Link to="/page-two" state={{ name: userName }}>
                            <button className="btn-yellow">السابق</button>
                        </Link>
                        <button onClick={handleNext}>التالي</button>
                    </div>
                </div>
            </main>
            {previewDesign && (
                <div className="image-popup-overlay" onClick={() => setPreviewDesign(null)}>
                    <div className="image-popup-content" onClick={e => e.stopPropagation()}>
                        <button className="btn-close-popup" onClick={() => setPreviewDesign(null)}>×</button>
                        <canvas ref={popupCanvasRef} style={{ maxWidth: '100%', maxHeight: '90vh' }} />
                    </div>
                </div>
            )}
            <footer>
                <a href='https://linktr.ee/ai.wadod' target='_blank'><img src="/designer.png" alt="" /></a>
            </footer>
        </div>
    );
};

export default PageThree;