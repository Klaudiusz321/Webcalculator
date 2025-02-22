import React from 'react'
import '../styles/Footer.scss';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import "../styles/Footer.scss";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <div className="footer">
            <div className="footer__inner">

                <div className="footer__socials">
                    <a className="footer__socials-item" href='https://www.linkedin.com/' target='_blank'>
                        <LinkedInIcon />
                        LinkedIn
                    </a>

                    <a className="footer__socials-item" href='https://www.instagram.com/' target='_blank'>
                        <InstagramIcon />
                        Instagram
                    </a>

                    <a className="footer__socials-item" href='https://www.facebook.com/' target='_blank'>
                        <FacebookIcon />
                        Facebook
                    </a>
                </div>

                <div className='footer__copyright'>
                    &copy;{year}. Klaudiusz Sroka. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default Footer