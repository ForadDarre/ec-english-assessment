import { act, render } from "@testing-library/react";
import { server } from "../../../setup/tests/mock/node";
import AdminPage from "../../components/admin/AdminPage";
import {
    screen,
    waitForElementToBeRemoved,
    within,
} from "@testing-library/react";
import { LoadingProvider } from "../../context/LoadingContext";
import { MemoryRouter } from "react-router-dom";

// Enable API mocking before tests.
beforeAll(() => {
    server.listen();
});

beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
    server.listen();
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("It renders loader component when API request is loading", async () => {
    render(
        <MemoryRouter>
            <LoadingProvider>
                <AdminPage />
            </LoadingProvider>
        </MemoryRouter>
    );

    expect(screen.getByTestId("main-loading")).toBeInTheDocument();
});

test("It renders loader component when API request is loading", async () => {
    await act(async () =>
        render(
            <MemoryRouter>
                <LoadingProvider>
                    <AdminPage />
                </LoadingProvider>
            </MemoryRouter>
        )
    );

    expect(screen.queryByTestId("main-loading")).toBeNull();
});
