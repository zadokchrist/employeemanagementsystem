using EmployeeManagementApi.Core.Repositories;
using EmployeeManagementApi.Data;
using EmployeeManagementApi.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementApi.Services
{
    // Implementation of the IEmployeeMgt interface for managing employee operations
    public class EmployeeMgt : IEmployeeMgt
    {
        private readonly AppDbContext _context;

        // Constructor to inject the AppDbContext
        public EmployeeMgt(AppDbContext context)
        {
            _context = context;
        }

        // Adds a new employee to the database
        public async Task<Employee> AddEmployee(Employee employee)
        {
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        // Deletes an employee from the database by ID
        public async Task<Employee> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                throw new ArgumentException("Employee not found");
            }
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        // Retrieves an employee by ID
        public async Task<Employee> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                throw new ArgumentException("Employee not found");
            }
            return employee;
        }

        // Retrieves all employees from the database
        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        // Updates an existing employee in the database
        public async Task<Employee> UpdateEmployee(Employee employee)
        {
            _context.Entry(employee).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return employee;
        }
    }
}
