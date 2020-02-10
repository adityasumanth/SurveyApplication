
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Survey.Concerns;
using Survey.Contracts;
using Survey.Providers;

namespace Survey.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly SurveyDbContext _dbContext;
        public ISurveyCRUDContract SurveyCRUDProvider { get; set; }
        public HomeController(ISurveyCRUDContract surveyCRUD, SurveyDbContext dbContext)
        {
            this.SurveyCRUDProvider = surveyCRUD;
            this._dbContext = dbContext;
        }

        [HttpGet]
        [Route("surveys")]
        public List<SurveyForm> GetSurveyForms()
        {
            return this.SurveyCRUDProvider.GetSurveyForms();
            
        }

        [HttpGet]
        [Route("survey/{id}")]
        public SurveyForm GetSurveyFormById(int id)
        {
            return this.SurveyCRUDProvider.GetSurveyFormById(id);
            
        }

        [HttpGet]
        [Route("polldata/{id}")]
        public List<SurveyData> GetSurveyData(int id)
        {
            return this.SurveyCRUDProvider.GetSurveyData(id);
            
        }
       
        [HttpPost]
        [Route("poll")]
        public SurveyData PostPollData([FromBody]SurveyData pollData)
        {
            return this.SurveyCRUDProvider.PostPollData(pollData);
            
        }
    }
}