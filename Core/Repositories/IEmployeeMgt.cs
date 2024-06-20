using EmployeeManagementApi.Data.Models;

namespace EmployeeManagementApi.Core.Repositories
{
    // Interface for managing employee operations
    public interface IEmployeeMgt
    {
        // Adds a new employee
        Task<Employee> AddEmployee(Employee employee);

        // Retrieves an employee by their ID
        Task<Employee> GetEmployee(int id);

        // Retrieves all employees
        Task<IEnumerable<Employee>> GetEmployees();

        // Updates an existing employee
        Task<Employee> UpdateEmployee(Employee employee);

        // Deletes an employee by their ID
        Task<Employee> DeleteEmployee(int id);
    }
}
