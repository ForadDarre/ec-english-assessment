using AutoMapper;
using ec_english_assessment.Domain.Models;
using ec_english_assessment.DTO;
using ec_english_assessment.DTO.Requests;
using ec_english_assessment.DTO.Responses;

namespace ec_english_assessment.Mappers
{
	public class StudentsMapper : Profile
	{
		public StudentsMapper()
		{
			CreateMap<Student, StudentDto>();

			CreateMap<AddStudentRequestDto, Student>();

			CreateMap<Student, AddStudentResponse>();

			CreateMap<EditStudentRequestDto, Student>();
		}
	}
}
