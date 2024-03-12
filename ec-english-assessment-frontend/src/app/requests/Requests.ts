import axios from "axios";
import {
    addHolidayBreakEndpoint,
    addStudentEndpoint,
    addStudentsCourseEndpoint,
    editStudentEndpoint,
    getAllCoursesEndpoint,
    getAllStudentsEndpoint,
} from "./Endpoints";
import {
    AddHolidayBreakRequestDto,
    AddStudentRequestDto,
    AddStudentsCourseRequestDto,
    EditStudentRequestDto,
} from "../types/DTO";

export const GetAllStudentsRequest = async () => {
    let response = await axios.get(getAllStudentsEndpoint, {
        headers: {
            Accept: "application/json",
        },
    });

    return response;
};

export const GetAllCoursesRequest = async () => {
    let response = await axios.get(getAllCoursesEndpoint, {
        headers: {
            Accept: "application/json",
        },
    });

    return response;
};

export const AddStudentRequest = async (
    addStudentRequest: AddStudentRequestDto
) => {
    let response = await axios.put(addStudentEndpoint, addStudentRequest, {
        headers: {
            Accept: "application/json",
        },
    });
    return response;
};

export const EditStudentRequest = async (
    editStudentRequest: EditStudentRequestDto
) => {
    let response = await axios.post(editStudentEndpoint, editStudentRequest, {
        headers: {
            Accept: "application/json",
        },
    });
    return response;
};

export const AddStudentsCourseRequest = async (
    addStudentsCourseRequestDto: AddStudentsCourseRequestDto
) => {
    let response = await axios.put(
        addStudentsCourseEndpoint,
        addStudentsCourseRequestDto,
        {
            headers: {
                Accept: "application/json",
            },
        }
    );
    return response;
};

export const AddHolidayBreakRequest = async (
    addHolidayBreakRequestDto: AddHolidayBreakRequestDto
) => {
    let response = await axios.put(
        addHolidayBreakEndpoint,
        addHolidayBreakRequestDto,
        {
            headers: {
                Accept: "application/json",
            },
        }
    );
    return response;
};
