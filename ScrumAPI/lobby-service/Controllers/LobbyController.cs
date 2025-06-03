using LobbyService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace LobbyService.Controllers;

[ApiController]
[Route("api/lobby")]
public class LobbyController : ControllerBase
{
    private readonly Services.LobbyService _lobbyService;
    private readonly Services.CaptchaService _captchaService;

    public LobbyController(Services.LobbyService lobbyService, Services.CaptchaService captchaService)
    {
        _lobbyService = lobbyService;
        _captchaService = captchaService;
    }

    [HttpPost]
    [EnableRateLimiting("PerIpPolicy")]
    public async Task<IActionResult> CreateLobby([FromBody] CreateLobbyDTO dto)
    {
        var isValid = await _captchaService.VerifyTokenAsync(dto.CaptchaToken);
        if (!isValid)
        {
            return BadRequest(new { message = "Invalid CAPTCHA" });
        }

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