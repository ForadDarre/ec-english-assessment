import { GetAllCoursesDto } from "../types/DTO";
import { Course } from "../types/Types";

export const GetAllCoursesDtoToCourses = (
    getAllCoursesDto: GetAllCoursesDto
): Course[] => {
    const courses: Course[] = getAllCoursesDto.courses.map((c) => {
        const course: Course = {
            id: c.id,
            name: c.name,
        };

        return course;
    });
    return courses;
};
