﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CustomerManager.Models;

namespace CustomerManager.Repository
{
    public class CustomerRepository
    {
        private CustomerManagerContext _context;

        public CustomerRepository()
        {
            _context = new CustomerManagerContext();
        }

        public IQueryable<Customer> GetCustomers()
        {
            var query = _context.Customers
                .Include("Orders")
                .Include("State")
                .OrderBy(c => c.LastName);

            return query.AsQueryable();
        }

        public List<State> GetStates()
        {
            return _context.States.OrderBy(s => s.Name).ToList();
        }

        public IQueryable<CustomerSummary> GetCustomersSummary(out int totalRecords)
        {
            var query = _context.Customers
               .Include("States")
               .OrderBy(c => c.LastName);

            totalRecords = query.Count();

            return query.Select(c => new CustomerSummary
            {
                Id = c.Id,
                FirstName = c.FirstName,
                LastName = c.LastName,
                City = c.City,
                State = c.State,
                OrderCount = c.Orders.Count(),
                Gender = c.Gender
            }).AsQueryable();
        }

        public OperationStatus CheckUnique(int id, string property, string value)
        {
            switch (property.ToLower())
            {
                case "email":
                    var unique = !_context.Customers.Any(c => c.Id != id && c.Email == value);
                    return new OperationStatus { Status = unique };
                default:
                    return new OperationStatus();
            }
        }

        public Customer GetCustomerById(int id)
        {
            return _context.Customers
                    .Include("Orders")
                    .Include("State")
                    .SingleOrDefault(c => c.Id == id);
        }

        public OperationStatus InsertCustomer(Customer customer)
        {
            var opStatus = new OperationStatus { Status = true };
            try
            {
                _context.Customers.Add(customer);
                _context.SaveChanges();
            }
            catch (Exception exp)
            {
                opStatus.Status = false;
                opStatus.ExceptionMessage = exp.Message;
            }
            return opStatus;
        }

        public OperationStatus UpdateCustomer(Customer customer)
        {
            var opStatus = new OperationStatus { Status = true };
            try
            {
                customer.State.Id = customer.StateId;
                _context.Customers.Attach(customer);
                _context.Entry<Customer>(customer).State = System.Data.Entity.EntityState.Modified;
                _context.SaveChanges();
            }
            catch (Exception exp)
            {
                opStatus.Status = false;
                opStatus.ExceptionMessage = exp.Message;
            }
            return opStatus;
        }

        public OperationStatus DeleteCustomer(int id)
        {
            var opStatus = new OperationStatus { Status = true };
            try
            {
                var cust = _context.Customers.SingleOrDefault(c => c.Id == id);
                if (cust != null)
                {
                    _context.Customers.Remove(cust);
                    _context.SaveChanges();
                }
                else
                {
                    opStatus.Status = false;
                    opStatus.ExceptionMessage = "Customer not found";
                }
            }
            catch (Exception exp)
            {
                opStatus.Status = false;
                opStatus.ExceptionMessage = exp.Message;
            }
            return opStatus;
        }
    }
}