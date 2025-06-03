using Microsoft.EntityFrameworkCore;
using LobbyService.Models;

namespace LobbyService.Data;

public class LobbyDbContext : DbContext
{
    public LobbyDbContext(DbContextOptions<LobbyDbContext> options) : base(options) { }
    
    public DbSet<Lobby> Lobbies { get; set; }
}