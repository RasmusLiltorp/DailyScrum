using LobbyService.Models;
using Microsoft.AspNetCore.Mvc;

namespace LobbyService.Controllers;

[ApiController]
[Route("api/lobby")]
public class LobbyController : ControllerBase
{
    private readonly Services.LobbyService _lobbyService;

    public LobbyController(Services.LobbyService lobbyService)
    {
        _lobbyService = lobbyService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateLobby()
    {
        var lobby = await _lobbyService.CreateLobbyAsync();
        return Ok(lobby);
    }

    [HttpGet("{code}")]
    public async Task<IActionResult> GetLobby(string code)
    {
        var lobby = await _lobbyService.GetLobbyAsync(code);
        return Ok(lobby);
    }

    [HttpPost("{code}/entries")]
    public async Task<IActionResult> AddEntry(string code, [FromBody] CreateEntryDTO dto)
    {
        var lobby = await _lobbyService.GetLobbyAsync(code);

        if (lobby == null)
        {
            return new NotFoundResult();
        }
        
        var entry = new Entry
        {
            LobbyId = lobby.Id,
            Name = dto.Name,
            Yesterday = dto.Yesterday,
            Today = dto.Today,
            Blockers = dto.Blockers
        };

        var result = await _lobbyService.AddEntryAsync(code, entry);
        return Ok(result);
    }

}