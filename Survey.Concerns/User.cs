using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Survey.Concerns
{
    public class User
    {
        [Key]
        [Required]
        public string UserId { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public bool IsAdmin { get; set; }
        public string Token { get; set; }
    }
    public class UserData
    {
        [Required]
        public string username { get; set; }
        [Required]
        public string password { get; set; }
    }
}
