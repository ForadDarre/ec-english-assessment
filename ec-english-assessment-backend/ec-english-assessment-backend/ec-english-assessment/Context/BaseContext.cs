using ec_english_assessment.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace ec_english_assessment.Context
{
    public class BaseContext : DbContext
    {
        public DbSet<Student> Students { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<StudentsCourse> StudentsCourses { get; set; }

        public BaseContext(DbContextOptions<BaseContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>(s =>
            {
                s.HasKey(st => st.Id);

                s.HasMany(st => st.StudentsCourses).WithOne(sc => sc.Student);

                s.Property(st => st.Name).HasColumnType("VARCHAR").HasMaxLength(100);
                s.Property(st => st.Surname).HasColumnType("VARCHAR").HasMaxLength(100);
                s.Property(st => st.Email).HasColumnType("VARCHAR").HasMaxLength(100);
            });

            modelBuilder.Entity<Course>(c =>
            {
                c.HasKey(st => st.Id);

                c.HasMany(co => co.StudentsCourses).WithOne(sc => sc.Course);

                c.Property(co => co.Name).HasColumnType("VARCHAR").HasMaxLength(100);
            });

            modelBuilder.Entity<StudentsCourse>(c =>
            {
                c.HasKey(sc => sc.Id);
            });
        }
    }
}
