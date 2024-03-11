import { ConfigProvider } from "antd";
import "./App.scss";
import AppRoutes from "./setup/AppRoutes";

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
                },
            }}
        >
            <AppRoutes />
        </ConfigProvider>
    );
}

export default App;
