using EmployeeManagementApi.Core.Repositories;
using EmployeeManagementApi.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagementApi.Controllers
{
    // Controller for managing employee-related operations
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Requires authorization to access any endpoint in this controller
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeMgt _employeeMgt;

        // Constructor to inject IEmployeeMgt service
        public EmployeesController(IEmployeeMgt employeeMgt)
        {
            _employeeMgt = employeeMgt;
        }

        // Endpoint to retrieve all employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            try
            {
                var employees = await _employeeMgt.GetEmployees();
                return Ok(employees);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        // Endpoint to retrieve a specific employee by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            try
            {
                var employee = await _employeeMgt.GetEmployee(id);
                if (employee == null)
                {
                    return NotFound();
                }
                return Ok(employee);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        // Endpoint to add a new employee
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            try
            {
                var newEmployee = await _employeeMgt.AddEmployee(employee);
                return CreatedAtAction(nameof(GetEmployee), new { id = newEmployee.Id }, newEmployee);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error adding data to the database");
            }
        }

        // Endpoint to update an existing employee by ID
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            try
            {
                await _employeeMgt.UpdateEmployee(employee);
                return Ok("Employee updated successfully");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating employee");
            }
        }

        // Endpoint to delete an employee by ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            try
            {
                await _employeeMgt.DeleteEmployee(id);
                return Ok("Employee deleted successfully");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting employee");
            }
        }

        // Endpoint to export all employees to a CSV file
        [HttpGet("export")]
        public async Task<IActionResult> ExportToCsv()
        {
            var employees = await _employeeMgt.GetEmployees();

            var csv = new StringBuilder();
            csv.AppendLine("Id,FirstName,LastName,Email,Phone,Department");

            foreach (var emp in employees)
            {
                csv.AppendLine($"{emp.Id},{emp.FirstName},{emp.LastName},{emp.Email},{emp.Phone},{emp.Department}");
            }

            var fileName = "employees.csv";
            return File(Encoding.UTF8.GetBytes(csv.ToString()), "text/csv", fileName);
        }
    }
}
