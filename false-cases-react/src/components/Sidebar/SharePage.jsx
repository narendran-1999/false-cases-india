import React from 'react'
import './SharePage.css'
import { FaCopy } from 'react-icons/fa'
import QRCode from 'react-qr-code'

const SharePage = () => {
  // Get the current page URL
  const pageUrl = window.location.href.split('#')[0];

  // Handle copy to clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(pageUrl)
    .then(() => {
        alert('Link copied to clipboard!');
    })
    .catch(console.error);
  };
  
  return (
    <div className="share-component">
        <div id="share-head">Share</div>
        <button className="btn-copy" onClick={copyLink}>
            <FaCopy size={15}/> Copy link
        </button>
        <div id="qrcode">
            <QRCode
                value={pageUrl}
                size={120}
            />
        </div>
    </div>
  )
}

export default SharePage