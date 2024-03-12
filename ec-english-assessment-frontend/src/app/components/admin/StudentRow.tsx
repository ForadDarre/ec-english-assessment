import { Course, Student } from "../../types/Types";
import { Collapse, CollapseProps } from "antd";
import StudentInfo from "./StudentInfo";
import StudentsCourses from "./StudentsCourses";

interface DataProps {
    student: Student;
    editClick: Function;
    courses: Course[];
    updateStudents: Function;
}

function StudentRow(props: DataProps) {
    const { student, editClick, courses, updateStudents } = props;

    const items: CollapseProps["items"] = [
        {
            key: student.id,
            label: <StudentInfo student={student} editClick={editClick} />,
            children: (
                <StudentsCourses
                    studentsCourses={student.studentsCourses}
                    courses={courses}
                    student={student}
                    updateStudents={updateStudents}
                />
            ),
        },
    ];

    return <Collapse className="student-row" items={items}></Collapse>;
}

export default StudentRow;
