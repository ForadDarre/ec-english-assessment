using AutoMapper;
using ec_english_assessment.Domain.Models;
using ec_english_assessment.DTO;

namespace ec_english_assessment.Mappers
{
	public class StudentsCoursesMapper : Profile
	{
		public StudentsCoursesMapper()
		{
			CreateMap<StudentsCourse, StudentsCourseDto>();
		}
	}
}
