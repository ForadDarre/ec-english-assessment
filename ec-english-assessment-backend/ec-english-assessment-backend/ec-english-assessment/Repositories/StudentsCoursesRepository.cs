using ec_english_assessment.Context;
using ec_english_assessment.Domain.Models;
using ec_english_assessment.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ec_english_assessment.Repositories
{
	public class StudentsCoursesRepository : IStudentsCoursesRepository
	{
		private readonly BaseContext _context;

		public StudentsCoursesRepository(BaseContext context)
		{
			_context = context;
		}

		public async Task<StudentsCourse> AddStudentCourse(StudentsCourse studentsCourse)
		{
			await _context.AddAsync(studentsCourse);
			await _context.SaveChangesAsync();

			return studentsCourse;
		}

		public async Task<List<StudentsCourse>> GetAllStudentsCoursesForStudent(string studentId)
		{
			List<StudentsCourse> studentsCourses = await _context
				.StudentsCourses
				.Where(s => s.StudentId.ToString() == studentId)
				.ToListAsync();

			return studentsCourses;
		}
	}
}
