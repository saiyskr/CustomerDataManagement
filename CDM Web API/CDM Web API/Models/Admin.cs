using System.ComponentModel.DataAnnotations;

namespace CDM_Web_API.Models
{
    public class Admin
    {
        [Key]
        public string Email { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }
}
