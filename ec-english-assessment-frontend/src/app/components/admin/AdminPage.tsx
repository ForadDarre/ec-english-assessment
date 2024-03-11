import { Button, List, Modal, Spin } from "antd";
import { Course, Student } from "../../types/Types";
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

const students: Student[] = [
    {
        id: "id1",
        name: "name1",
        surname: "surname1",
        email: "email1",
        studentsCourses: [],
    },
    {
        id: "id2",
        name: "name2",
        surname: "surname2",
        email: "email2",
        studentsCourses: [],
    },
    {
        id: "id3",
        name: "name3",
        surname: "surname3",
        email: "email3",
        studentsCourses: [],
    },
];

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
    }, []);

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
            .then(() => {})
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
            .then(() => {})
            .catch(ErrorDefault)
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <MainLayout>
                <div className="div-center-horizontally-and-vertically">
                    <div className="admin-page-block">
                        {loading ? (
                            <div className="div-center-horizontally-and-vertically">
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
