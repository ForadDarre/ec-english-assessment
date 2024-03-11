using ec_english_assessment.Domain.Models;

namespace ec_english_assessment.Repositories.Interfaces
{
    public interface IStudentsRepository
    {
        public Task<List<Student>> GetAllStudents();
    }
}
