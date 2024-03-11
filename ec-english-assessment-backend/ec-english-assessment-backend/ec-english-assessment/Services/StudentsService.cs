using AutoMapper;
using ec_english_assessment.Domain.Models;
using ec_english_assessment.DTO;
using ec_english_assessment.DTO.Requests;
using ec_english_assessment.DTO.Responses;
using ec_english_assessment.Repositories.Interfaces;
using ec_english_assessment.Services.Interfaces;

namespace ec_english_assessment.Services
{
	public class StudentsService : IStudentsService
	{
		private readonly IStudentsRepository _studentRepository;
		private readonly IMapper _mapper;
		private readonly ILogger<StudentsService> _logger;

		public StudentsService(IStudentsRepository studentRepository, IMapper mapper, ILogger<StudentsService> logger)
		{
			_studentRepository = studentRepository;
			_mapper = mapper;
			_logger = logger;
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
	}
}
