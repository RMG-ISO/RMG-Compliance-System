using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Attachments.Dtos
{
   public   class UploadFilesDto
    {
        public Guid? AttachmentId { get; set; }

        public bool? IsMultiple { get; set; }

        public int? MaxFileSize { get; set; }

        public string FileExtentions { get; set; }


        //public IEnumerable<IFormFile> Files { get; set; }
    }
}
