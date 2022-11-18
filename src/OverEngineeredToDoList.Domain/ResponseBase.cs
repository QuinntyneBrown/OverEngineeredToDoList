using System.Collections.Generic;

namespace OverEngineeredToDoList.Domain
{
    public class ResponseBase
    {
        public List<string> ValidationErrors { get; set; }
    }
}
