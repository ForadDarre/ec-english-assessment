using ec_english_assessment.Domain.Models;

namespace ec_english_assessment.DTO
{
	public class StudentsCourseDto
	{
		public Guid Id { get; set; }

		public DateTime StartDate { get; set; }

		public DateTime EndDate { get; set; }

		public Guid StudentId { get; set; }

		public Guid CourseId { get; set; }

		public CourseDto Course { get; set; }
	}
}
