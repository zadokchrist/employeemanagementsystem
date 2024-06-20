using EmployeeManagementApi.Data.DTOs;
using EmployeeManagementApi.Data.Models;
using System.Threading.Tasks;

namespace EmployeeManagementApi.Core.Repositories
{
    // Interface for managing user operations
    public interface IUserManagement
    {
        // Registers a new user
        Task<User> Register(UserRegisterDto userRegisterDto);

        // Logs in a user and returns a JWT token
        Task<string> Login(UserLoginDto userLoginDto);
    }
}
