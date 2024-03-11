using ec_english_assessment.Context;
using ec_english_assessment.Domain.Models;
using ec_english_assessment.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ec_english_assessment.Repositories
{
    public class StudentsRepository : IStudentsRepository
    {
        private readonly BaseContext _context;

        public StudentsRepository(BaseContext context)
        {
            _context = context;
        }

        public async Task<List<Student>> GetAllStudents()
        {
            List<Student> students = await _context.Students.ToListAsync();

            return students;
        }
    }
}
