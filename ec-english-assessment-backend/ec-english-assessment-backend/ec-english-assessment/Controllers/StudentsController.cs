using AutoMapper;
using ec_english_assessment.Domain.Models;
using ec_english_assessment.DTO;
using ec_english_assessment.DTO.Responses;
using ec_english_assessment.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ec_english_assessment.Controllers
{
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

            return Ok(getAllStudentsDto);
        }
    }
}
