﻿namespace ec_english_assessment.DTO.Requests
{
	public class EditStudentRequestDto
	{
		public Guid Id { get; set; }

		public string Name { get; set; }

		public string Surname { get; set; }

		public string Email { get; set; }
	}
}
