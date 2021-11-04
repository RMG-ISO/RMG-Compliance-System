using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using RMG.ComplianceSystem.Authors;

namespace RMG.ComplianceSystem.Books
{
    public class AuthorWithDetailsDto : AuthorDto
    {
        [Required]
        public ICollection<BookDto> Books { get; set; }

        public AuthorWithDetailsDto()
        {
            Books = new List<BookDto>();
        }
    }
}