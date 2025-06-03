using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using LobbyService.Data;
using LobbyService.Services;

namespace LobbyService.Tests;

public class IntegrationTests
{
    private ConnectionChecker _checker;

    [SetUp]
    public void Setup()
    {
        var connStr = Environment.GetEnvironmentVariable("SUPABASE_CONNECTION_STRING");

        if (string.IsNullOrWhiteSpace(connStr))
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(TestContext.CurrentContext.TestDirectory)
                .AddJsonFile("appsettings.json")
                .Build();

            connStr = config.GetConnectionString("SupabaseConnection");
        }

        Assert.That(connStr, Is.Not.Null.And.Not.Empty,
            "Connection string is missing from env (SUPABASE_CONNECTION_STRING) and appsettings.json");

        var options = new DbContextOptionsBuilder<LobbyDbContext>()
            .UseNpgsql(connStr)
            .Options;

        var context = new LobbyDbContext(options);
        _checker = new ConnectionChecker(context);
    }
    
    [Test]
    public async Task CanConnectToSupabase()
    {
        try
        {
            Console.WriteLine("Attempting to connect to Supabase");
            var result = await _checker.CanConnectAsync();
            Assert.That(result, Is.True, "Could not connect to Supabase");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Exception during connection attempt: {ex.Message}");
            Console.WriteLine($"Stack Trace: {ex.StackTrace}");
            Assert.Fail($"Connection test failed with exception: {ex.Message}");
        }
    }
}