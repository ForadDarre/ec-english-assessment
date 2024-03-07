import { Layout } from "antd";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Layout.scss";
import "../styles.scss";
const { Header } = Layout;

function MainHeader() {
    return (
        <Header className="header">
            <div className="logo-block">
                <Link to="/">
                    <div className="header-logo">
                        <img src={logo} alt="Online University" />
                    </div>
                </Link>
            </div>
        </Header>
    );
}

export default MainHeader;
