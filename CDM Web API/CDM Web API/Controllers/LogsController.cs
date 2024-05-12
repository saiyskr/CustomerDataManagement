using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CDM_Web_API.Models;
using Microsoft.AspNetCore.Authorization;
using CDM_Web_API.Helper;
using System.Security.Policy;

namespace CDM_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LogsController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public LogsController(ApiDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<PaginationResult<Logs>>> GetLogs([FromQuery] int startIndex, [FromQuery] int pageSize)
        {
            int totalCount = await _context.Logs.CountAsync();
            var items = await _context.Logs.OrderByDescending(x=>x.LogId).Skip(startIndex).Take(pageSize).ToListAsync();
            return new PaginationResult<Logs>
            {
                Items = items,
                TotalCount = totalCount
            };
        }

        [HttpGet]
        [Route("/api/Logs$like")]
        public async Task<ActionResult<IEnumerable<Logs>>> SearchLogs([FromQuery] string search)
        {
            return Ok(await _context.Logs.OrderByDescending(x=>x.LogId).Where(d => d.AdminName.Contains(search) || d.CustomerName.Contains(search) || d.AccountName.Contains(search) || d.SectionModified.Contains(search)
            || d.Date.Contains(search) || d.Time.Contains(search) || d.Action.Contains(search)).ToListAsync());
        }
        
        [HttpPost]
        public async Task<ActionResult<Logs>> PostLogs(Logs logs)
        {
            _context.Logs.Add(logs);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LogsExists(logs.LogId))
                    return Conflict();
                else
                    throw;
            }

            return CreatedAtAction("GetLogs", new { id = logs.LogId }, logs);
        }

        

        private bool LogsExists(int id)
        {
            return _context.Logs.Any(e => e.LogId == id);
        }
    }
}
