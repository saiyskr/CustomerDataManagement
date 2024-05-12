using CDM_Web_API.CustomerDTO;
using System.Collections.Generic;

namespace CDM_Web_API.Helper
{
    public class AccountsPaginationResult
    {
        public int TotalCount { get; set; }
        public GetCustomerDetailsDto Item { get; set; }
    }
}
