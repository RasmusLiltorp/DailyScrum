namespace LobbyService.Models;

public class Entry
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid LobbyId { get; set; }
    public string Name { get; set; } = "";
    public string Yesterday { get; set; } = "";
    public string Blockers { get; set; } = "";
    public string Today { get; set; } = "";
    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
}