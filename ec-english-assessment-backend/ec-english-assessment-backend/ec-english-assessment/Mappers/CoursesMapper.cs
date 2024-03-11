using AutoMapper;
using ec_english_assessment.Domain.Models;
using ec_english_assessment.DTO;

namespace ec_english_assessment.Mappers
{
	public class CoursesMapper : Profile
	{
		public CoursesMapper()
		{
			CreateMap<Course, CourseDto>();
		}
	}
}
