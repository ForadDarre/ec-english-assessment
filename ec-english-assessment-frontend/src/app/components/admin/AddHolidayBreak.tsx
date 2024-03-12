import { Button, DatePicker, DatePickerProps, Modal } from "antd";
import { useEffect, useState } from "react";
import { StudentCourse } from "../../types/Types";
import { Dayjs } from "dayjs";
import { AddHolidayBreakRequestDto } from "../../types/DTO";

interface DataProps {
    studentCourse: StudentCourse;
    isModalVisible: boolean;
    onModalClose: Function;
    onAddHolidayBreakRequest: Function;
}

function AddHolidayBreak(props: DataProps) {
    const {
        studentCourse,
        isModalVisible,
        onModalClose,
        onAddHolidayBreakRequest,
    } = props;

    const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(
        null
    );
    const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(null);
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        if (selectedStartDate && selectedEndDate) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [selectedStartDate, selectedEndDate]);

    const save = async (): Promise<void> => {
        if (!selectedStartDate || !selectedEndDate) {
            return;
        }
        const addHolidayBreakRequestDto: AddHolidayBreakRequestDto = {
            studentCourseId: studentCourse.id,
            startDate: selectedStartDate.format("YYYY-MM-DD"),
            endDate: selectedEndDate.format("YYYY-MM-DD"),
        };
        onAddHolidayBreakRequest(addHolidayBreakRequestDto);
    };

    const modalClose = (): void => {
        onModalClose();
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
            title={"Add Holiday Break"}
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
                    <span className="add-edit-modal-label">
                        {studentCourse.course.name}
                    </span>
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

export default AddHolidayBreak;
