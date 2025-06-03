namespace LobbyService.Models;

public class CreateEntryDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; } = "";
    public string Yesterday { get; set; } = "";
    public string Blockers { get; set; } = "";
    public string Today { get; set; } = "";
}