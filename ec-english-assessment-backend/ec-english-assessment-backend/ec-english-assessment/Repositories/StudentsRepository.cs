using ec_english_assessment.Context;
using ec_english_assessment.Domain.Models;
using ec_english_assessment.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ec_english_assessment.Repositories
{
	public class StudentsRepository : IStudentsRepository
	{
		private readonly BaseContext _context;

		public StudentsRepository(BaseContext context)
		{
			_context = context;
		}

		public async Task<List<Student>> GetAllStudents()
		{
			List<Student> students = await _context
				.Students
				.Include(s => s.StudentsCourses)
				.ThenInclude(sc => sc.Course)
				.ToListAsync();

			return students;
		}

		public Student? GetStudentById(string studentId)
		{
			Student? student = _context
				.Students
				.SingleOrDefault(p => p.Id.ToString() == studentId);

			return student;
		}

		public async Task<Student> AddStudent(Student student)
		{
			await _context.AddAsync(student);
			await _context.SaveChangesAsync();

			return student;
		}

		public async Task<string> EditStudent(Student existingStudent, Student studentWithNewData)
		{
			existingStudent.Name = studentWithNewData.Name;
			existingStudent.Surname = studentWithNewData.Surname;
			existingStudent.Email = studentWithNewData.Email;

			await _context.SaveChangesAsync();

			return "Success!";
		}
	}
}
