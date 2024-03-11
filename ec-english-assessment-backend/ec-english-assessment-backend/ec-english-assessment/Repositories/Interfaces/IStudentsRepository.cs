using ec_english_assessment.Domain.Models;

namespace ec_english_assessment.Repositories.Interfaces
{
	public interface IStudentsRepository
	{
		public Task<List<Student>> GetAllStudents();

		public Student? GetStudentById(string studentId);

		public Task<Student> AddStudent(Student student);

		public Task<string> EditStudent(Student existingStudent, Student studentWithNewData);
	}
}
