using CDM_Web_API.CustomerDTO;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace CDM_Web_API.DTO
{
    public class AddCustomerDto : BaseCustomerDto
    {
        public string Description { get; set; }

        public string PhoneNo { get; set; }

        public string Website { get; set; }

        public string CountryCode { get; set; }
    }
}
