using AutoMapper;
using ec_english_assessment.Domain.Models;
using ec_english_assessment.DTO;
using System.Diagnostics.Metrics;

namespace ec_english_assessment.Mappers
{
    public class StudentsMapper : Profile
    {
        public StudentsMapper()
        {
            CreateMap<Student, StudentDto>();
            CreateMap<StudentDto, Student>();
        }
    }
}
