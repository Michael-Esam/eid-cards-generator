import { useEffect, useRef } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { FaWhatsapp, FaSnapchatGhost, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Header from './Header';

const PageFour = () => {
    const location = useLocation();
    const { name, design } = location.state || {};
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!name || !design || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = design.image;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            ctx.font = `bold ${design.fontSize}px 'Cairo', sans-serif`;
            ctx.fillStyle = design.color;
            ctx.textAlign = 'right';
            ctx.fillText(name, design.textX, design.textY);
        };
    }, [name, design]);

    if (!name || !design) {
        return <Navigate to="/" replace />;
    }

    const shareUrl = window.location.origin;
    const shareText = "كل عام وانتم الخير، شاركوا فرحتكم مع احبابكم!";

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            alert('تم نسخ الرابط');
        } catch {
            alert('لم نتمكن من نسخ الرابط. انسخه يدويًا من شريط العنوان.');
        }
    };

    const openShareUrl = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleShare = async (platform) => {
        if (navigator.share && (platform === 'snapchat' || platform === 'instagram' || platform === 'tiktok')) {
            try {
                await navigator.share({ text: shareText, url: shareUrl });
                return;
            } catch {
                // fall through to copy-link fallback
            }
        }

        switch (platform) {
            case 'x':
                openShareUrl(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
                );
                return;
            case 'whatsapp':
                openShareUrl(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`);
                return;
            case 'linkedin':
                openShareUrl(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`);
                return;
            case 'snapchat':
            case 'instagram':
            case 'tiktok':
                await copyLink();
                return;
            default:
                await copyLink();
        }
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
                            <canvas ref={canvasRef} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PageFour;
