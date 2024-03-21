using ec_english_assessment.DTO.Responses;
using ec_english_assessment.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ec_english_assessment.Controllers
{
	[ApiController]
	[Route("api/courses/")]
	public class CoursesController : Controller
	{
		private ICoursesService _coursesService;

		public CoursesController(ICoursesService coursesService)
		{
			_coursesService = coursesService;
		}

		[HttpGet]
		[Route("GetAllCourses")]
		public async Task<IActionResult> GetAllCourses()
		{
			GetAllCoursesDto getAllCoursesDto = await _coursesService.GetAllCourses();
			if (getAllCoursesDto is null)
			{
				return StatusCode(500);
			}

			return Ok(getAllCoursesDto);
		}
	}
}
