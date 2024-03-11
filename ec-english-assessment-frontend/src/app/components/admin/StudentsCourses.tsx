import React, { useState } from "react";
import { StudentCourse } from "../../types/Types";
import { Button, List, Modal } from "antd";
import StudentsCourseRow from "./StudentsCourseRow";

const studentsCourses: StudentCourse[] = [
    {
        id: "id1",
        student: {
            id: "id1",
            name: "name1",
            surname: "surname1",
            email: "email1",
        },
        course: { id: "id1", name: "course1" },
        startDate: new Date(),
        endDate: new Date(),
    },
    {
        id: "id2",
        student: {
            id: "id1",
            name: "name1",
            surname: "surname1",
            email: "email1",
        },
        course: { id: "id2", name: "course2" },
        startDate: new Date(),
        endDate: new Date(),
    },
];

function StudentsCourses() {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const onAddStudentCourse = (): void => {
        setIsModalVisible(true);
    };

    const onModalClose = (): void => {
        setIsModalVisible(false);
    };

    const onSave = (): void => {
        console.log("Save");
        setIsModalVisible(false);
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
            <Modal
                title={"Add Course"}
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

export default StudentsCourses;
