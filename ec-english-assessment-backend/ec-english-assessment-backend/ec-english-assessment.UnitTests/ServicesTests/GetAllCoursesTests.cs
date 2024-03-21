using AutoMapper;
using ec_english_assessment.Domain.Models;
using ec_english_assessment.DTO;
using ec_english_assessment.DTO.Responses;
using ec_english_assessment.Repositories.Interfaces;
using ec_english_assessment.Services;
using Moq;

namespace ec_english_assessment.UnitTests.ServicesTests
{
	public class GetAllCoursesTests
	{
		private readonly CoursesService _sut;
		private readonly Mock<IMapper> _mapperMock = new();
		private readonly Mock<ICoursesRepository> _corsesRepositoryMock = new();

		public GetAllCoursesTests()
		{
			_sut = new CoursesService(
				_corsesRepositoryMock.Object,
				_mapperMock.Object
			);
		}

		[Trait("GetAllCoursesTests", "Positive")]
		[Fact]
		public async Task GetAllCourses_ShouldReturnSucess()
		{
			//Arrange            
			List<Course>? courses = new List<Course> { new Course() { Id = Guid.NewGuid(), Name = "Course 1" } };

			_corsesRepositoryMock.Setup(repo => repo.GetAllCourses()).ReturnsAsync(courses);
			_mapperMock.Setup(mapper => mapper.Map<List<CourseDto>>(It.IsAny<List<Course>>())).Returns(new List<CourseDto> { new CourseDto() { Id = Guid.NewGuid(), Name = "Course 1" } });

			//Act
			GetAllCoursesDto result = await _sut.GetAllCourses();

			//Assert
			Assert.NotNull(result);
			Assert.Single(result.Courses);
		}

		[Trait("GetAllCoursesTests", "Negative")]
		[Fact]
		public async Task GetAllCourses_ShouldReturnFailure_WhenThereIsAnErrorInRepo()
		{
			// Arrange            
			_corsesRepositoryMock.Setup(repo => repo.GetAllCourses()).ThrowsAsync(new Exception("Repository failed"));

			// Act
			var result = await _sut.GetAllCourses();

			// Assert
			Assert.Null(result);
		}
	}
}
