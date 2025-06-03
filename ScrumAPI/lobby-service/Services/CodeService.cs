using System.Security.Cryptography;
using LobbyService.Data;
using Microsoft.EntityFrameworkCore;

namespace LobbyService.Services;

public class CodeService
{
    private const string Alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    private static readonly RandomNumberGenerator _rng = RandomNumberGenerator.Create();
    
    private readonly LobbyDbContext _db;
    
    public CodeService(LobbyDbContext db) => _db = db;

    public async Task<string> GenerateUniqueCodeAsync(int length = 6, int attempts = 5)
    {
        for (int attempt = 0; attempt < attempts; attempt++)
        {
            var code = GenerateRandomCode(length);
            
            var exists = await _db.Lobbies.AnyAsync(l => l.Code == code);
            if (!exists)
            {
                return code;
            }
        }
        
        throw new InvalidOperationException("Failed to generate unique code");
    }

    private static string GenerateRandomCode(int length)
    {
        var buffer = new byte[length];
        _rng.GetBytes(buffer);
        var chars = new char[length];
        
        for (int i = 0; i < length; i++)
        {
            chars[i] = Alphabet[buffer[i] % Alphabet.Length];
        }
        
        return new string(chars);
    }
}