using ec_english_assessment.Context;
using ec_english_assessment.Repositories;
using ec_english_assessment.Repositories.Interfaces;
using ec_english_assessment.Services;
using ec_english_assessment.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using NLog;
using NLog.Web;

Logger logger = LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
logger.Debug("Init main");

try
{
	WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
	IConfiguration config = builder.Configuration;
	IServiceCollection services = builder.Services;

	// NLog: Setup NLog for Dependency injection
	builder.Logging.ClearProviders();
	builder.Logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Error);
	builder.Host.UseNLog();

	services.AddEndpointsApiExplorer();
	services.AddSwaggerGen();
	services.AddDbContext<BaseContext>(opt => opt.UseSqlServer(config.GetConnectionString("ECenglishDB")));
	services.AddHttpContextAccessor();
	services.AddAutoMapper(typeof(Program).Assembly);

	services.AddTransient<IStudentsService, StudentsService>();
	services.AddTransient<IStudentsRepository, StudentsRepository>();
	services.AddTransient<ICoursesService, CoursesService>();
	services.AddTransient<ICoursesRepository, CoursesRepository>();
	services.AddTransient<IStudentsCoursesRepository, StudentsCoursesRepository>();

	builder.Services.AddControllers();
	builder.Services.AddEndpointsApiExplorer();
	builder.Services.AddSwaggerGen();

	if (builder.Environment.IsDevelopment())
	{
		services.AddCors(options =>
		{
			options.AddPolicy("ReactPolicy",
				builder =>
				{
					builder.WithOrigins("http://localhost:3000")
					   .AllowAnyHeader()
					   .AllowAnyMethod();
				});
		});
	}

	WebApplication app = builder.Build();

	// Configure the HTTP request pipeline.
	if (app.Environment.IsDevelopment())
	{
		app.UseSwagger();
		app.UseSwaggerUI();
		app.UseCors("ReactPolicy");
	}

	app.UseStaticFiles();
	app.UseRouting();
	//app.UseHttpsRedirection();
	app.UseAuthentication();
	app.UseAuthorization();

	app.UseEndpoints(endpoints =>
	{
		endpoints.MapControllers();
	});

	app.UseSpa(spa =>
	{
		if (app.Environment.IsDevelopment())
		{
			spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
		}
	});

	app.Run();
}
catch (Exception exception)
{
	// NLog: catch setup errors
	logger.Error(exception, "Stopped program because of exception");
	throw;
}
finally
{
	// Ensure to flush and stop internal timers/threads before application-exit (Avoid segmentation fault on Linux)
	LogManager.Shutdown();
}

