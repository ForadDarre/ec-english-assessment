import { Button, List, Modal } from "antd";
import { Student } from "../../types/Types";
import MainLayout from "../layout/MainLayout";
import "./AdminPageStyles.scss";
import StudentRow from "./StudentRow";
import { useState } from "react";

const students: Student[] = [
    { id: "id1", name: "name1", surname: "surname1", email: "email1" },
    { id: "id2", name: "name2", surname: "surname2", email: "email2" },
    { id: "id3", name: "name3", surname: "surname3", email: "email3" },
];

function AdminPage() {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);

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

    const onSave = (): void => {
        console.log("Save");
        setIsModalVisible(false);
    };

    return (
        <>
            <MainLayout>
                <div className="div-center-horizontally-and-vertically">
                    <div className="admin-page-block">
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
                            <Button type="primary" onClick={onAddStudent}>
                                Add Student
                            </Button>
                        </div>
                    </div>
                </div>
            </MainLayout>
            <Modal
                title={studentToEdit === null ? "Add Student" : "Edit Student"}
                className="rounded-modal"
                centered
                open={isModalVisible}
                width={"70%"}
                onCancel={onModalClose}
                cancelText="Cancel"
                footer={[
                    <Button
                        type="default"
                        className="rounded-button"
                        key={"CancelButton"}
                        onClick={onModalClose}
                    >
                        Cancel
                    </Button>,
                    <Button
                        type="primary"
                        className="rounded-button"
                        key={"OkButton"}
                        onClick={onSave}
                    >
                        Save
                    </Button>,
                ]}
            >
                <>Test</>
            </Modal>
        </>
    );
}

export default AdminPage;
