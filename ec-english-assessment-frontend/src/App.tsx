import { ConfigProvider } from "antd";
import "./App.scss";
import AppRoutes from "./setup/AppRoutes";
import { LoadingProvider } from "./app/context/LoadingContext";

function App() {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorPrimary: "#333366",
                        colorIcon: "#333366",
                        algorithm: true, // Enable algorithm
                    },
                    Spin: {
                        colorPrimary: "#ff7900",
                    },
                    Input: {
                        hoverBorderColor: "#ff7900",
                        activeBorderColor: "#333366",
                    },
                },
            }}
        >
            <LoadingProvider>
                <AppRoutes />
            </LoadingProvider>
        </ConfigProvider>
    );
}

export default App;
