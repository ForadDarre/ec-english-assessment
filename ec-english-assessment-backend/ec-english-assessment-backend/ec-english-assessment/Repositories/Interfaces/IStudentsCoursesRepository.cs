using ec_english_assessment.Domain.Models;

namespace ec_english_assessment.Repositories.Interfaces
{
	public interface IStudentsCoursesRepository
	{
		Task<StudentsCourse> AddStudentCourse(StudentsCourse studentsCourse);

		Task<List<StudentsCourse>> GetAllStudentsCoursesForStudent(string studentId);
	}
}
