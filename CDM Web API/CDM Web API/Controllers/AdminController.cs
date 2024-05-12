using AutoMapper;
using CDM_Web_API.AccountDTO;
using CDM_Web_API.AdminDto;
using CDM_Web_API.CustomerDTO;
using CDM_Web_API.Helper;
using CDM_Web_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NuGet.Protocol;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CDM_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApiDbContext _authContext;
        private readonly IMapper _mapper;
        public AdminController(ApiDbContext apiDbContext, IMapper mapper)
        {
            _authContext = apiDbContext;
            _mapper = mapper;

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Admin>> GetAdmin(string id)
        {
            //Find the record of admin with help of email
            var account = await _authContext.Admins.FindAsync(id);

            if (account == null)
                return NotFound();

            return Ok(account);
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] LoginDto adminObj)
        {
            if (adminObj == null)
                return BadRequest();
            var admin = await _authContext.Admins.FirstOrDefaultAsync(x => x.Email == adminObj.Email);
            if (admin == null)
                return NotFound(new { Message = "User Not Found!!!" });

            if (!PasswordHasher.VerifyPassword(adminObj.Password, admin.Password))
                return BadRequest(new { Message = "Password is Incorrect" });

            admin.Token = CreateJwtToken(admin);

            return Ok(new
            {
                Token = admin.Token,
                Message = "Login Success!!!!"
            }); 
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterDto adminObj)
        {
            if(adminObj == null)
                return BadRequest();
            //check email
            if (await EmailExistAsync(adminObj.Email))
                return BadRequest(new { Message = "Email Already Exists" });
            //check password streangth
            var pass = CheckPasswordStreangth(adminObj.Password);
            if (!string.IsNullOrEmpty(pass))
                return BadRequest(new { Message = pass.ToString() });
            // if(string.IsNullOrEmpty(adminObj.email))  other method

            //Before sending to the database we will encrypt the password.
            adminObj.Password = PasswordHasher.HashPassword(adminObj.Password);
            var newadminObj = _mapper.Map<Admin>(adminObj);
            await _authContext.Admins.AddAsync(newadminObj);   
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "User Registered!!!!!!"
            });
        }


        [HttpPut("reset")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetDto adminObj)
        {
            if (adminObj.Email == null)
                return BadRequest();
            var admin = await _authContext.Admins.FirstOrDefaultAsync(x => x.Email == adminObj.Email);
            if (admin == null)
                return NotFound(new { Message = "User Not Found!!!" });
            if (!PasswordHasher.VerifyPassword(adminObj.Password, admin.Password))
                return BadRequest(new { Message = "Old Password does not match!!!" });
            var pass = CheckPasswordStreangth(adminObj.NewPassword);
            if (!string.IsNullOrEmpty(pass))
                return BadRequest(new { Message = pass.ToString() });

            adminObj.Password = PasswordHasher.HashPassword(adminObj.NewPassword);
            adminObj.NewPassword = "";
            _mapper.Map(adminObj, admin);
            _authContext.Entry(admin).State = EntityState.Modified;
            try
            {
                await _authContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (await EmailExistAsync(adminObj.Email) == false)
                    return NotFound();
                else
                    throw;
            }

            return Ok(new { Message = "Password Updated!!!" });
        }

        private Task<Boolean> EmailExistAsync(string email)
        {
            return _authContext.Admins.AnyAsync(x => x.Email == email);
        }

        
        private string CheckPasswordStreangth(string password)
        {
            StringBuilder sb = new StringBuilder();
            if (password.Length < 11)
                sb.Append("Minimum Password Length should be 10" + Environment.NewLine);
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]") 
                && Regex.IsMatch(password, "[0-9]"))) 
                sb.Append("Password should be Alphanumeric" + Environment.NewLine);
            if (!Regex.IsMatch(password, "[<,>,@,!,#,$,^,$,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
                sb.Append("Password should contain special character" + Environment.NewLine);

            return sb.ToString();
        }
        private string CreateJwtToken(Admin admin)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysecret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name,admin.Name)
            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);

            return jwtTokenHandler.WriteToken(token);
        }
    }
}
