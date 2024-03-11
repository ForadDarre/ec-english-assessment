import React, { useState } from "react";
import { StudentCourse } from "../../types/Types";
import { Button, Modal } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

interface DataProps {
    studentCourse: StudentCourse;
}

function StudentsCourseRow(props: DataProps) {
    const { studentCourse } = props;

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const onModalClose = (): void => {
        setIsModalVisible(false);
    };

    const onSave = (): void => {
        console.log("Save");
        setIsModalVisible(false);
    };

    const onEditClick = (e: any): void => {
        e.stopPropagation();
        setIsModalVisible(true);
    };

    return (
        <>
            <div className="student-course-row">
                <div className="student-course-name">
                    {studentCourse.course.name}
                </div>
                <div className="student-course-dates">
                    {studentCourse.startDate.toLocaleDateString() +
                        " - " +
                        studentCourse.endDate.toLocaleDateString()}
                </div>
                <Button
                    icon={<ClockCircleOutlined className="main-color-button" />}
                    size="small"
                    type="link"
                    onClick={onEditClick}
                />
            </div>
            <Modal
                title={"Add Holiday Break"}
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

export default StudentsCourseRow;
