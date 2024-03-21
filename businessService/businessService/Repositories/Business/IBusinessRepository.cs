using System;
using businessService.Models;

namespace businessService.Repositories.Business
{
	public interface IBusinessRepository
	{
        
            Task<IEnumerable<BusinessModel>> getAllBusinesses();
            Task<BusinessModel> getBusiness(int id);
            Task<BusinessModel> createBusiness(BusinessModel user);
            Task updateBusiness(BusinessModel user);
            Task deleteBusiness(int id);
     
    }
}

