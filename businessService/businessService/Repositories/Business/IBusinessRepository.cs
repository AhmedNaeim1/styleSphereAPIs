using System;
using businessService.Models;

namespace businessService.Repositories.Business
{
	public interface IBusinessRepository
	{
        
            Task<IEnumerable<BusinessModel>> getAllBusinesses();
            Task<BusinessModel> getBusiness(string id);
            Task<BusinessModel> createBusiness(BusinessModel user);
            Task updateBusiness(BusinessModel user);
            Task deleteBusiness(string id);
     
    }
}

