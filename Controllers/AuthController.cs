using EmployeeManagementApi.Core.Repositories;
using EmployeeManagementApi.Data.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace EmployeeManagementApi.Controllers
{
    // Controller for handling authentication operations
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserManagement _usermanagement;

        // Constructor to inject the IUserManagement service
        public AuthController(IUserManagement userManagement)
        {
            _usermanagement = userManagement;
        }

        // Endpoint for user registration
        [HttpPost("register")]
        [Authorize]  // Requires authorization to access this endpoint
        public IActionResult Register([FromBody] UserRegisterDto request)
        {
            try
            {
                _usermanagement.Register(request);
                return Ok();
            }
            catch (Exception ex)
            {
                // Returns 500 Internal Server Error status if an exception occurs
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        // Endpoint for user login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userLoginDto)
        {
            try
            {
                var token = await _usermanagement.Login(userLoginDto);
                // Returns the generated JWT token if login is successful
                return Ok(new { Token = token });
            }
            catch (Exception)
            {
                // Returns 401 Unauthorized status if login fails
                return Unauthorized();
            }
        }
    }
}
