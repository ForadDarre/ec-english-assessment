using ec_english_assessment.DTO.Requests;
using ec_english_assessment.DTO.Responses;
using ec_english_assessment.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ec_english_assessment.Controllers
{
	[ApiController]
	[Route("api/students/")]
	public class StudentsController : Controller
	{
		private IStudentsService _studentsService;


		public StudentsController(IStudentsService studentsService)
		{
			_studentsService = studentsService;
		}

		[HttpGet]
		[Route("GetAllStudents")]
		public async Task<IActionResult> GetAllStudents()
		{
			GetAllStudentsDto getAllStudentsDto = await _studentsService.GetAllStudents();
			if (getAllStudentsDto is null)
			{
				return StatusCode(500);
			}

			return Ok(getAllStudentsDto);
		}

		[HttpPut]
		[Route("AddStudent")]
		public async Task<IActionResult> AddStudent([FromBody] AddStudentRequestDto addStudentRequestDto)
		{
			AddStudentResponse? addedStudent = await _studentsService.AddStudent(addStudentRequestDto);
			if (addedStudent == null)
			{
				return BadRequest("An error occured. Cannot add student.");
			}

			return Ok(addedStudent);
		}

		[HttpPost]
		[Route("EditStudent")]
		public async Task<IActionResult> EditStudent([FromBody] EditStudentRequestDto editStudentRequestDto)
		{
			string? editedStudent = await _studentsService.EditStudent(editStudentRequestDto);
			if (editedStudent == null)
			{
				return BadRequest("An error occured. Cannot edit student.");
			}

			return Ok(editedStudent);
		}

		[HttpPut]
		[Route("AddStudentsCourse")]
		public async Task<IActionResult> AddStudentsCourse([FromBody] AddStudentsCourseRequestDto addStudentsCourseRequestDto)
		{
			AddStudentsCourseResponseDto? addedStudentsCourse = await _studentsService.AddStudentsCourse(addStudentsCourseRequestDto);
			if (addedStudentsCourse == null)
			{
				return BadRequest("An error occured. Cannot add course.");
			}

			return Ok(addedStudentsCourse);
		}

		[HttpPut]
		[Route("AddHolidayBreak")]
		public async Task<IActionResult> AddHolidayBreak([FromBody] AddHolidayBreakRequestDto addHolidayBreakRequestDto)
		{
			return Ok();

			// PSEUDOCODE HERE

			// I suggest the following logic:
			// 1) We retrieve all the existing courses except the one we want to book a holiday for
			// 2) We try to "extend" the course
			// 3) If it doesn't overlap (we can use the same function I've created for AddStudentsCourse) we extend it
			// 4) If it overlaps, it is more a business decision. However, my suggestion is:
			// 5) We try to move or shrink the next courses until we catch up the schedule, i.e.
			// 5.1) Course A starts to overlap Course B for 2 weeks. We move Course B 2 weeks ahead in the schedule
			// 5.2) Course B starts to overlap Course C for 1 week. We move Course C 1 week ahead in the schedule
			// 5.3) Course C doesn't overlap any other courses.
			// 5.4) We form a new schedule and send the Student for approval. If he declines, we inform him that he has conflicts in his schedule that should be handled manually.

		}
	}
}
