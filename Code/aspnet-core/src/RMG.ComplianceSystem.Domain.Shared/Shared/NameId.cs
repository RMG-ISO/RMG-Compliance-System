using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Shared
{
    public class NameId<T>
    {
        public NameId()
        {

        }
        public NameId(string name, T id)
        {
            Name = name;
            Id = id;
        }
        public string Name { get; set; }
        public T Id { get; set; }
    }
}
