using EmployeeManagementApi.Core.Repositories;
using EmployeeManagementApi.Data;
using EmployeeManagementApi.Data.DTOs;
using EmployeeManagementApi.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EmployeeManagementApi.Services
{
    // Implementation of the IUserManagement interface for managing user operations
    public class UserManagement : IUserManagement
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        // Constructor to inject the AppDbContext and IConfiguration
        public UserManagement(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // Registers a new user
        public async Task<User> Register(UserRegisterDto userRegisterDto)
        {
            var user = new User
            {
                UserName = userRegisterDto.Email,
                Password = userRegisterDto.Password
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        // Logs in a user and generates a JWT token
        public async Task<string> Login(UserLoginDto userLoginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userLoginDto.Email && x.Password == userLoginDto.Password);

            if (user == null)
            {
                // Check whether these are default credentials
                if (userLoginDto.Email == "admin" && userLoginDto.Password == "admin")
                {
                    var usercreds = new User
                    {
                        UserName = userLoginDto.Email,
                        Password = userLoginDto.Password
                    };
                    return GenerateJwtToken(usercreds);
                }
                else
                {
                    throw new ArgumentException("Invalid credentials");
                }
            }

            return GenerateJwtToken(user);
        }

        // Generates a JWT token for a given user
        private string GenerateJwtToken(User user)
        {
            // Create security key and credentials
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            // Define claims
            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name, user.UserName)
            };

            // Create the token options
            var tokenOptions = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: signinCredentials
            );

            // Write and return the token
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return tokenString;
        }
    }
}
