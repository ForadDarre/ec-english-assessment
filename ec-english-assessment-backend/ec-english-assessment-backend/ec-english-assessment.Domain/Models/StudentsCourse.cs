using System.ComponentModel.DataAnnotations;

namespace ec_english_assessment.Domain.Models
{
    public class StudentsCourse
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public Guid StudentId { get; set; }

        [Required]
        public Guid CourseId { get; set; }

        public Student Student { get; set; }

        public Course Course { get; set; }
    }
}
