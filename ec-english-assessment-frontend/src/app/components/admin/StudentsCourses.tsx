import { useState } from "react";
import { Course, Student, StudentCourse } from "../../types/Types";
import { Button, List } from "antd";
import StudentsCourseRow from "./StudentsCourseRow";
import AddStudentsCourse from "./AddStudentsCourse";
import { AddStudentsCourseRequest } from "../../requests/Requests";
import { useLoading } from "../../context/LoadingContext";
import { ErrorDefault } from "../../requests/ErrorRequest";
import { AddStudentsCourseRequestDto } from "../../types/DTO";

interface DataProps {
    student: Student;
    studentsCourses: StudentCourse[];
    courses: Course[];
    updateStudents: Function;
}

function StudentsCourses(props: DataProps) {
    const { student, studentsCourses, courses, updateStudents } = props;
    const { setLoading } = useLoading();

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const onAddStudentCourse = (): void => {
        setIsModalVisible(true);
    };

    const onModalClose = (): void => {
        setIsModalVisible(false);
    };

    const onSave = (
        addStudentsCourseRequestDto: AddStudentsCourseRequestDto
    ): void => {
        setIsModalVisible(false);
        setLoading(true);
        AddStudentsCourseRequest(addStudentsCourseRequestDto)
            .then((res) => {
                const addedId: string = res.data.id;
                const course: Course | undefined = courses.find(
                    (c) => c.id === addStudentsCourseRequestDto.courseId
                );

                if (course) {
                    const addedStudentCourse: StudentCourse = {
                        id: addedId,
                        course: course,
                        startDate: new Date(
                            addStudentsCourseRequestDto.startDate
                        ),
                        endDate: new Date(addStudentsCourseRequestDto.endDate),
                        holidayApplied: false,
                    };

                    const updatedStudentsCourses: StudentCourse[] = [
                        ...studentsCourses,
                    ];
                    updatedStudentsCourses.push(addedStudentCourse);
                    updateStudents(student, updatedStudentsCourses);
                }
            })
            .catch(ErrorDefault)
            .finally(() => {
                setIsModalVisible(false);
                setLoading(false);
            });
    };

    return (
        <>
            <div className="students-courses-block">
                <List
                    size="default"
                    dataSource={studentsCourses}
                    renderItem={(item) => (
                        <StudentsCourseRow studentCourse={item} />
                    )}
                />
                <div className="add-course-block">
                    <Button type="primary" onClick={onAddStudentCourse}>
                        Add Course
                    </Button>
                </div>
            </div>
            <AddStudentsCourse
                student={student}
                isModalVisible={isModalVisible}
                onModalClose={onModalClose}
                onAddStudentsCourseRequest={onSave}
                courses={courses}
            />
        </>
    );
}

export default StudentsCourses;
