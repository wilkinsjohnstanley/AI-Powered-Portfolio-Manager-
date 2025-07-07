import React from 'react';
import './Footer.css';
function Footer(){
    return (
        <footer className='footer'>
            <div className='footer-content'>
                <p>&copy; {new Date().getFullYear()} Whatever this app ends up becoming</p>
                <div className='footer-links'>
                    <a href="https://finance.yahoo.com" target="_blank" rel="noopener noreferrer">Yahoo Finance</a>
                    <a href="https://www.sec.gov/" target="_blank" rel="noopener noreferrer">SEC Filings</a>
                    <a href='#top'>Back to Top</a>
                </div>
            </div>
        </footer>
    );
}
export default Footer;