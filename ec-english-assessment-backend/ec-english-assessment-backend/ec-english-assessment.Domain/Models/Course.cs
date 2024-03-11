using System.ComponentModel.DataAnnotations;

namespace ec_english_assessment.Domain.Models
{
    public class Course
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        public List<StudentsCourse> StudentsCourses { get; set; }
    }
}
