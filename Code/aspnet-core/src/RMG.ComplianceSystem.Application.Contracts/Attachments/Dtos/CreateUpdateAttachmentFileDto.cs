using System;
using System.ComponentModel;
namespace RMG.ComplianceSystem.Attachments.Dtos
{
    [Serializable]
    public class CreateUpdateAttachmentFileDto
    {
        public string Name { get; set; }

        public double Size { get; set; }

        public string DisplayName { get; set; }

        public string Extention { get; set; }

        public Guid AttachmentId { get; set; }

    }
}