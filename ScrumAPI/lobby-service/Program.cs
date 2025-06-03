using LobbyService.Data;
using LobbyService.Services;
using Microsoft.EntityFrameworkCore;
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

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Lobby API v1"));
}

app.UseHttpsRedirection();

app.MapControllers();

app.MapGet("/health", async (ConnectionChecker checker) =>
{
    return await checker.CanConnectAsync() ? Results.Ok("Database OK") : Results.Problem("Database unavailable");
});

app.Run();