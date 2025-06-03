using LobbyService.Data;
using LobbyService.Models;
using Microsoft.EntityFrameworkCore;

namespace LobbyService.Services;
public class LobbyService
{
    private readonly LobbyDbContext _db;
    private readonly CodeService _codeService;

    public LobbyService(LobbyDbContext db, CodeService codeService)
    {
        _db = db;
        _codeService = codeService;
    }

    public async Task<Lobby> CreateLobbyAsync()
    {
        var code = await _codeService.GenerateUniqueCodeAsync();
        var lobby = new Lobby{Code = code};
        
        _db.Lobbies.Add(lobby);
        await _db.SaveChangesAsync();

        return lobby;
    }

    public async Task<Lobby?> GetLobbyAsync(string code)
    {
        var lobby = await _db.Lobbies.Include(l => l.Entries)
            .FirstOrDefaultAsync(l => l.Code == code);

        if (lobby == null)
        {
            return null;
        }

        return new Lobby
        {
            Id = lobby.Id,
            Code = lobby.Code,
            CreatedAt = lobby.CreatedAt,
            Entries = lobby.Entries.Select(e => new Entry
            {
                Id = e.Id,
                LobbyId = lobby.Id,
                Name = e.Name,
                Yesterday = e.Yesterday,
                Blockers = e.Blockers,
                Today = e.Today,
                SubmittedAt = e.SubmittedAt,
            }).ToList()
        };
    }

    public async Task<Entry> AddEntryAsync(string code, Entry entry)
    {
        var lobby = await GetLobbyAsync(code);
        
        if (lobby == null)
            return null;

        entry.LobbyId = lobby.Id;
        
        _db.Entries.Add(entry);
        await _db.SaveChangesAsync();
        
        return entry;
    }
}