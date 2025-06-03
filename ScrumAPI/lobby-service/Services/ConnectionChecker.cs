using LobbyService.Data;

namespace LobbyService.Services;

public class ConnectionChecker
{
    private readonly LobbyDbContext _context;

    public ConnectionChecker(LobbyDbContext context)
    {
        _context = context;
    }

    public async Task<bool> CanConnectAsync()
    {
        return await _context.Database.CanConnectAsync();
    }
}