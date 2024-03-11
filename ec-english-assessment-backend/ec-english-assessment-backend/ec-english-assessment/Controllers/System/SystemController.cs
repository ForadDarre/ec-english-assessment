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
            Student student1 = new Student { Name = "John", Surname = "Doe", Email = "johndoe@email.com" };

            List<Student> users = new List<Student>() { student1 };

            context.AddRange(users);

            context.SaveChanges();
        }
    }
}
