using ec_english_assessment.Context;
using ec_english_assessment.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace ec_english_assessment.Controllers.System
{
	[ApiController]
	[Route("api/system/")]
	public class SystemController : Controller
	{
		private readonly BaseContext db;

		public SystemController(BaseContext context)
		{
			db = context;
		}

		[HttpGet]
		[Route("seed")]
		public IActionResult Seed()
		{
			db.Database.EnsureDeleted();
			db.Database.EnsureCreated();

			SeedDB(db);

			return Ok();
		}

		[ApiExplorerSettings(IgnoreApi = true)]
		public void SeedDB(BaseContext context)
		{
			Student student1 = new Student { Id = Guid.NewGuid(), Name = "John", Surname = "Doe", Email = "johndoe@email.com" };
			Student student2 = new Student { Id = Guid.NewGuid(), Name = "Roger", Surname = "Federer", Email = "rogerfederer@email.com" };
			Student student3 = new Student { Id = Guid.NewGuid(), Name = "Lionel", Surname = "Messi", Email = "leomessi@email.com" };

			Course course1 = new Course { Id = Guid.NewGuid(), Name = "Maltese" };
			Course course2 = new Course { Id = Guid.NewGuid(), Name = "Italian" };
			Course course3 = new Course { Id = Guid.NewGuid(), Name = "English" };

			StudentsCourse studentsCourse11 = new StudentsCourse() { Id = Guid.NewGuid(), StudentId = student1.Id, CourseId = course1.Id, StartDate = new DateTime(2024, 02, 05), EndDate = new DateTime(2024, 03, 01) };
			StudentsCourse studentsCourse12 = new StudentsCourse() { Id = Guid.NewGuid(), StudentId = student1.Id, CourseId = course2.Id, StartDate = new DateTime(2024, 03, 04), EndDate = new DateTime(2024, 03, 29) };
			StudentsCourse studentsCourse21 = new StudentsCourse() { Id = Guid.NewGuid(), StudentId = student2.Id, CourseId = course1.Id, StartDate = new DateTime(2024, 02, 05), EndDate = new DateTime(2024, 03, 01) };

			List<Student> students = new List<Student>() { student1, student2, student3 };
			List<Course> courses = new List<Course>() { course1, course2, course3 };
			List<StudentsCourse> studentsCourses = new List<StudentsCourse>() { studentsCourse11, studentsCourse12, studentsCourse21 };

			context.AddRange(students);
			context.AddRange(courses);
			context.AddRange(studentsCourses);

			context.SaveChanges();
		}
	}
}
