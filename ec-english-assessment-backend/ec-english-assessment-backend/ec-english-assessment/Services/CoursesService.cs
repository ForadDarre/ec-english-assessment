using AutoMapper;
using ec_english_assessment.Domain.Models;
using ec_english_assessment.DTO.Responses;
using ec_english_assessment.DTO;
using ec_english_assessment.Repositories.Interfaces;
using ec_english_assessment.Services.Interfaces;

namespace ec_english_assessment.Services
{
	public class CoursesService : ICoursesService
	{
		private readonly ICoursesRepository _coursesRepository;
		private readonly IMapper _mapper;

		public CoursesService(ICoursesRepository coursesRepository, IMapper mapper)
		{
			_coursesRepository = coursesRepository;
			_mapper = mapper;
		}

		public async Task<GetAllCoursesDto> GetAllCourses()
		{
			try
			{
				List<Course> courses = await _coursesRepository.GetAllCourses();
				List<CourseDto> courseDtos = _mapper.Map<List<CourseDto>>(courses);
				GetAllCoursesDto getAllCoursesDto = new GetAllCoursesDto() { Courses = courseDtos };

				return getAllCoursesDto;
			}
			catch (Exception ex)
			{
				Console.Write(ex.ToString());
				return null;
			}
		}
	}
}
