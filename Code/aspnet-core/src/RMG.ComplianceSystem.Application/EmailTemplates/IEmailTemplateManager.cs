
using Volo.Abp.Domain.Entities.Events;
using RMG.ComplianceSystem.RiskTreatments;
using System;
using System.Threading.Tasks;

namespace RMG.ComplianceSystem.EmailTemplates
{
    public interface IEmailTemplateManager
    {
     
        string GetURI();
       Task OnAddRiskTreatmentSendToRiskTreatment(EntityCreatedEventData<RisksTreatment> eventData, string hostName);
      
    }
}
