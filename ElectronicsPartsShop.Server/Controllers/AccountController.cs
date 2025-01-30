using ElectronicsPartsShop.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Authentication;
using System.Security.Claims;


    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

    [HttpGet("roles/{username}")]
    public async Task<IActionResult> GetUserRoles(string username)
    {
        var user = await _userManager.FindByNameAsync(username);
        if (user == null)
        {
            return NotFound($"User with username '{username}' not found.");
        }

        var roles = await _userManager.GetRolesAsync(user);
        return Ok(roles);
    }

    [Authorize]
    [HttpGet("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return NoContent();
    }

    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo(ClaimsPrincipal claimUser)
    {
        if (User.Identity?.IsAuthenticated == false) return NoContent();
        var user = await _userManager.Users
            .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

        if (user == null) throw new AuthenticationException("User not found");


        return Ok(new
        {
            user.FirstName,
            user.LastName,
            user.Email,
            Roles = User.FindFirstValue(ClaimTypes.Role)
        });
    }
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] RegisterDto registerDto)
    {
        if (string.IsNullOrWhiteSpace(registerDto.Password) || string.IsNullOrWhiteSpace(registerDto.Username))
        {
            return BadRequest("Username and password are required.");
        }
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == registerDto.Username);
        if (user != null)
        {
            var result = await _signInManager.PasswordSignInAsync(user, registerDto.Password, isPersistent: false, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                return Ok();
            }
        }
        return Unauthorized();
    }
}