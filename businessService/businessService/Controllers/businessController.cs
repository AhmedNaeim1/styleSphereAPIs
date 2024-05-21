using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using businessService.Models;
using businessService.Repositories.Business;

using Microsoft.AspNetCore.Mvc;

namespace businessService.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class businessController : ControllerBase
    {
        private readonly IBusinessRepository _businessRepository;

        public businessController(IBusinessRepository businessRepository)
        {
            _businessRepository = businessRepository;
        }

        [HttpGet("allBusinesses")]
        public async Task<IEnumerable<BusinessModel>> GetAllBusinesses()
        {
            return await _businessRepository.getAllBusinesses();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BusinessModel>> GetBusiness(string id)
        {
            var business = await _businessRepository.getBusiness(id);
            if (business == null)
            {
                return NotFound();
            }
            return business;
        }

        [HttpPost("createBusiness")]
        public async Task<IActionResult> CreateBusiness([FromBody] BusinessModel business)
        {
            var businessToAdd= await _businessRepository.getBusiness(business.businessID);
            if (businessToAdd != null)
            {
                return Conflict("Business already exists.");
            }
            var newBusiness = await _businessRepository.createBusiness(business);
            if (newBusiness == null)
            {
                return StatusCode(500, "An error occurred while creating the business.");
            }
            else
            {
                return Ok("Successfully created.");
            }
        }


        [HttpPut("updateBusiness/{id}")]
        public async Task<IActionResult> UpdateBusiness(string id, [FromBody] BusinessModel business)
        {
            if (id != business.businessID)
            {
                return BadRequest();
            }
            var existingBusiness = await _businessRepository.getBusiness(id);
            if (existingBusiness == null)
            {
                return NotFound("Business not found.");
            }
            try
            {
                await _businessRepository.updateBusiness(business);
                return Ok("Successfully updated.");
            }
            
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while updating the business.");
            }
        }


        [HttpDelete("deleteBusiness/{id}")]
        public async Task<IActionResult> DeleteBusiness(string id)
        {
            var businessToDelete = await _businessRepository.getBusiness(id);
            if (businessToDelete == null)
            {
                return NotFound("Business not found.");
            }

            await _businessRepository.deleteBusiness(id);
            return Ok("Successfully deleted.");
        }
    }
}
