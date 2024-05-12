using CDM_Web_API.CustomerDTO;

namespace CDM_Web_API.DTO
{
    public class UpdateCustomerDto : BaseCustomerDto
    {
        public string Description { get; set; }

        public string PhoneNo { get; set; }

        public string Website { get; set; }

        public string CountryCode { get; set; }
    }
}
