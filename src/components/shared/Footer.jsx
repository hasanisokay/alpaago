
const Footer = () => {
    const date = new Date();
    const presentYear = date.getFullYear();
    return (
        <footer className="max-h-[40px] text-center p-4 text-base-content ">
            <aside>
                <p>Copyright © {presentYear} - All right reserved by Alpaago Industries Ltd</p>
            </aside>
        </footer>
    );
};

export default Footer;