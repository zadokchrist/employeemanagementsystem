using EmployeeManagementApi.Controllers;
using EmployeeManagementApi.Core.Repositories;
using EmployeeManagementApi.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace EmployeeManagementApi.Tests
{
    public class EmployeesControllerTests
    {
        private readonly EmployeesController _controller;
        private readonly Mock<IEmployeeMgt> _mockEmployeeMgt;
        private readonly List<Employee> _employees;

        public EmployeesControllerTests()
        {
            _mockEmployeeMgt = new Mock<IEmployeeMgt>();
            _controller = new EmployeesController(_mockEmployeeMgt.Object);

            _employees = new List<Employee>
            {
                new Employee { Id = 1, FirstName = "John", LastName = "Doe", Department = "IT" },
                new Employee { Id = 2, FirstName = "Jane", LastName = "Smith", Department = "HR" }
            };
        }

        [Fact]
        public async void GetAll_ReturnsOkResult()
        {
            // Arrange
            _mockEmployeeMgt.Setup(m => m.GetEmployees()).ReturnsAsync(_employees);

            // Act
            var result = await _controller.GetEmployees();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var actualEmployees = Assert.IsAssignableFrom<IEnumerable<Employee>>(okResult.Value);
            Assert.Equal(2, actualEmployees.Count());
        }
    }
}
