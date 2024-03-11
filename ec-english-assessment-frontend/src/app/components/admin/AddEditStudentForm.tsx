import { ChangeEvent, useEffect, useState } from "react";
import { Student } from "../../types/Types";
import { Button, Input, Modal } from "antd";
import { AddStudentRequestDto, EditStudentRequestDto } from "../../types/DTO";

interface DataProps {
    student: Student | null;
    isModalVisible: boolean;
    onModalClose: Function;
    onAddStudentRequest: Function;
    onEditStudentRequest: Function;
}

function AddEditStudentForm(props: DataProps) {
    const {
        student,
        isModalVisible,
        onModalClose,
        onAddStudentRequest,
        onEditStudentRequest,
    } = props;

    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        if (student) {
            setName(student.name);
            setSurname(student.surname);
            setEmail(student.email);
        } else {
            setName("");
            setSurname("");
            setEmail("");
        }
    }, [student]);

    const onNameChange = (value: ChangeEvent<HTMLInputElement>) => {
        setName(value.target.value);
    };

    const onSurnameChange = (value: ChangeEvent<HTMLInputElement>) => {
        setSurname(value.target.value);
    };

    const onEmailChange = (value: ChangeEvent<HTMLInputElement>) => {
        setEmail(value.target.value);
    };

    const onSave = async (): Promise<void> => {
        if (student) {
            const editStudentRequest: EditStudentRequestDto = {
                id: student.id,
                name: name,
                surname: surname,
                email: email,
            };
            onEditStudentRequest(editStudentRequest);
        } else {
            const addStudentRequest: AddStudentRequestDto = {
                name: name,
                surname: surname,
                email: email,
            };
            onAddStudentRequest(addStudentRequest);
        }
    };

    const modalClose = (): void => {
        onModalClose();
    };

    return (
        <Modal
            title={student === null ? "Add Student" : "Edit Student"}
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
                    onClick={onSave}
                >
                    Save
                </Button>,
            ]}
        >
            <div className="add-edit-student-block">
                <div className="add-edit-student-labels">
                    <span className="add-edit-student-label">Name:</span>
                    <span className="add-edit-student-label">Surname:</span>
                    <span className="add-edit-student-label">Email:</span>
                </div>
                <div className="add-edit-student-values">
                    <Input
                        placeholder="Enter student's name"
                        className="add-edit-student-value"
                        value={name}
                        onChange={onNameChange}
                    />
                    <Input
                        placeholder="Enter student's surname"
                        className="add-edit-student-value"
                        value={surname}
                        onChange={onSurnameChange}
                    />
                    <Input
                        placeholder="Enter student's email"
                        className="add-edit-student-value"
                        value={email}
                        onChange={onEmailChange}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default AddEditStudentForm;
