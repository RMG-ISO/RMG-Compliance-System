using System;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Books
{
    public class AuthorLookupDto : EntityDto<Guid>
    {
        public string Name { get; set; }
    }
}