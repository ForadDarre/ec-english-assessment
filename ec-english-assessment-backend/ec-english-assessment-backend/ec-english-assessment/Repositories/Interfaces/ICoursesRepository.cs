using ec_english_assessment.Domain.Models;

namespace ec_english_assessment.Repositories.Interfaces
{
	public interface ICoursesRepository
	{
		public Task<List<Course>> GetAllCourses();
	}
}
