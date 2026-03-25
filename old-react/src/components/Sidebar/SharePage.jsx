import React from 'react'
import './SharePage.css'
import { FaShare } from 'react-icons/fa'

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
        <button className="btn-copy" onClick={copyLink}>
            <FaShare size={15}/> Share
        </button>
    </div>
  )
}

export default SharePage