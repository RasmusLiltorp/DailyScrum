using LobbyService.Data;
using LobbyService.Services;
using Microsoft.EntityFrameworkCore;
using System.Threading.RateLimiting;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<LobbyDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("SupabaseConnection")));


builder.Services.AddScoped<LobbyService.Services.LobbyService>();
builder.Services.AddScoped<CodeService>();
builder.Services.AddScoped<ConnectionChecker>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Lobby API", Version = "v1" });
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendOnly", policy =>
    {
        policy.WithOrigins("https://PLACEHOLDERFORWHENFRONTENDISUP.com")
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

builder.Services.AddRateLimiter(options =>
{
    options.AddPolicy("PerIpPolicy", context =>
    {
        var ipAddress = context.Request.HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";

        return RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: ipAddress,
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 10,
                Window = TimeSpan.FromMinutes(1),
                QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                QueueLimit = 2
            });
    });
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Lobby API v1"));
}

app.UseHttpsRedirection();

app.UseCors("FrontendOnly");

app.MapControllers();

app.UseRateLimiter();

app.MapGet("/health", async (ConnectionChecker checker) =>
{
    return await checker.CanConnectAsync() ? Results.Ok("Database OK") : Results.Problem("Database unavailable");
});

app.Run();