using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            var employees = await _context.Employees.AsNoTracking().ToListAsync();
            return employees;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Employee employee)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _context.AddAsync(employee);

            var result = await _context.SaveChangesAsync();

            if (result > 0)
                return Ok();

            return BadRequest();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee is null)
                return NotFound();

            return Ok(employee);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee is null)
                return NotFound();
            _context.Remove(employee);

            var result = await _context.SaveChangesAsync();
            if (result > 0)
                return Ok();

            return BadRequest();
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> EditEmployee(int id, Employee employee)
        {
            var employeeFromDb = await _context.Employees.FindAsync(id);

            if (employeeFromDb is null)
                return NotFound();

            employeeFromDb.Name = employee.Name;
            employeeFromDb.Address = employee.Address;
            employeeFromDb.PhoneNumber = employee.PhoneNumber;
            employeeFromDb.Email = employee.Email;

            var result = await _context.SaveChangesAsync();

            if (result > 0)
                return Ok();

            return BadRequest();
        }
    }
}
