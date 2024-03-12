using AutoMapper;
using ec_english_assessment.Domain.Models;
using ec_english_assessment.DTO;
using ec_english_assessment.DTO.Requests;
using ec_english_assessment.DTO.Responses;

namespace ec_english_assessment.Mappers
{
	public class StudentsCoursesMapper : Profile
	{
		public StudentsCoursesMapper()
		{
			CreateMap<StudentsCourse, StudentsCourseDto>();

			CreateMap<AddStudentsCourseRequestDto, StudentsCourse>();

			CreateMap<StudentsCourse, AddStudentsCourseResponseDto>();
		}
	}
}
