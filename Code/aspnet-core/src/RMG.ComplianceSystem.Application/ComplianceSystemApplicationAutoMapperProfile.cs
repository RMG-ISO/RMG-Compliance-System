using AutoMapper;
using RMG.ComplianceSystem.Authors;
using RMG.ComplianceSystem.Attachments;
using RMG.ComplianceSystem.Attachments.Dtos;
using RMG.ComplianceSystem.Frameworks;
using RMG.ComplianceSystem.Frameworks.Dtos;
using RMG.ComplianceSystem.Departments;
using RMG.ComplianceSystem.Departments.Dtos;
using RMG.ComplianceSystem.Employees;
using RMG.ComplianceSystem.Employees.Dtos;
using RMG.ComplianceSystem.Domains;
using RMG.ComplianceSystem.Domains.Dtos;
using RMG.ComplianceSystem.Controls;
using RMG.ComplianceSystem.Controls.Dtos;
using RMG.ComplianceSystem.Assessments;
using RMG.ComplianceSystem.Assessments.Dtos;
using RMG.ComplianceSystem.Books;
using System.Linq;
using RMG.ComplianceSystem.Shared;
using System;
using RMG.ComplianceSystem.Policies;

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
            CreateMap<Policy, PolicyDto>();
            CreateMap<Attachment, AttachmentDto>();
            CreateMap<AttachmentFile, AttachmentFileDto>();
            CreateMap<Framework, FrameworkDto>();
            CreateMap<CreateUpdateFrameworkDto, Framework>(MemberList.Source);
            CreateMap<Department, DepartmentDto>();
            CreateMap<CreateUpdateDepartmentDto, Department>(MemberList.Source);
            CreateMap<Employee, EmployeeDto>()
                .ForMember(t => t.DepartmentName, ops => ops.MapFrom(t => t.Department != null ? t.Department.Name : null));
            CreateMap<CreateUpdateEmployeeDto, Employee>(MemberList.Source);
            CreateMap<CreateUpdateDomainDto, Domain>();
            CreateMap<Domain, DomainDto>()
                .ForMember(t => t.Departments, ops => ops.MapFrom(t => t.DomainDepartments.Select(r => new NameId<Guid>(r.Department.Name, r.DepartmentId))));
            CreateMap<Domain, DomainWithoutPagingDto>()
                .ForMember(t => t.Departments, ops => ops.MapFrom(t => t.DomainDepartments.Select(r => new NameId<Guid>(r.Department.Name, r.DepartmentId))));
            CreateMap<Control, ControlDto>();
            CreateMap<CreateUpdateControlDto, Control>(MemberList.Source);
            CreateMap<Assessment, AssessmentDto>()
                .ForMember(t => t.Employees, ops => ops.MapFrom(t => t.AssessmentEmployees.Select(r => new NameId<Guid>(r.Employee.FullName, r.EmployeeId))));
            CreateMap<CreateUpdateAssessmentDto, Assessment>(MemberList.Source);
        }
    }
}
