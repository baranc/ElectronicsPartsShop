using ElectronicsPartsShop.Server.Data;
using ElectronicsPartsShop.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ElectronicsPartsShop.Server.Controllers
{
    [Route("api/cart")]
    [ApiController]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly ShopDbContext _context;
        private readonly UserManager<AppUser> _userManager;

        public CartController(ShopDbContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout([FromBody] List<PurchaseItemDto> cartItems)
        {
            if (cartItems == null || cartItems.Count == 0)
            {
                return BadRequest("Cart is empty.");
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized("User not found.");
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return Unauthorized("User not found.");
            }

            var purchase = new Purchase
            {
                UserId = userId,
                User = user,
                PurchaseDate = DateTime.UtcNow,
                Items = cartItems.Select(item => new PurchaseItem
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity
                }).ToList()
            };

            _context.Purchases.Add(purchase);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Purchase completed successfully.", purchaseId = purchase.Id });
        }
    }
}