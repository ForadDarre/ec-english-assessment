import { Layout, Spin } from "antd";
import "./Layout.scss";
import MainHeader from "./MainHeader";

interface DataProps {
    children: React.ReactElement;
    loading?: boolean;
}

function MainLayout(props: DataProps) {
    const { children, loading } = props;

    return (
        <Layout className="main-layout">
            <MainHeader />
            <div className="body-layout">
                {loading ? (
                    <div className="flexbox-div-center-horizontally-and-vertically height-width">
                        <Spin size="large" />
                    </div>
                ) : (
                    <>{children}</>
                )}
            </div>
        </Layout>
    );
}

export default MainLayout;
