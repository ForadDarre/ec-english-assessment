using ec_english_assessment.Domain.Models;
using ec_english_assessment.DTO.Responses;

namespace ec_english_assessment.Services.Interfaces
{
    public interface IStudentsService
    {
        Task<GetAllStudentsDto> GetAllStudents();
    }
}
