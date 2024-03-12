using System.Text.RegularExpressions;

namespace ec_english_assessment.Validators
{
	public class StudentValidator
	{
		public bool IsValidRequest(string name, string surname, string email, List<string> existingEmails)
		{
			if (string.IsNullOrEmpty(name)
					|| string.IsNullOrEmpty(surname)
					|| string.IsNullOrEmpty(email))
			{
				return false;
			}

			if (!IsValidEmail(email))
			{
				return false;
			}

			if (existingEmails.Contains(email))
			{
				return false;
			}

			return true;
		}

		private bool IsValidEmail(string email)
		{
			// Regular expression pattern for validating email addresses
			string pattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

			// Create Regex object
			Regex regex = new Regex(pattern);

			// Check if the email matches the pattern
			return regex.IsMatch(email);
		}
	}
}
