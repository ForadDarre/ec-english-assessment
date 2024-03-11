using System.ComponentModel.DataAnnotations;

namespace ec_english_assessment.Domain.Models
{
    public class Student
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public string Email { get; set; }

        public List<StudentsCourse> StudentsCourses { get; set; }
    }
}
