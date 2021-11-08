using System;
using System.ComponentModel;
namespace RMG.ComplianceSystem.Attachments.Dtos
{
    [Serializable]
    public class CreateUpdateAttachmentDto
    {
        public bool IsMultiple { get; set; }

        public int MaxFileSize { get; set; }

        public string FileExtentions { get; set; }

    }
}