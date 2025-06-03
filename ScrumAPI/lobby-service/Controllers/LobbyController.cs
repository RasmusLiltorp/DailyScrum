using LobbyService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

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
    [EnableRateLimiting("PerIpPolicy")]
    public async Task<IActionResult> CreateLobby()
    {
        var lobby = await _lobbyService.CreateLobbyAsync();
        return Ok(lobby);
    }

    [HttpGet("{code}")]
    [EnableRateLimiting("PerIpPolicy")]

    public async Task<IActionResult> GetLobby(string code)
    {
        var lobby = await _lobbyService.GetLobbyAsync(code);

        if (lobby == null)
        {
            return NotFound();
        }

        return Ok(lobby);
    }

    [HttpPost("{code}/entries")]
    [EnableRateLimiting("PerIpPolicy")]
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