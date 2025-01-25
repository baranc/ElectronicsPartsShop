using Microsoft.AspNetCore.Identity;
using System.Net;

namespace ElectronicsPartsShop.Server.Models;

public class AppUser : IdentityUser
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}