using ec_english_assessment.Context;
using ec_english_assessment.Domain.Models;
using ec_english_assessment.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ec_english_assessment.Repositories
{
	public class CoursesRepository : ICoursesRepository
	{
		private readonly BaseContext _context;

		public CoursesRepository(BaseContext context)
		{
			_context = context;
		}

		public async Task<List<Course>> GetAllCourses()
		{
			List<Course> courses = await _context
				.Courses
				.ToListAsync();

			return courses;
		}
	}
}
