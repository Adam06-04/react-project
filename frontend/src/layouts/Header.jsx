import classes from "./Header.module.css";

const Header = ({ children }) => {
    return <header className={classes.head}>{children}</header>
}

export default Header;