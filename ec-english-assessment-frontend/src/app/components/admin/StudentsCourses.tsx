import { useState } from "react";
import { StudentCourse } from "../../types/Types";
import { Button, List, Modal } from "antd";
import StudentsCourseRow from "./StudentsCourseRow";

interface DataProps {
    studentsCourses: StudentCourse[];
}

function StudentsCourses(props: DataProps) {
    const { studentsCourses } = props;

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
