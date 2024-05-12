using AutoMapper;
using CDM_Web_API.AccountDTO;
using CDM_Web_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CDM_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AccountsController : ControllerBase
    {
        private readonly ApiDbContext _context;
        //to map the dto to base class and vice versa
        private readonly IMapper _mapper;

        public AccountsController(ApiDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        // GET: api/Accounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GetAccountDto>> GetAccount(string id)
        {
            //Find the record of customer with help of email
            var account = await _context.Accounts.FindAsync(id);

            if (account == null)
                return NotFound();
            return Ok(_mapper.Map<GetAccountDto>(account));
        }

        [HttpGet]
        [Route("/api/Accounts$like")]
        public async Task<ActionResult<IEnumerable<DisplayAccountDto>>> SearchAccounts([FromQuery] string search,string id)
        {
            var accounts = await _context.Accounts.Where(d => d.Gstin==id && (d.AccountName.Contains(search)
            || d.Location.Contains(search) || d.AccountId.Contains(search) || d.Email.Contains(search) || d.YearOfEst.Contains(search))).ToListAsync();
            return Ok(_mapper.Map<List<DisplayAccountDto>>(accounts));
        }

        // PUT: api/Accounts/5
        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAccount(string id, UpdateAccountDto putAccountDto)
        {
            //check if any account exists or not
            if (id != putAccountDto.Email)
                return BadRequest();
            //get the account detail
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
                return NotFound();
            //reafactoring the data
            _mapper.Map(putAccountDto, account);
            //save the modified state
            _context.Entry(account).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // POST: api/Accounts
        
        [HttpPost]
        public async Task<ActionResult<Account>> AddAccount(AddAccountDto addAccountDto)
        {
            //gets the data dan save the data
            var account = _mapper.Map<Account>(addAccountDto);
            _context.Accounts.Add(account);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AccountExists(account.Email))
                    return Conflict();
                else
                    throw;
            }

            return CreatedAtAction("GetAccount", new { id = account.Email }, account);
        }

        // DELETE: api/Accounts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(string id)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
                return NotFound();

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AccountExists(string id)
        {
            return _context.Accounts.Any(e => e.Email == id);
        }
    }
}
