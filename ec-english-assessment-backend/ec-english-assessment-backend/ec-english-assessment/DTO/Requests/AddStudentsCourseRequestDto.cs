namespace ec_english_assessment.DTO.Requests
{
	public class AddStudentsCourseRequestDto
	{
		public Guid StudentId { get; set; }

		public Guid CourseId { get; set; }

		public DateTime StartDate { get; set; }

		public DateTime EndDate { get; set; }
	}
}
