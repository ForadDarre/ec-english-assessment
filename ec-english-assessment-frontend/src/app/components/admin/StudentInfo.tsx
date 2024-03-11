import React from "react";
import { Student } from "../../types/Types";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

interface DataProps {
    student: Student;
    editClick: Function;
}

function StudentInfo(props: DataProps) {
    const { student, editClick } = props;

    const onEditClick = (e: any): void => {
        e.stopPropagation();
        editClick(student);
    };

    return (
        <div className="student-info">
            <div className="student-info-name">
                {student.name + " " + student.surname}
            </div>
            <div className="student-info-email">{student.email}</div>
            <Button
                icon={<EditOutlined className="main-color-button" />}
                size="small"
                type="link"
                onClick={onEditClick}
            />
        </div>
    );
}

export default StudentInfo;
