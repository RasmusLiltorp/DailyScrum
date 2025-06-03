using System.ComponentModel.DataAnnotations;

namespace LobbyService.Models;

public class Entry
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid LobbyId { get; set; }
    
    [MaxLength(32)]
    public string Name { get; set; } = "";
    
    [MaxLength(500)]
    public string Yesterday { get; set; } = "";
    
    [MaxLength(500)]
    public string Blockers { get; set; } = "";
    
    [MaxLength(500)]
    public string Today { get; set; } = "";
    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
}