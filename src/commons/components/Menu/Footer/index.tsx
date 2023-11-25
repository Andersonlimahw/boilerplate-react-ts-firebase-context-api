import './Footer.style.scss';

export const Footer = () => {
    const moment = new Date().getFullYear();
    return(
        <footer> 
            Anderson Lima | {moment}
        </footer>
    )
}

export default Footer;