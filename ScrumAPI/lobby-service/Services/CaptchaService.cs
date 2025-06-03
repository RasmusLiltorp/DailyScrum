using System.Net.Http.Json;
using Microsoft.Extensions.Configuration;

namespace LobbyService.Services;

public class CaptchaService
{
    private readonly HttpClient _client;
    private readonly string? _secret;

    public CaptchaService(HttpClient client, IConfiguration configuration)
    {
        _client = client;
        _secret = configuration["Captcha:Secret"] ?? configuration["CAPTCHA_SECRET_KEY"];
    }

    private record RecaptchaResponse(bool success);

    public async Task<bool> VerifyTokenAsync(string token)
    {
        if (string.IsNullOrWhiteSpace(_secret))
        {
            return true;
        }

        var response = await _client.PostAsync(
            "https://www.google.com/recaptcha/api/siteverify",
            new FormUrlEncodedContent(new Dictionary<string, string>
            {
                ["secret"] = _secret,
                ["response"] = token
            }));

        if (!response.IsSuccessStatusCode)
        {
            return false;
        }

        var result = await response.Content.ReadFromJsonAsync<RecaptchaResponse>();
        return result?.success ?? false;
    }
}
