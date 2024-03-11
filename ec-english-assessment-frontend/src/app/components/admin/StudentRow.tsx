import { Student } from "../../types/Types";
import { Collapse, CollapseProps } from "antd";
import StudentInfo from "./StudentInfo";
import StudentsCourses from "./StudentsCourses";

interface DataProps {
    student: Student;
    editClick: Function;
}

function StudentRow(props: DataProps) {
    const { student, editClick } = props;

    const items: CollapseProps["items"] = [
        {
            key: student.id,
            label: <StudentInfo student={student} editClick={editClick} />,
            children: (
                <StudentsCourses studentsCourses={student.studentsCourses} />
            ),
        },
    ];

    return <Collapse className="student-row" items={items}></Collapse>;
}

export default StudentRow;
