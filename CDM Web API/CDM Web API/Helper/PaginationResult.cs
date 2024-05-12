using System.Collections.Generic;

namespace CDM_Web_API.Helper
{
    public class PaginationResult<T>
    {
        public int TotalCount { get; set; }
        public List<T> Items { get; set; }
    }
}
