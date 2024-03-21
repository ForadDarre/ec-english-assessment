import { DateFromBackendToDateWithoutTime } from "../../helpers/DateHelper";

test("It returns Date Without Time from Date From Backend", () => {
    const inputData: string = "20-01-2012T00:00:00";
    const expectedOutput: string = "20-01-2012";

    const result = DateFromBackendToDateWithoutTime(inputData);

    expect(result).toEqual(expectedOutput);
});

test("It throws an error when Date From Backend is incorrect", () => {
    const inputData = undefined as unknown as string;

    try {
        DateFromBackendToDateWithoutTime(inputData);
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
    }
});
