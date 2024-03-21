using System;
using System.ComponentModel.DataAnnotations;

namespace businessService.Models
{

    public class BusinessModel
    {
        [Key]
        public int businessID { get; set; }
        public int userID { get; set; }
        public string? businessName  { get; set; }
        public string? contactInfo  { get; set; }
        public string? billingAddress  { get; set; }
        public string? businessCategory { get; set; }
        public DateTime? dateCreated { get; set; }
    }
}

