using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Entities.Events;
using Volo.Abp.EventBus;

namespace RMG.ComplianceSystem.Documents
{
    public class UpdateDocumentComplianceHandler : ILocalEventHandler<EntityUpdatedEventData<Principle>>, ITransientDependency
    {
        private readonly IDocumentRepository _documentRepository;
        private readonly IPrincipleRepository _principleRepository;

        public UpdateDocumentComplianceHandler(IDocumentRepository documentRepository, IPrincipleRepository principleRepository)
        {
            _documentRepository = documentRepository;
            _principleRepository = principleRepository;

        }

        public async Task HandleEventAsync(EntityUpdatedEventData<Principle> eventData)
        {
            var document = await _documentRepository.GetAsync(eventData.Entity.DocumentId, false);
            var principles = (await _principleRepository.GetQueryableAsync()).Where(x => x.DocumentId == document.Id && x.ComplianceStatus.HasValue).Select(x => x.ComplianceScore);
            if (principles.Any())
            {
                document.CompliancePercentage = (int)Math.Round(principles.Average());
                await _documentRepository.UpdateAsync(document);
            }
        }
    }
}
