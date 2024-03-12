using AutoMapper;
using ec_english_assessment.Domain.Models;
using ec_english_assessment.DTO;
using ec_english_assessment.DTO.Requests;
using ec_english_assessment.DTO.Responses;
using ec_english_assessment.Repositories.Interfaces;
using ec_english_assessment.Services.Interfaces;
using ec_english_assessment.Validators;
using Microsoft.IdentityModel.Tokens;
using System.Text.RegularExpressions;

namespace ec_english_assessment.Services
{
	public class StudentsService : IStudentsService
	{
		private readonly IStudentsRepository _studentRepository;
		private readonly IStudentsCoursesRepository _studentCoursesRepository;
		private readonly IMapper _mapper;
		private readonly ILogger<StudentsService> _logger;

		public StudentsService(IStudentsRepository studentRepository, IMapper mapper, ILogger<StudentsService> logger, IStudentsCoursesRepository studentCoursesRepository)
		{
			_studentRepository = studentRepository;
			_mapper = mapper;
			_logger = logger;
			_studentCoursesRepository = studentCoursesRepository;
		}

		public async Task<GetAllStudentsDto> GetAllStudents()
		{
			try
			{
				List<Student> students = await _studentRepository.GetAllStudents();
				List<StudentDto> studentDtos = _mapper.Map<List<StudentDto>>(students);
				GetAllStudentsDto getAllStudentsDto = new GetAllStudentsDto() { Students = studentDtos };

				return getAllStudentsDto;
			}
			catch (Exception ex)
			{
				Console.Write(ex.ToString());
				return null;
			}
		}

		public async Task<AddStudentResponse?> AddStudent(AddStudentRequestDto addStudentRequestDto)
		{
			try
			{
				List<Student> allStudents = await _studentRepository.GetAllStudents();
				StudentValidator studentValidator = new StudentValidator();
				if (!studentValidator.IsValidRequest(addStudentRequestDto.Name, addStudentRequestDto.Surname, addStudentRequestDto.Email, allStudents.Select(s => s.Email).ToList()))
				{
					_logger.LogError("AddStudent error. Invalid data inputted.");
					return null;
				}
				Student studentToAdd = _mapper.Map<Student>(addStudentRequestDto);

				Student? createdStudent = await _studentRepository.AddStudent(studentToAdd);

				if (createdStudent == null)
				{
					_logger.LogError("AddStudent error. Cannot create a student.");
					return null;
				}

				AddStudentResponse addStudentResponse = _mapper.Map<AddStudentResponse>(createdStudent);

				return addStudentResponse;
			}
			catch (Exception ex)
			{
				_logger.LogError("AddStudent error."
					+ "\n" + ex.Message);
				return null;
			}
		}

		public async Task<string?> EditStudent(EditStudentRequestDto editStudentRequestDto)
		{
			try
			{
				List<Student> allStudents = await _studentRepository.GetAllStudents();
				StudentValidator studentValidator = new StudentValidator();
				if (!studentValidator.IsValidRequest(editStudentRequestDto.Name, editStudentRequestDto.Surname, editStudentRequestDto.Email, allStudents.Select(s => s.Email).ToList()))
				{
					_logger.LogError("AddStudent error. Invalid data inputted.");
					return null;
				}
				Student? studentToEdit = _studentRepository.GetStudentById(editStudentRequestDto.Id.ToString());

				if (studentToEdit == null)
				{
					_logger.LogError("EditStudent error. Student doesn't exist. Student ID: " + editStudentRequestDto.Id);
					return null;
				}

				Student studetWithNewInfo = _mapper.Map<Student>(editStudentRequestDto);
				string editStudent = await _studentRepository.EditStudent(studentToEdit, studetWithNewInfo);

				if (editStudent == null)
				{
					_logger.LogError("EditStudent error. Cannot edit student.");
					return null;
				}

				return editStudent;
			}
			catch (Exception ex)
			{
				_logger.LogError("EditStudent error."
					+ "\n" + ex.Message);
				return null;
			}
		}

		public async Task<AddStudentsCourseResponseDto?> AddStudentsCourse(AddStudentsCourseRequestDto addStudentsCourseRequestDto)
		{
			try
			{
				List<StudentsCourse> studentsCoursesForStudent = await _studentCoursesRepository.GetAllStudentsCoursesForStudent(addStudentsCourseRequestDto.StudentId.ToString());

				StudentsCourseValidator studentsCourseValidator = new StudentsCourseValidator();

				if (!studentsCourseValidator.IsValidCourse(addStudentsCourseRequestDto.CourseId.ToString(), studentsCoursesForStudent.Select(sc => sc.CourseId.ToString()).ToList()))
				{
					_logger.LogError("AddStudentsCourse error. This student is already participating in this course!");
					return null;
				}

				if (!studentsCourseValidator.ValidateDates(addStudentsCourseRequestDto.StartDate, addStudentsCourseRequestDto.EndDate))
				{
					_logger.LogError("AddStudentsCourse error. Invalid dates inputted!");
					return null;
				}

				StudentsCourse studentsCourseToAdd = _mapper.Map<StudentsCourse>(addStudentsCourseRequestDto);
				studentsCourseToAdd.HolidayApplied = false;

				if (studentsCourseValidator.CheckOverlapsingDates(studentsCoursesForStudent, studentsCourseToAdd))
				{
					_logger.LogError("AddStudentsCourse error. Course dates are overlapsing!");
					return null;
				}

				StudentsCourse? createdStudentCourse = await _studentCoursesRepository.AddStudentCourse(studentsCourseToAdd);

				if (createdStudentCourse == null)
				{
					_logger.LogError("AddStudentsCourse error. Cannot create a student course.");
					return null;
				}

				AddStudentsCourseResponseDto addStudentsCourseResponseDto = _mapper.Map<AddStudentsCourseResponseDto>(createdStudentCourse);

				return addStudentsCourseResponseDto;
			}
			catch (Exception ex)
			{
				_logger.LogError("AddStudentsCourse error."
					+ "\n" + ex.Message);
				return null;
			}
		}
	}
}
