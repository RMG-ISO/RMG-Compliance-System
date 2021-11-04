using AutoMapper;
using RMG.ComplianceSystem.Authors;
using RMG.ComplianceSystem.Books;

namespace RMG.ComplianceSystem
{
    public class ComplianceSystemApplicationAutoMapperProfile : Profile
    {
        public ComplianceSystemApplicationAutoMapperProfile()
        {
            /* You can configure your AutoMapper mapping configuration here.
             * Alternatively, you can split your mapping configurations
             * into multiple profile classes for a better organization. */

            CreateMap<Book, BookDto>();
            CreateMap<CreateUpdateBookDto, Book>();
            CreateMap<Author, AuthorDto>();
            CreateMap<Author, AuthorLookupDto>();
            CreateMap<CreateAuthorWithBookDto, Author>();
            CreateMap<CreateBookDto, Book>();
            CreateMap<Author, AuthorWithDetailsDto>();
        }
    }
}
