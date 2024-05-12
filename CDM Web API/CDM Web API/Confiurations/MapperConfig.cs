using AutoMapper;
using CDM_Web_API.AccountDTO;
using CDM_Web_API.AdminDto;
using CDM_Web_API.CustomerDTO;
using CDM_Web_API.DTO;
using CDM_Web_API.Models;

namespace CDM_Web_API.Confiurations
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            //craetemap creates the mapping between the two classes
            //reversemap is used to create the map in both derections so that any data of one class can be mapped to other type.
            CreateMap<Customer, AddCustomerDto>().ReverseMap();
            CreateMap<Customer, DisplayCustomerDto>().ReverseMap();
            CreateMap<Customer, UpdateCustomerDto>().ReverseMap();
            CreateMap<Customer, GetCustomerDetailsDto>().ReverseMap();

            CreateMap<Account, AddAccountDto>().ReverseMap();
            CreateMap<Account, GetAccountDto>().ReverseMap();
            CreateMap<Account, UpdateAccountDto>().ReverseMap();
            CreateMap<Account, DisplayAccountDto>().ReverseMap();
            

            CreateMap<Admin,LoginDto>().ReverseMap();
            CreateMap<Admin, ResetDto>().ReverseMap();
            CreateMap<Admin, RegisterDto>().ReverseMap();
            





        }
    }
}
