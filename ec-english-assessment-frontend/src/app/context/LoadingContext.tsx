import React, { createContext, useContext, useState } from "react";

// Define the shape of the context
interface LoadingContextType {
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

// Create the context
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Custom hook for consuming the context
export function useLoading() {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within an LoadingProvider");
    }
    return context;
}

// Provider component
export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
}
