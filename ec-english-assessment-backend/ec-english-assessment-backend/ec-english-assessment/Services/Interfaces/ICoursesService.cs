using ec_english_assessment.DTO.Responses;

namespace ec_english_assessment.Services.Interfaces
{
	public interface ICoursesService
	{
		Task<GetAllCoursesDto> GetAllCourses();
	}
}
