import '../styles/Footer.scss';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <div className="footer">
            <div className="footer__inner">

                <div className="footer__socials">
                    <a className="footer__socials-item" href='https://www.linkedin.com/' target='_blank' rel="noopener noreferrer">
                        <LinkedInIcon />
                        LinkedIn
                    </a>

                    <a className="footer__socials-item" href='https://www.instagram.com/' target='_blank' rel="noopener noreferrer">
                        <InstagramIcon />
                        Instagram
                    </a>

                    <a className="footer__socials-item" href='https://www.facebook.com/' target='_blank' rel="noopener noreferrer">
                        <FacebookIcon />
                        Facebook
                    </a>
                </div>

                <div className="footer__links">
                    <Link to="/privacy-policy" className="footer__link">Privacy Policy</Link>
                </div>

                <div className='footer__copyright'>
                    &copy;{year}. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default Footer