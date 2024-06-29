using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using businessService.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace businessService.Repositories.Business
{
    public class BusinessRepository : IBusinessRepository
    {
        private readonly string _connectionString;

        public BusinessRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Default");
        }

        public async Task<IEnumerable<BusinessModel>> getAllBusinesses()
        {
            var sqlQuery = "SELECT * FROM business";

            using var connection = new NpgsqlConnection(_connectionString);
            return await connection.QueryAsync<BusinessModel>(sqlQuery);
        }

        public async Task<BusinessModel> getBusiness(string id)
        {
            var sqlQuery = "SELECT * FROM business WHERE userID=@userID";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                return await connection.QueryFirstOrDefaultAsync<BusinessModel>(sqlQuery, new { userID = id });
            }
        }

        public async Task<BusinessModel> createBusiness(BusinessModel business)
        {
            if (business.userID != business.businessID)
            {
                throw new ArgumentException("User ID and Business ID must be equal.");
            }

            var sqlQuery = "INSERT INTO business (businessID, userID, businessName, contactInfo, billingAddress, businessCategory, dateCreated,bio,businessUrl) " +
                           "VALUES (@businessID, @userID, @businessName, @contactInfo, @billingAddress, @businessCategory, @dateCreated,@bio,@businessUrl) " +
                           "RETURNING *";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                return await connection.QueryFirstOrDefaultAsync<BusinessModel>(sqlQuery, business);
            }
        }


        public async Task updateBusiness(BusinessModel business)
        {
            var sqlQuery = "UPDATE business " +
                           "SET businessName=@businessName, contactInfo=@contactInfo, billingAddress=@billingAddress, businessCategory=@businessCategory, bio=@bio, businessUrl=@businessUrl " +
                           "WHERE businessID=@businessID";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.ExecuteAsync(sqlQuery, business);
            }
        }

        public async Task deleteBusiness(string id)
        {
            var sqlQuery = "DELETE FROM business WHERE userID=@userID";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.ExecuteAsync(sqlQuery, new { userID = id });
            }
        }
    }
}
