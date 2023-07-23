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
using RMG.ComplianceSystem.Documents.Dtos;
using RMG.ComplianceSystem.Documents;
using RMG.ComplianceSystem.Risks.Entity;
using RMG.ComplianceSystem.Risks.Dtos;
using RMG.ComplianceSystem.Risks;
using RMG.ComplianceSystem.StaticData;
using RMG.ComplianceSystem.RiskTreatments;
using RMG.ComplianceSystem.Notifications;
using RMG.ComplianceSystem.Notifications.Dtos;
using RMG.ComplianceSystem.EmailTemplates;
using RMG.ComplianceSystem.EmailTemplates.Dtos;
using RMG.ComplianceSystem.InternalAuditQuestionLists.Footer.Dto;
using RMG.ComplianceSystem.InternalAuditQuestionLists;
using RMG.ComplianceSystem.InternalAuditQuestionLists.Header.Dto;
using RMG.ComplianceSystem.InternalAuditQuestions;
using RMG.ComplianceSystem.InternalAuditPreparation.Dto;
using RMG.ComplianceSystem.InternalAuditPreparations;
using RMG.ComplianceSystem.InternalAuditApproves;
using Microsoft.AspNetCore.Identity;
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
            CreateMap<CreateUpdateDocumentSectionDto, DocumentSection>();
            CreateMap<DocumentSection, DocumentSectionDto>();

            CreateMap<FrameworkChangeStatusLog, FrameworkChangeStatusLogDto>();

            CreateMap<AssessmentVersion, AssessmentVersionDto>();

            CreateMap<Assessment, AssessmentVersion>()
                .ForMember(t => t.Id, ops => ops.Ignore())
                .ForMember(t => t.AssessmentId, ops => ops.MapFrom(t => t.Id));

            CreateMap<Book, BookDto>();
            CreateMap<CreateUpdateBookDto, Book>();
            CreateMap<Author, AuthorDto>();
            CreateMap<Author, AuthorLookupDto>();
            CreateMap<CreateAuthorWithBookDto, Author>();
            CreateMap<CreateBookDto, Book>();
            CreateMap<Author, AuthorWithDetailsDto>();
            CreateMap<Document, DocumentDto>();
            CreateMap<CreateUpdateDocumentDto, Document>();
            CreateMap<DocumentCategory, DocumentCategoryDto>();
            CreateMap<CreateUpdateDocumentCategoryDto, DocumentCategory>();
            CreateMap<RiskOpportunity, RiskAndOpportunityDto>();
            CreateMap<CreateUpdateRiskAndOpportunityDto, RiskOpportunity>();
             CreateMap<InternalAuditQuestionList, InternalAuditQuestionListDto>();
            CreateMap<CreateUpdateInternalAuditQuestionListDto, InternalAuditQuestionList>();
            CreateMap<InternalAuditMenuQuestion, InternalAuditMenuQuestionDto>();
            CreateMap<CreateUpdateInternalAuditMenuQuestionDto, InternalAuditMenuQuestion>();
            CreateMap<InternalAuditPreparations.InternalAuditPreparation, InternalAuditPreparationDto>();
            CreateMap<CreateUpdateInternalAuditPreparationDto, InternalAuditPreparations.InternalAuditPreparation>();
            CreateMap<InternalAuditor, InternalAuditorDto>();
            CreateMap<InternalAuditor, AuditorDto>();
            CreateMap<InternalAuditApprove, InternalAuditApproveDto>();
            CreateMap<CreateUpdateInternalAuditApproveDto, InternalAuditApprove>();
            CreateMap<InternalAuditQuestion, InternalAuditQuestionDto>();
            CreateMap<CreateUpdateInternalAuditQuestionDto, InternalAuditQuestion>();
            CreateMap<HistoryRiskOpportunity, HistoryRiskAndOpportunityDto>();
            CreateMap<CreateUpdateHistoryRiskAndOpportunityDto, HistoryRiskOpportunity>();
            CreateMap<Notification, NotificationDto>();
            CreateMap<CreateUpdateNotificationDto, Notification>();
            CreateMap<EmailTemplate, EmailTemplateDto>();
            CreateMap<CreateUpdateEmailTemplateDto, EmailTemplate>();
            CreateMap<RisksTreatment, RiskTreatmentDto>();
            CreateMap<CreateUpdateRiskTreatmentDto, RisksTreatment>();
            CreateMap<StaticDatatb, StaticDataDto>();
            CreateMap<CreateUpdateStaticDataDto, StaticDatatb>();
            CreateMap<Attachment, AttachmentDto>();
            CreateMap<AttachmentFile, AttachmentFileDto>();
            CreateMap<FrameworkEmployee, FrameworkEmployeeDto>();
            CreateMap<CreateUpdateFrameworkEmployeeDto, FrameworkEmployee>();
            CreateMap<Frameworks.Framework, FrameworkDto>();
            CreateMap<CreateUpdateFrameworkDto, Frameworks.Framework>(MemberList.Source);
            CreateMap<Department, DepartmentDto>();
            CreateMap<CreateUpdateDepartmentDto, Department>(MemberList.Source);
            CreateMap<Employee, EmployeeDto>()
                .ForMember(t => t.DepartmentName, ops => ops.MapFrom(t => t.Department != null ? t.Department.Name : null));
            CreateMap<CreateUpdateEmployeeDto, Employee>(MemberList.Source);
            CreateMap<CreateUpdateDomainDto, Domain>();
            CreateMap<Domain, DomainDto>()
                .ForMember(t => t.MainDomainNameAr, ops => ops.MapFrom(t => t.Parent != null ? t.Parent.NameAr : null))
                .ForMember(t => t.MainDomainNameEn, ops => ops.MapFrom(t => t.Parent != null ? t.Parent.NameEn : null))
                .ForMember(t => t.ResponsibleName, ops => ops.MapFrom(t => t.Responsible != null ? t.Responsible.FullName : null))
                .ForMember(t => t.Departments, ops => ops.MapFrom(t => t.DomainDepartments.Select(r => new NameId<Guid>(r.Department.Name, r.DepartmentId))));
            CreateMap<Domain, DomainWithoutPagingDto>()
                .ForMember(t => t.MainDomainNameAr, ops => ops.MapFrom(t => t.Parent != null ? t.Parent.NameAr : null))
                .ForMember(t => t.MainDomainNameEn, ops => ops.MapFrom(t => t.Parent != null ? t.Parent.NameEn : null))
                .ForMember(t => t.ResponsibleName, ops => ops.MapFrom(t => t.Responsible != null ? t.Responsible.FullName : null))
                .ForMember(t => t.Departments, ops => ops.MapFrom(t => t.DomainDepartments.Select(r => new NameId<Guid>(r.Department.Name, r.DepartmentId))));
            CreateMap<Control, ControlDto>()
                .ForMember(t => t.MainControlNameAr, ops => ops.MapFrom(t => t.Parent != null ? t.Parent.NameAr : null))
                .ForMember(t => t.MainControlNameEn, ops => ops.MapFrom(t => t.Parent != null ? t.Parent.NameEn : null));

            CreateMap<CreateUpdateControlDto, Control>(MemberList.Source);
            CreateMap<Assessment, AssessmentDto>()
                .ForMember(t => t.Versions, ops => ops.MapFrom(t => t.AssessmentVersions))
                .ForMember(t => t.Employees, ops => ops.MapFrom(t => t.AssessmentEmployees.Select(r => new NameId<Guid>(r.Employee.FullName, r.EmployeeId))));
            CreateMap<CreateUpdateAssessmentDto, Assessment>(MemberList.Source);

            CreateMap<Policy, PolicyDto>();
               // .ForMember(dest => dest.CategoryIds, ops => ops.MapFrom(src => src.PolicyCategories.Select(x => x.Id)));

            CreateMap<Category, CategoryDto>();
            CreateMap<UpdatePolicyDto, Policy>();
        }
    }
}
