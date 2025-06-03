using System.ComponentModel.DataAnnotations;

namespace LobbyService.Models;

public class CreateLobbyDTO
{
    [Required]
    public string CaptchaToken { get; set; } = "";
}
