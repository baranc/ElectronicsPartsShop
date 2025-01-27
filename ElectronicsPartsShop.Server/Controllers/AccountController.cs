using ElectronicsPartsShop.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


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

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (string.IsNullOrWhiteSpace(registerDto.Password) || string.IsNullOrWhiteSpace(registerDto.Username))
            {
                return BadRequest("Username and password are required.");
            }

            var user = new AppUser { UserName = registerDto.Username };
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            var userRole = await _userManager.AddToRoleAsync(user, "User");

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
                return Ok(new { Message = "User registered successfully!" });
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] RegisterDto registerDto)
        {
            if (string.IsNullOrWhiteSpace(registerDto.Password) || string.IsNullOrWhiteSpace(registerDto.Username))
            {
                return BadRequest("Username and password are required.");
            }
            var user = await _userManager.FindByNameAsync(registerDto.Username);
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
}