using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using CustomerManager.Models;

namespace CustomerManager.Repository
{
    public class CustomerManagerContext : DbContext
    {
        public CustomerManagerContext()
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }

        // DEVELOPMENT ONLY: initialize the database
        static CustomerManagerContext()
        {
            Database.SetInitializer(new CustomerManagerDatabaseInitializer());
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<State> States { get; set; }
    }
}
