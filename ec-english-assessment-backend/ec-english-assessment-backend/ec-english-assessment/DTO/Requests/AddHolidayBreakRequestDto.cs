namespace ec_english_assessment.DTO.Requests
{
	public class AddHolidayBreakRequestDto
	{
		public Guid StudentCourseId { get; set; }

		public DateTime StartDate { get; set; }

		public DateTime EndDate { get; set; }
	}
}
