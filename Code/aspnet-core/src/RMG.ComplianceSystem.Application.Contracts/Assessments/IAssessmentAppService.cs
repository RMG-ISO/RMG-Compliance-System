using System;
using RMG.ComplianceSystem.Assessments.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.Assessments
{
    public interface IAssessmentAppService :
        ICrudAppService< 
            AssessmentDto, 
            Guid,
            AssessmentPagedAndSortedResultRequestDto,
            CreateUpdateAssessmentDto,
            CreateUpdateAssessmentDto>
    {

    }
}