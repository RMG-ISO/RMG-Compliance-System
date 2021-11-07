using System.Collections.Generic;
using RMG.ComplianceSystem.Authors;

namespace RMG.ComplianceSystem.Books
{
    public class CreateAuthorWithBookDto : CreateAuthorDto
    {
        public ICollection<CreateBookDto> Books { get; set; }

        public CreateAuthorWithBookDto()
        {
            Books = new List<CreateBookDto>();
        }
    }
}