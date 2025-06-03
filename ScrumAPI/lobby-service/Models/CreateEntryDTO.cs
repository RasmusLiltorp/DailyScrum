using System.ComponentModel.DataAnnotations;

namespace LobbyService.Models;

public class CreateEntryDTO
{
    public Guid Id { get; set; }
    
    [MaxLength(32)]
    public string Name { get; set; } = "";
    
    [MaxLength(500)]
    public string Yesterday { get; set; } = "";
    
    [MaxLength(500)]
    public string Blockers { get; set; } = "";
    
    [MaxLength(500)]
    public string Today { get; set; } = "";
}