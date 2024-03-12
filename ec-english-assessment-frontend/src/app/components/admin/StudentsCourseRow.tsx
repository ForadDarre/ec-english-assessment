import { useState } from "react";
import { StudentCourse } from "../../types/Types";
import { Button } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import AddHolidayBreak from "./AddHolidayBreak";
import { AddHolidayBreakRequestDto } from "../../types/DTO";
import { useLoading } from "../../context/LoadingContext";
import { ErrorDefault } from "../../requests/ErrorRequest";
import { AddHolidayBreakRequest } from "../../requests/Requests";

interface DataProps {
    studentCourse: StudentCourse;
}

function StudentsCourseRow(props: DataProps) {
    const { studentCourse } = props;
    const { setLoading } = useLoading();

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const onModalClose = (): void => {
        setIsModalVisible(false);
    };

    const onSave = (
        addHolidayBreakRequestDto: AddHolidayBreakRequestDto
    ): void => {
        setIsModalVisible(false);
        setLoading(true);
        AddHolidayBreakRequest(addHolidayBreakRequestDto)
            .catch(ErrorDefault)
            .finally(() => {
                setIsModalVisible(false);
                setLoading(false);
            });
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
                    icon={
                        <ClockCircleOutlined
                            className={
                                !studentCourse.holidayApplied
                                    ? "main-color-button"
                                    : ""
                            }
                        />
                    }
                    size="small"
                    type="link"
                    disabled={studentCourse.holidayApplied}
                    onClick={onEditClick}
                />
            </div>
            <AddHolidayBreak
                studentCourse={studentCourse}
                isModalVisible={isModalVisible}
                onModalClose={onModalClose}
                onAddHolidayBreakRequest={onSave}
            />
        </>
    );
}

export default StudentsCourseRow;
