using ec_english_assessment.Domain.Models;

namespace ec_english_assessment.Validators
{
	public class StudentsCourseValidator
	{
		public bool IsValidCourse(string courseId, List<string> coursesIds)
		{
			if (coursesIds.Contains(courseId))
			{
				return false;
			}

			return true;
		}

		public bool ValidateDates(DateTime startDate, DateTime endDate)
		{
			if (endDate <= startDate)
			{
				return false;
			}

			if (startDate.DayOfWeek != DayOfWeek.Monday)
			{
				return false;
			}

			if (endDate.DayOfWeek != DayOfWeek.Friday)
			{
				return false;
			}

			return true;
		}

		public bool CheckOverlapsingDates(List<StudentsCourse> existingCourses, StudentsCourse newCourse)
		{
			bool overlaps = false;
			foreach (StudentsCourse existingCourse in existingCourses)
			{
				if (IsOverlap(existingCourse, newCourse))
				{
					overlaps = true;
					break;
				}
			}

			return overlaps;
		}

		private bool IsOverlap(StudentsCourse existingCourse, StudentsCourse newCourse)
		{
			// Check if the new course's start date falls within the existing course
			if (newCourse.StartDate >= existingCourse.StartDate && newCourse.StartDate <= existingCourse.EndDate)
			{
				return true;
			}

			// Check if the new course's end date falls within the existing course
			if (newCourse.EndDate >= existingCourse.StartDate && newCourse.EndDate <= existingCourse.EndDate)
			{
				return true;
			}

			// Check if the new course fully contains the existing course
			if (newCourse.StartDate <= existingCourse.StartDate && newCourse.EndDate >= existingCourse.EndDate)
			{
				return true;
			}

			return false;
		}
	}
}
