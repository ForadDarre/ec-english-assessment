import { Button, DatePicker, DatePickerProps, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { Course, Student } from "../../types/Types";
import { Dayjs } from "dayjs";
import { AddStudentsCourseRequestDto } from "../../types/DTO";

interface DataProps {
    student: Student;
    isModalVisible: boolean;
    courses: Course[];
    onModalClose: Function;
    onAddStudentsCourseRequest: Function;
}

function AddStudentsCourse(props: DataProps) {
    const {
        student,
        isModalVisible,
        courses,
        onModalClose,
        onAddStudentsCourseRequest,
    } = props;

    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(
        null
    );
    const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(null);
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        if (selectedCourse && selectedStartDate && selectedEndDate) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [selectedCourse, selectedStartDate, selectedEndDate]);

    const save = async (): Promise<void> => {
        if (!selectedCourse || !selectedStartDate || !selectedEndDate) {
            return;
        }
        const addStudentsCourseRequestDto: AddStudentsCourseRequestDto = {
            studentId: student.id,
            courseId: selectedCourse.id,
            startDate: selectedStartDate.format("YYYY-MM-DD"),
            endDate: selectedEndDate.format("YYYY-MM-DD"),
        };
        onAddStudentsCourseRequest(addStudentsCourseRequestDto);
    };

    const modalClose = (): void => {
        onModalClose();
    };

    const onSelectCourse = (
        _: any,
        value: { key: string; value: string }
    ): void => {
        const course: Course = { id: value.key, name: value.value };
        setSelectedCourse(course);
    };

    const onStartDateChange: DatePickerProps["onChange"] = (date) => {
        setSelectedStartDate(date);
    };

    const onEndDateChange: DatePickerProps["onChange"] = (date) => {
        setSelectedEndDate(date);
    };

    const disabledStartDate: DatePickerProps["disabledDate"] = (
        current,
        { from }
    ) => {
        if (selectedEndDate && current > selectedEndDate) {
            return true;
        }

        if (current.day() !== 1) {
            return true;
        }

        return false;
    };

    const disabledEndDate: DatePickerProps["disabledDate"] = (
        current,
        { from }
    ) => {
        if (selectedStartDate && current < selectedStartDate) {
            return true;
        }

        if (current.day() !== 5) {
            return true;
        }

        return false;
    };

    return (
        <Modal
            title={"Add Course"}
            className="rounded-modal"
            centered
            open={isModalVisible}
            width={"70%"}
            onCancel={modalClose}
            cancelText="Cancel"
            footer={[
                <Button
                    type="default"
                    className="rounded-button"
                    key={"CancelButton"}
                    onClick={modalClose}
                >
                    Cancel
                </Button>,
                <Button
                    type="primary"
                    className="rounded-button"
                    key={"OkButton"}
                    onClick={save}
                    disabled={!isValid}
                >
                    Save
                </Button>,
            ]}
        >
            <div className="add-edit-modal-block">
                <div className="add-edit-modal-labels">
                    <span className="add-edit-modal-label">Course:</span>
                    <span className="add-edit-modal-label">Start date:</span>
                    <span className="add-edit-modal-label">End date:</span>
                </div>
                <div className="add-edit-modal-values">
                    <Select
                        className="add-edit-modal-value"
                        options={courses.map((c) => {
                            return { key: c.id, value: c.name };
                        })}
                        onSelect={(key, value) => onSelectCourse(key, value)}
                        value={{
                            key: selectedCourse?.id,
                            value: selectedCourse?.name,
                        }}
                    />
                    <DatePicker
                        className="add-edit-modal-value"
                        onChange={onStartDateChange}
                        value={selectedStartDate}
                        disabledDate={disabledStartDate}
                    />
                    <DatePicker
                        className="add-edit-modal-value"
                        onChange={onEndDateChange}
                        value={selectedEndDate}
                        disabledDate={disabledEndDate}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default AddStudentsCourse;
