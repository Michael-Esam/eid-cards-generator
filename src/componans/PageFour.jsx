import { useEffect, useRef } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { FaWhatsapp, FaSnapchatGhost, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Header from './Header';

const PageFour = () => {
    const location = useLocation();
    const { name, design } = location.state || {};

    // للتأكد من وصول البيانات
    console.log('PageFour received:', { name, design });

    const canvasRef = useRef(null);

    useEffect(() => {
        if (!name || !design) {
            console.log('Missing name or design');
            return;
        }
        if (!canvasRef.current) {
            console.log('Canvas ref not ready');
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = design.image;

        img.onload = () => {
            console.log('Image loaded:', design.image);
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            ctx.font = `bold ${design.fontSize}px 'Cairo', sans-serif`;
            ctx.fillStyle = design.color;
            ctx.textAlign = 'right';
            ctx.fillText(name, design.textX, design.textY);
        };

        img.onerror = (err) => {
            console.error('Failed to load image:', design.image, err);
        };
    }, [name, design]);

    // إذا لم يصل الاسم أو التصميم، نوجه المستخدم إلى الصفحة الرئيسية
    if (!name || !design) {
        console.log('Redirecting to home due to missing data');
        return <Navigate to="/" replace />;
    }

    // دالة تحويل canvas إلى blob
    const getImageBlob = () => {
        return new Promise((resolve) => {
            const canvas = canvasRef.current;
            if (!canvas) {
                resolve(null);
                return;
            }
            canvas.toBlob((blob) => resolve(blob), 'image/png');
        });
    };

    // دالة تحميل الصورة كملف
    const downloadImage = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = `eid-image-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    // دالة المشاركة الرئيسية
    const shareImage = async (platform) => {
        console.log('Share button clicked for platform:', platform);

        // أولاً نحاول الحصول على blob الصورة
        const blob = await getImageBlob();
        if (!blob) {
            alert('لم نتمكن من تحضير الصورة للمشاركة');
            return;
        }

        const file = new File([blob], 'eid-image.png', { type: 'image/png' });

        // التحقق من دعم مشاركة الملفات عبر Web Share API
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    files: [file],
                    title: 'عيد مبارك',
                    text: 'كل عام وانتم بخير',
                });
                console.log('Shared successfully');
                return; // تمت المشاركة بنجاح
            } catch (error) {
                console.log('User cancelled or sharing failed:', error);
                // إذا ألغى المستخدم المشاركة، لا نفعل شيئًا
                // ولكن إذا كان خطأ تقني، نكمل إلى الخيارات الأخرى
            }
        }

        // إذا لم يدعم الجهاز مشاركة الملفات، نعرض رسالة ثم نقوم بتحميل الصورة
        alert(`مشاركة عبر ${platform} لا تدعم رفع الصور مباشرة على هذا الجهاز. سيتم تحميل الصورة، ثم يمكنك مشاركتها يدويًا.`);
        downloadImage();
    };

    const handleShare = (platform) => {
        shareImage(platform);
    };

    return (
        <div className="page-container">
            <Header />
            <main className="page-four">
                <div className="card split-card">
                    <div className="share-section">
                        <h3>كل عام وانتم الخير</h3>
                        <p className="share-subtitle">شاركوا فرحتكم مع احبابكم!</p>

                        <div className="share-buttons-grid">
                            <button className="share-btn whatsapp" onClick={() => handleShare('whatsapp')} aria-label="Share on WhatsApp">
                                <FaWhatsapp size={28} />
                            </button>
                            <button className="share-btn x-br" onClick={() => handleShare('x')} aria-label="Share on X">
                                <FaXTwitter size={28} />
                            </button>
                            <button className="share-btn instagram" onClick={() => handleShare('instagram')} aria-label="Share on Instagram">
                                <FaInstagram size={28} />
                            </button>
                            <button className="share-btn snapchat" onClick={() => handleShare('snapchat')} aria-label="Share on Snapchat">
                                <FaSnapchatGhost size={28} />
                            </button>
                            <button className="share-btn tiktok" onClick={() => handleShare('tiktok')} aria-label="Share on TikTok">
                                <FaTiktok size={28} />
                            </button>
                            <button className="share-btn linkedin" onClick={() => handleShare('linkedin')} aria-label="Share on LinkedIn">
                                <FaLinkedinIn size={28} />
                            </button>
                        </div>
                    </div>

                    <div className="canvas-section">
                        <div className="page-four-preview">
                            <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PageFour;