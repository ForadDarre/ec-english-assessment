using AutoMapper;
using ec_english_assessment.Domain.Models;
using ec_english_assessment.DTO;
using ec_english_assessment.DTO.Requests;
using ec_english_assessment.DTO.Responses;
using ec_english_assessment.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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
		}
	}
}
