namespace LobbyService.Models;

public class Lobby
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Code { get; set; } 
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public List<Entry> Entries { get; set; } = new();
}