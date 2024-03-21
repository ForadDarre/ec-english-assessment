import { Button, List, Spin } from "antd";
import { Course, Student, StudentCourse } from "../../types/Types";
import MainLayout from "../layout/MainLayout";
import "./AdminPageStyles.scss";
import StudentRow from "./StudentRow";
import { useEffect, useState } from "react";
import {
    AddStudentRequest,
    EditStudentRequest,
    GetAllCoursesRequest,
    GetAllStudentsRequest,
} from "../../requests/Requests";
import { useLoading } from "../../context/LoadingContext";
import { ErrorDefault } from "../../requests/ErrorRequest";
import { GetAllStudentsDtoToStudents } from "../../mappers/StudentsMappers";
import { GetAllCoursesDtoToCourses } from "../../mappers/CoursesMapper";
import AddEditStudentForm from "./AddEditStudentForm";
import { AddStudentRequestDto, EditStudentRequestDto } from "../../types/DTO";

function AdminPage() {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
    const [students, setStudents] = useState<Student[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);

    const { loading, setLoading } = useLoading();

    useEffect(() => {
        setLoading(true);
        GetAllStudentsRequest()
            .then((resStudents) => {
                GetAllCoursesRequest()
                    .then((resCourses) => {
                        const studentsMapped: Student[] =
                            GetAllStudentsDtoToStudents(resStudents.data);
                        setStudents(studentsMapped);

                        const coursesMapped: Course[] =
                            GetAllCoursesDtoToCourses(resCourses.data);
                        setCourses(coursesMapped);
                    })
                    .catch(ErrorDefault)
                    .finally(() => setLoading(false));
            })
            .catch(ErrorDefault);
    }, [setLoading]);

    const onAddStudent = (): void => {
        setIsModalVisible(true);
    };

    const onEditStudent = (student: Student): void => {
        setIsModalVisible(true);
        setStudentToEdit(student);
    };

    const onModalClose = (): void => {
        setIsModalVisible(false);
        setStudentToEdit(null);
    };

    const onAddStudentRequest = async (
        addStudentRequest: AddStudentRequestDto
    ): Promise<void> => {
        setIsModalVisible(false);
        setLoading(true);
        AddStudentRequest(addStudentRequest)
            .then((res) => {
                const addedId: string = res.data.id;
                const addedStudent: Student = {
                    id: addedId,
                    name: addStudentRequest.name,
                    surname: addStudentRequest.surname,
                    email: addStudentRequest.email,
                    studentsCourses: [],
                };

                const updatedStudents: Student[] = [...students];
                updatedStudents.push(addedStudent);
                setStudents(updatedStudents);
            })
            .catch(ErrorDefault)
            .finally(() => {
                setLoading(false);
            });
    };

    const onEditStudentRequest = async (
        editStudentRequest: EditStudentRequestDto
    ): Promise<void> => {
        setIsModalVisible(false);
        setLoading(true);
        EditStudentRequest(editStudentRequest)
            .then(() => {
                const index: number = students.findIndex(
                    (s) => s.id === editStudentRequest.id
                );
                const element: Student | undefined = students.find(
                    (s) => s.id === editStudentRequest.id
                );

                if (index !== -1 && element) {
                    const editedStudent: Student = {
                        ...element,
                        name: editStudentRequest.name,
                        surname: editStudentRequest.surname,
                        email: editStudentRequest.email,
                    };

                    const updatedStudents: Student[] = [...students];
                    updatedStudents[index] = editedStudent;

                    setStudents(updatedStudents);
                }
            })
            .catch(ErrorDefault)
            .finally(() => {
                setLoading(false);
            });
    };

    const updateStudentsAfterAddingCourse = (
        student: Student,
        updatedStudentsCourses: StudentCourse[]
    ) => {
        const updatedStudent: Student = {
            ...student,
            studentsCourses: updatedStudentsCourses,
        };
        const index: number = students.findIndex(
            (s) => s.id === updatedStudent.id
        );

        if (index !== -1) {
            const updatedStudents: Student[] = [...students];
            updatedStudents[index] = updatedStudent;

            setStudents(updatedStudents);
        }
    };

    return (
        <>
            <MainLayout>
                <div className="div-center-horizontally-and-vertically">
                    <div className="admin-page-block">
                        {loading ? (
                            <div
                                className="div-center-horizontally-and-vertically"
                                data-testid="main-loading"
                            >
                                <Spin size="large" />
                            </div>
                        ) : (
                            <>
                                <List
                                    size="default"
                                    dataSource={students}
                                    renderItem={(item) => (
                                        <StudentRow
                                            student={item}
                                            editClick={onEditStudent}
                                            courses={courses}
                                            updateStudents={
                                                updateStudentsAfterAddingCourse
                                            }
                                        />
                                    )}
                                />
                                <div className="add-user-block">
                                    <Button
                                        type="primary"
                                        onClick={onAddStudent}
                                    >
                                        Add Student
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </MainLayout>
            <AddEditStudentForm
                student={studentToEdit}
                isModalVisible={isModalVisible}
                onModalClose={onModalClose}
                onAddStudentRequest={onAddStudentRequest}
                onEditStudentRequest={onEditStudentRequest}
            />
        </>
    );
}

export default AdminPage;
