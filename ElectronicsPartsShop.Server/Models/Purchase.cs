
using Microsoft.AspNetCore.Identity;

namespace ElectronicsPartsShop.Server.Models
{
    public class Purchase
    {
        public int Id { get; set; }

        public DateTime PurchaseDate { get; set; }

        public string UserId { get; set; }
        public AppUser User { get; set; }

        public ICollection<PurchaseItem> Items { get; set; } = new List<PurchaseItem>();
    }
}
