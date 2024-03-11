import { DateFromBackendToDateWithoutTime } from "../helpers/DateHelper";
import { GetAllStudentsDto } from "../types/DTO";
import { Student } from "../types/Types";

export const GetAllStudentsDtoToStudents = (
    getAllStudentsDto: GetAllStudentsDto
): Student[] => {
    const students: Student[] = getAllStudentsDto.students.map((s) => {
        const student: Student = {
            id: s.id,
            name: s.name,
            surname: s.surname,
            email: s.email,
            studentsCourses: s.studentsCourses.map((sc) => {
                return {
                    ...sc,
                    startDate: new Date(
                        DateFromBackendToDateWithoutTime(sc.startDate)
                    ),
                    endDate: new Date(
                        DateFromBackendToDateWithoutTime(sc.endDate)
                    ),
                };
            }),
        };

        return student;
    });
    return students;
};
