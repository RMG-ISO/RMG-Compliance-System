using RMG.ComplianceSystem.Controls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;

namespace RMG.ComplianceSystem.Documents
{
    public class PrincipleControl : Entity<Guid>
    {
        public Guid PrincipleId { get; set; }
        public Principle Principle { get; set; }
        public Guid ControlId { get; set; }
        public Control Control { get; set; }

        protected PrincipleControl()
        {
            
        }

        public PrincipleControl(Guid id, Guid controlId)
        {
            Id = id;
            ControlId = controlId;
        }
    }
}
