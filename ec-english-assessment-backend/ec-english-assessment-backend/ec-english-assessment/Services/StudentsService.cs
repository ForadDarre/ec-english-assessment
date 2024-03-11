using AutoMapper;
using ec_english_assessment.Domain.Models;
using ec_english_assessment.DTO;
using ec_english_assessment.DTO.Responses;
using ec_english_assessment.Repositories.Interfaces;
using ec_english_assessment.Services.Interfaces;

namespace ec_english_assessment.Services
{
    public class StudentsService : IStudentsService
    {
        private readonly IStudentsRepository _studentRepository;
        private readonly IMapper _mapper;

        public StudentsService(IStudentsRepository studentRepository, IMapper mapper)
        {
            _studentRepository = studentRepository;
            _mapper = mapper;
        }

        public async Task<GetAllStudentsDto> GetAllStudents()
        {
            try
            {
                List<Student> students = await _studentRepository.GetAllStudents();
                List<StudentDto> studentDtos = students.Select(s => _mapper.Map<StudentDto>(students)).ToList();
                GetAllStudentsDto getAllStudentsDto = new GetAllStudentsDto() { Students = studentDtos };

                return getAllStudentsDto;
            }
            catch (Exception ex)
            {
                Console.Write(ex.ToString());
                return null;
            }
        }
    }
}
