using System.Security.Authentication;
using System.Security.Claims;

namespace ElectronicsPartsShop.Server.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        public static string GetEmail(this ClaimsPrincipal user)
        {
            var email = user.FindFirstValue(ClaimTypes.Email)
                ?? throw new AuthenticationException("nie znaleziono żądanego email");

            return email;
        }
    }
}
